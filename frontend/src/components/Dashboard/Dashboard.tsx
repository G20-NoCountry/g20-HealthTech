import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { AppointmentsService, type Appointment } from '../../services/AppoimentService';
import type { Nullable } from 'primereact/ts-helpers';

function sortByStartAt(appointments: Appointment[]): Appointment[] {
  return [...appointments].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
  );
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);
  const [date, setDate] = useState<Nullable<Date>>(null);

  useEffect(() => {
    AppointmentsService.getAppointments().then((data) => {
      const sorted = sortByStartAt(data);
      setAppointments(sorted);
      setFiltered(sorted);
    });
  }, []);

  const nextAppointmentId = filtered.find((a) => new Date(a.start_at) >= new Date())?.id;

  const footer = (
    <a
      href="https://react.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-button-primary flex w-fit items-center gap-3 self-end rounded-4xl px-5 py-2 shadow-md shadow-black/20">
      <span className="pi pi-video text-accent"></span> Virtual
    </a>
  );

  const today = new Date();

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
      />
      {/* Lista */}
      <div className="border-info scrollable flex flex-col gap-5 overflow-y-auto rounded-xl border-2 border-dashed p-3 md:max-h-105">
        {filtered.map((a) => {
          const isNextAppointment = a.id === nextAppointmentId;
          const date: Date = new Date(a.start_at);
          const formattedDate: string = date.toLocaleDateString('es-ES'); // "25/10/2025"
          const formattedTime: string = date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          }); // "09:00"

          return (
            <div
              key={a.id}
              className="bg-button-primary/40 shadow-button-primary/80 relative flex flex-col gap-2 rounded-lg p-5 shadow-lg">
              {isNextAppointment && (
                <p className="flex items-center gap-3 font-medium">
                  <span
                    className="pi pi-thumbtack"
                    style={{
                      fontSize: '1.2rem',
                      color: 'slateblue',
                      transform: 'rotate(45deg)',
                    }}></span>
                  Próxima cita
                </p>
              )}

              <div className="absolute top-5 right-5 flex flex-wrap gap-3">
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-accent flex h-7 w-7 items-center justify-center rounded border bg-transparent">
                  <span className="pi pi-pen-to-square text-accent"></span>
                </a>
                <button className="border-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded border bg-transparent">
                  <span className="pi pi-trash text-accent"></span>
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-3">
                  <i className="pi pi-user text-gray-400"></i>
                  {a.doctor.name}
                </p>
                <p className="flex items-center gap-3">
                  <i className="pi pi-calendar text-gray-400"></i>
                  {new Date(a.start_at).toLocaleDateString('es-ES')}
                </p>
                <p className="flex items-center gap-3">
                  <i className="pi pi-clock text-gray-400"></i>
                  {new Date(a.start_at).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {a.type === 'virtual' && footer}
            </div>
          );
        })}
      </div>
    </div>
  );
}
