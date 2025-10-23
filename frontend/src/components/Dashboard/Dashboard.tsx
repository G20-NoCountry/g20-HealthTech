import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { AppointmentsService } from '../../services/AppointmentService';
import type { Nullable } from 'primereact/ts-helpers';
import AppointmentCard from './AppointmentCard';
import { isSameDay } from '../../utils/date';
import type { Appointment } from '../../models/appointment.model';

type CalendarDateTemplateEvent = {
  year: number;
  month: number;
  day: number;
  today: boolean;
  selectable: boolean;
  otherMonth: boolean;
  className: string;
};

function sortByStartAt(appointments: Appointment[]): Appointment[] {
  return [...appointments].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
  );
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [appointmentDates, setAppointmentDates] = useState<Date[]>([]);

  useEffect(() => {
    AppointmentsService.getAppointments().then((data) => {
      const sorted = sortByStartAt(data);
      setAppointments(sorted);
      setFiltered(sorted);

      const uniqueDates = Array.from(
        new Set(data.map((a) => new Date(a.start_at).toDateString())),
      ).map((d) => new Date(d));

      setAppointmentDates(uniqueDates);
    });
  }, []);

  useEffect(() => {
    if (date) {
      const day = date.toDateString();
      setFiltered(appointments.filter((a) => new Date(a.start_at).toDateString() === day));
    } else {
      setFiltered(appointments);
    }
  }, [date, appointments]);

  const nextAppointmentId = filtered.find((a) => new Date(a.start_at) >= new Date())?.id;
  const today = new Date();

  const dateTemplate = (event: CalendarDateTemplateEvent) => {
    const date = new Date(event.year, event.month, event.day);

    const hasAppointment = appointmentDates.some((d) => isSameDay(d, date));

    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-full ${
          hasAppointment ? 'bg-accent/30 text-gray-800' : ''
        }`}>
        {event.day}
      </div>
    );
  };

  return (
    <div className="grid h-full w-full max-w-7xl grid-cols-1 gap-4 lg:max-h-105 lg:grid-cols-[minmax(0,410px)_auto]">
      {/* Calendario */}
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        locale="es"
        minDate={today}
        dateFormat="dd/mm/yy"
        dateTemplate={dateTemplate}
      />

      {/* Lista de citas */}
      <div className="border-success overflow-hidden rounded-xl border">
        <div className="scrollable flex flex-col gap-5 overflow-y-auto p-3 md:max-h-105">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-gray-500">No se encontraron citas</p>
          ) : (
            filtered.map((a) => (
              <AppointmentCard key={a.id} appointment={a} isNext={a.id === nextAppointmentId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
