import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Controller, useForm } from 'react-hook-form';
import {
  availableTimes,
  type Appointment,
  type AppointmentWithUsers,
} from '../../api/models/appointment.interface';
import { api } from '../../api';
import { formatDateTime } from '../../utils/date';
import { isTimeSlotOccupied } from './appointments';

export interface EditableAppointmentModalData {
  id: number;
  date: Date;
  time: string;
}

interface EditAppointmentModalProps {
  visible: boolean;
  onHide: () => void;
  data: EditableAppointmentModalData;
  setData: React.Dispatch<React.SetStateAction<EditableAppointmentModalData | null>>;
  onSave: (updated: EditableAppointmentModalData) => void;
  onDelete?: (id: number) => void;
}

export const EditAppointmentModal = ({
  visible,
  onHide,
  data,
  setData,
  onSave,
  onDelete,
}: EditAppointmentModalProps) => {
  const today = new Date();
  const [availableFiltered, setAvailableFiltered] = useState<string[]>([]);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<EditableAppointmentModalData>({
    defaultValues: data,
  });

  useEffect(() => {
    if (!data?.date) return;

    const fetchAppointments = async () => {
      const selectedDate = data.date.toISOString().split('T')[0];

      const doctorAppointments = await api.appointments.searchAppointmentsAsMedic({
        start_date: selectedDate,
        end_date: selectedDate,
      });
      console.log('selectedDate:', selectedDate);
      console.log(
        'doctorAppointments:',
        doctorAppointments.data?.map((a) => a.start_at),
      );

      const occupiedRanges: string[] = [];

      doctorAppointments.data?.forEach((appointment: Appointment) => {
        const start = new Date(appointment.start_at);
        const end = new Date(appointment.end_at);

        const formattedStart = formatDateTime(start).time;
        const formattedEnd = formatDateTime(end).time;

        occupiedRanges.push(`${formattedStart}-${formattedEnd}`);
      });

      // Calcular los horarios disponibles correctamente
      const filtered = availableTimes.filter((time) => !isTimeSlotOccupied(time, occupiedRanges));

      setAvailableFiltered(filtered);
    };

    fetchAppointments();
  }, [data.date]); // ✅ Solo depende de la fecha, no del objeto entero

  const handleDateChange = (e: any) => {
    const selectedDate = e.value;
    setData((prev) => (prev ? { ...prev, date: selectedDate } : null));
    setValue('date', selectedDate);
  };

  const handleTimeChange = (time: string) => {
    setData((prev) => (prev ? { ...prev, time } : null));
    setValue('time', time);
  };

  if (!data) return null;

  return (
    <Dialog
      header="Editar Cita"
      visible={visible}
      onHide={onHide}
      breakpoints={{ '960px': '75vw', '641px': '95vw' }}>
      <div className="flex flex-col gap-8">
        {/* Fecha */}
        <div className="flex-1">
          <label className="mb-2 block font-semibold">FECHA</label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Calendar
                {...field}
                inline
                locale="es"
                className="w-full"
                minDate={today}
                onChange={handleDateChange}
              />
            )}
          />
          {errors.date && <span className="text-red-500">{errors.date.message}</span>}
        </div>

        {/* Hora */}
        <div className="flex-1">
          <label className="mb-2 block font-semibold">HORA DISPONIBLE</label>
          <div className="custom-scrollbar scrollable h-72 overflow-y-auto pr-4">
            <div className="grid grid-cols-3 gap-3">
              {availableFiltered.length > 0 ? (
                availableFiltered.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeChange(time)}
                    className={`w-full rounded-lg border p-3 text-center transition-colors ${
                      data.time === time
                        ? 'border-[#734F96] bg-purple-50 font-semibold text-[#734F96]'
                        : 'border-gray-300 text-gray-700 hover:border-[#734F96]'
                    }`}>
                    {time}
                  </button>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500">
                  No hay horarios disponibles para esta fecha
                </p>
              )}
            </div>
          </div>
          {errors.time && <span className="text-red-500">{errors.time.message}</span>}
        </div>

        {/* Botones */}
        <div className="flex justify-between gap-3 pt-6">
          {onDelete && (
            <button
              onClick={() => onDelete(data.id)}
              className="rounded-full bg-red-100 px-6 py-3 font-bold text-red-600 hover:bg-red-200">
              Eliminar
            </button>
          )}
          <button
            onClick={() => onSave(data)}
            className="rounded-full bg-[#734F96] px-10 py-3 font-bold text-white hover:bg-[#5f3d7c]">
            Guardar
          </button>
          <button
            onClick={onHide}
            className="rounded-full bg-gray-200 px-10 py-3 font-bold text-gray-600 hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

// Función auxiliar para transformar al tipo Appointment
export function toAppointment(
  editable: EditableAppointmentModalData,
  existing: AppointmentWithUsers,
): AppointmentWithUsers {
  const [hours, minutes] = editable.time.split(':').map(Number);
  const start_at = new Date(editable.date);
  start_at.setHours(hours, minutes, 0, 0);
  const end_at = new Date(start_at.getTime() + 30 * 60 * 1000);

  return {
    ...existing,
    start_at: start_at.toISOString(),
    end_at: end_at.toISOString(),
  };
}
