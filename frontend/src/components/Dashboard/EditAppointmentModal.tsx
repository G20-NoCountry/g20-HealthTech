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
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  // console.log(occupiedTimes);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<EditableAppointmentModalData>({
    defaultValues: data,
  });

  useEffect(() => {
    if (!data) return;

    const fetchAppointments = async () => {
      const doctorAppointments = await api.appointments.searchAppointmentsAsMedic({
        start_date: data.date.toISOString().split('T')[0], // Filtrar por la fecha seleccionada
        end_date: data.date.toISOString().split('T')[0],
      });

      const occupied: string[] = [];

      doctorAppointments.data?.forEach((appointment: Appointment) => {
        const start = new Date(appointment.start_at);
        const end = new Date(appointment.end_at);

        // Convertir los intervalos de tiempo de la cita en formato 'HH:mm-HH:mm'
        const formattedStart = formatDateTime(start).time;
        const formattedEnd = formatDateTime(end).time;

        occupied.push(`${formattedStart}-${formattedEnd}`);
      });

      // Filtrar los horarios disponibles
      const availableFiltered = availableTimes.filter(
        (time) => !isTimeSlotOccupied(time, occupied),
      );

      // Actualizar el estado con los horarios disponibles
      setOccupiedTimes(availableFiltered);
    };

    fetchAppointments();
  }, [data]);

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
              {availableTimes.map((time) => {
                if (!occupiedTimes.includes(time)) return null; // Ocultar los horarios ocupados
                return (
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
                );
              })}
            </div>
          </div>
          {errors.time && <span className="text-red-500">{errors.time.message}</span>}
        </div>

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
    start_at: start_at.toISOString(), // Convertir start_at a string ISO
    end_at: end_at.toISOString(), // Convertir end_at a string ISO
  };
}
