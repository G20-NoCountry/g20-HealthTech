import { useEffect, useState, useMemo } from 'react';
import { Calendar, type CalendarDateTemplateEvent } from 'primereact/calendar';
import AppointmentCard from './AppointmentCard';
import {
  EditAppointmentModal,
  type EditableAppointmentModalData,
  toAppointment,
} from './EditAppointmentModal';
import { isSameDay } from '../../utils/date';
import type { Appointment } from '../../models/appointment.model';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../api';

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableData, setEditableData] = useState<EditableAppointmentModalData | null>(null);
  const { user } = useAuth();

  const rol = user?.rol ?? 'paciente';

  const today = new Date();

  const filtered = useMemo(() => {
    if (!date) return appointments;
    return appointments.filter((a) => isSameDay(a.start_at, date));
  }, [appointments, date]);

  const appointmentDates = useMemo(() => appointments.map((a) => a.start_at), [appointments]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (rol === 'medico') {
          const res = await api.appointments.searchAppointmentsAsMedic({});
          const items = res.data ?? [];
          const parsed: Appointment[] = items.map((it) => {
            const start = new Date(it.start_at);
            const end = new Date(it.end_at);
            return {
              id: it.id ?? 0,
              patient: { id: it.patient_id, name: `Paciente #${it.patient_id}` },
              doctor: { id: it.medic_id, name: `Médico #${it.medic_id}` },
              start_at: start,
              end_at: end,
              status: 'scheduled',
              type: it.type === 'virtual' ? 'virtual' : 'in_person',
              location: it.location ?? '#',
              created_at: start,
              updated_at: end,
            };
          });
          setAppointments(parsed.sort((a, b) => a.start_at.getTime() - b.start_at.getTime()));
        } else {
          const res = await api.appointments.searchPatientAppointments({});
          const items = res.data ?? [];
          const parsed: Appointment[] = items.map((it) => {
            const start = new Date(it.start_at);
            const end = new Date(it.end_at);
            return {
              id: it.id ?? 0,
              patient: { id: it.patient_id, name: `Paciente #${it.patient_id}` },
              doctor: { id: it.medic_id, name: `Médico #${it.medic_id}` },
              start_at: start,
              end_at: end,
              status: 'scheduled',
              type: it.type === 'virtual' ? 'virtual' : 'in_person',
              location: it.location ?? '#',
              created_at: start,
              updated_at: end,
            };
          });
          setAppointments(parsed.sort((a, b) => a.start_at.getTime() - b.start_at.getTime()));
        }
      } catch (e) {}
    };
    fetchAppointments();
  }, [rol]);

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

  const handleSave = async (updated: EditableAppointmentModalData) => {
    try {
      const existing = appointments.find((a) => a.id === updated.id);
      if (!existing) return;

      const [h, m] = updated.time.split(':').map(Number);
      const start = new Date(updated.date);
      start.setHours(h, m, 0, 0);
      const end = new Date(start.getTime() + 30 * 60 * 1000);

      const payload = {
        id: existing.id,
        patient_id: existing.patient.id,
        medic_id: existing.doctor.id,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        type: existing.type,
        location: existing.location,
      } as any;

      if (rol === 'medico') {
        await api.appointments.updateMedicAppointment(payload);
      } else {
        await api.appointments.updatePatientAppointment(payload);
      }

      setAppointments((prev) =>
        prev.map((a) => (a.id === updated.id ? toAppointment(updated, a) : a)),
      );
    } finally {
      setEditModalVisible(false);
      setEditableData(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (rol === 'medico') {
        await api.appointments.deleteMedicAppointment(id);
      } else {
        await api.appointments.deletePatientAppointment(id);
      }
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } finally {
      setEditModalVisible(false);
      setEditableData(null);
    }
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
            rol === 'paciente' ? 'bg-white' : 'bg-button-secondary shadow-black/20'
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
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
