import VirtualAppointmentActions from './VirtualAppointmentActions';
import { isAppointmentEditable } from './appointments';
import { formatDateTime } from '../../utils/date';
import type { Appointment } from '../../models/appointment.model';

interface AppointmentCardProps {
  appointment: Appointment;
  isNext: boolean;
  onEdit: () => void;
}

export default function AppointmentCard({ appointment, isNext, onEdit }: AppointmentCardProps) {
  const { doctor, start_at, type, status, end_at } = appointment;
  const { date, time } = formatDateTime(start_at);
  const isEditable = isAppointmentEditable(status);

  return (
    <div className="bg-button-primary/40 shadow-button-primary/80 relative flex flex-col gap-2 rounded-lg p-3 shadow-lg lg:p-5">
      {isNext && (
        <p className="flex items-center gap-3 font-medium">
          <span
            className="pi pi-thumbtack"
            style={{
              fontSize: '1.2rem',
              color: 'slateblue',
              transform: 'rotate(45deg)',
            }}
          />
          Próxima cita
        </p>
      )}

      {/* Acciones de editar / eliminar si es editable */}
      {isEditable && (
        <div className="absolute right-3 bottom-3 flex flex-wrap gap-3 lg:top-5 lg:right-5">
          <button
            className="border-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded border bg-transparent"
            onClick={onEdit}>
            <span className="pi pi-pen-to-square text-accent"></span>
          </button>
          <button className="border-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded border bg-transparent">
            <span className="pi pi-trash text-accent"></span>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className="pi pi-user text-gray-400"></i>
          {doctor.name}
        </p>
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className="pi pi-calendar text-gray-400"></i>
          {date}
        </p>
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className="pi pi-clock text-gray-400"></i>
          {time}
        </p>
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className="pi pi-tag text-gray-400"></i>
          {type === 'virtual' ? 'Virtual' : 'Presencial'}
        </p>
      </div>

      {/* Acciones adicionales si es cita virtual */}
      {type === 'virtual' && <VirtualAppointmentActions startAt={start_at} endAt={end_at} />}
    </div>
  );
}
