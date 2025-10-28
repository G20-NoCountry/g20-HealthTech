import { useEffect, useState, useMemo } from 'react';
import { Calendar, type CalendarDateTemplateEvent } from 'primereact/calendar';
import { AppointmentsService } from '../../services/AppointmentService';
import AppointmentCard from './AppointmentCard';
import {
  EditAppointmentModal,
  type EditableAppointmentModalData,
  toAppointment,
} from './EditAppointmentModal';
import { isSameDay } from '../../utils/date';
import type { Appointment } from '../../models/appointment.model';

interface DashboardProps {
  rol: 'patient' | 'doctor';
}

export default function Dashboard({ rol }: DashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableData, setEditableData] = useState<EditableAppointmentModalData | null>(null);

  const today = new Date();

  // Filtrado por fecha seleccionada
  const filtered = useMemo(() => {
    if (!date) return appointments;
    return appointments.filter((a) => isSameDay(a.start_at, date));
  }, [appointments, date]);

  const appointmentDates = useMemo(() => appointments.map((a) => a.start_at), [appointments]);

  // Carga inicial
  useEffect(() => {
    AppointmentsService.getAppointments().then((data) => {
      const parsed = data.map((a) => ({
        ...a,
        start_at: new Date(a.start_at),
        end_at: new Date(a.end_at),
      }));
      setAppointments(parsed.sort((a, b) => a.start_at.getTime() - b.start_at.getTime()));
    });
  }, []);

  const nextAppointmentId = filtered.find((a) => a.start_at >= today)?.id;

  const dateTemplate = (event: CalendarDateTemplateEvent) => {
    const current = new Date(event.year, event.month, event.day);
    const hasAppointment = appointmentDates.some((d) => isSameDay(d, current));
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-full ${hasAppointment ? 'bg-accent/30 text-gray-800' : ''}`}>
        {event.day}
      </div>
    );
  };

  // Abrir modal
  const openEditModal = (appointment: Appointment) => {
    const hours = appointment.start_at.getHours().toString().padStart(2, '0');
    const minutes = appointment.start_at.getMinutes().toString().padStart(2, '0');
    setEditableData({
      id: appointment.id,
      date: appointment.start_at,
      time: `${hours}:${minutes}`,
    });
    setEditModalVisible(true);
  };

  // Guardar cambios
  const handleSave = (updated: EditableAppointmentModalData) => {
    console.log('Datos enviados:', updated);
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? toAppointment(updated, a) : a)),
    );
    setEditModalVisible(false);
    setEditableData(null);
  };

  return (
    <>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,410px)_auto]">
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value ?? null)}
          inline
          locale="es"
          minDate={today}
          dateFormat="dd/mm/yy"
          dateTemplate={dateTemplate}
        />

        <div
          className={`border-success overflow-hidden rounded-xl border ${
            rol === 'patient' ? 'bg-white' : 'bg-button-secondary shadow-black/20'
          } `}>
          <div className="scrollable flex flex-col gap-5 overflow-y-auto p-3 md:max-h-105">
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-gray-500">No se encontraron citas</p>
            ) : (
              filtered.map((a) => (
                <AppointmentCard
                  rol={rol}
                  key={a.id}
                  appointment={a}
                  isNext={a.id === nextAppointmentId}
                  onEdit={() => openEditModal(a)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {editableData && (
        <EditAppointmentModal
          visible={editModalVisible}
          onHide={() => setEditModalVisible(false)}
          data={editableData}
          setData={setEditableData}
          onSave={handleSave}
        />
      )}
    </>
  );
}
