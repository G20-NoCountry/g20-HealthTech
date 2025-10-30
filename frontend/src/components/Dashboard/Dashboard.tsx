import { useEffect, useState, useMemo } from 'react';
import { Calendar, type CalendarDateTemplateEvent } from 'primereact/calendar';
import AppointmentCard from './AppointmentCard';
import {
  EditAppointmentModal,
  type EditableAppointmentModalData,
  toAppointment,
} from './EditAppointmentModal';
import { isSameDay } from '../../utils/date';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../api';
import type { Appointment, AppointmentWithUsers } from '../../api/models/appointment.interface';
import { isAppointmentScheduled } from './appointments';

export default function Dashboard() {
  const [appointments, setAppointments] = useState<AppointmentWithUsers[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableData, setEditableData] = useState<EditableAppointmentModalData | null>(null);
  const { user } = useAuth();

  const rol = user?.rol ?? 'paciente';
  const today = new Date();

  // Filtrar citas por fecha seleccionada
  const filtered = useMemo(() => {
    if (!date) return appointments;
    return appointments.filter((a) => isSameDay(new Date(a.start_at), date));
  }, [appointments, date]);

  const appointmentDates = useMemo(
    () => appointments.map((a) => new Date(a.start_at)),
    [appointments],
  );

  // Cargar citas y médicos o pacientes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res =
          rol === 'medico'
            ? await api.appointments.searchAppointmentsAsMedic({})
            : await api.appointments.searchPatientAppointments({});

        const items = res.data ?? [];
        console.log(items);

        // Obtener el resumen de médicos de una sola vez
        const medicsSummary = await api.users.getMedicsSummary();

        // Crear un mapa con los médicos (medic_id -> fullName)
        const doctorsMap = new Map<number, string>();
        medicsSummary.data.forEach((medic) => {
          const fullName = `${medic.first_name} ${medic.last_name}`;
          doctorsMap.set(Number(medic.medic_id), fullName);
        });

        // Mapear las citas y asociarles los datos del médico
        const parsed: AppointmentWithUsers[] = items
          .filter((it) => isAppointmentScheduled(it.status!)) // Filtrar por estado
          .map((it) => {
            const start = new Date(it.start_at);
            const end = new Date(it.end_at);

            return {
              ...it,
              doctor: {
                id: it.medic_id,
                name: doctorsMap.get(it.medic_id) ?? 'Desconocido',
              },
              patient: {
                id: it.patient_id,
                name: `Paciente #${it.patient_id}`,
              },
              start_at: start.toISOString(),
              end_at: end.toISOString(),
              type: it.type === 'virtual' ? 'virtual' : 'in_person',
            };
          });

        // Ordenar las citas por fecha de inicio
        setAppointments(
          parsed.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()),
        );
      } catch (e) {
        console.error('Error fetching appointments:', e);
      }
    };

    fetchAppointments();
  }, [rol]);

  // Obtener la próxima cita
  const nextAppointmentId = filtered.find((a) => new Date(a.start_at) >= today)?.id;

  // Template para el calendario con tooltip
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

  // Abrir modal de edición de cita
  const openEditModal = (appointment: Appointment) => {
    const hours = new Date(appointment.start_at).getHours().toString().padStart(2, '0');
    const minutes = new Date(appointment.start_at).getMinutes().toString().padStart(2, '0');
    if (appointment.id) {
      setEditableData({
        id: appointment.id,
        date: new Date(appointment.start_at),
        time: `${hours}:${minutes}`,
      });
    }
    setEditModalVisible(true);
  };

  // Guardar cambios en la cita
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
        patient_id: existing.patient_id,
        medic_id: existing.medic_id,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        type: existing.type,
        location: existing.location,
      };

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

  // Eliminar una cita
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
        {/* Calendario */}
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value ?? null)}
          inline
          locale="es"
          minDate={today}
          dateFormat="dd/mm/yy"
          dateTemplate={dateTemplate}
        />

        {/* Lista de citas */}
        <div
          className={`border-success overflow-hidden rounded-xl border ${rol === 'paciente' ? 'bg-white' : 'bg-button-secondary shadow-black/20'}`}>
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

      {/* Modal de edición */}
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
