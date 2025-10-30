import VirtualAppointmentActions from './VirtualAppointmentActions';
import { isAppointmentScheduled } from './appointments';
import { formatDateTime } from '../../utils/date';
import type { AppointmentWithUsers } from '../../api/models/appointment.interface';

interface AppointmentCardProps {
  appointment: AppointmentWithUsers;
  isNext: boolean;
  onEdit: () => void;
  rol: 'paciente' | 'medico';
}

export default function AppointmentCard({
  appointment,
  isNext,
  onEdit,
  rol,
}: AppointmentCardProps) {
  const { doctor, patient, type, status, start_at, end_at } = appointment;
  const startAtDate = new Date(appointment.start_at);
  const { date, time } = formatDateTime(startAtDate);
  const isEditable = isAppointmentScheduled(status!);

  return (
    <div
      className={`relative flex flex-col gap-2 rounded-lg p-3 shadow-lg lg:p-5 ${
        rol === 'paciente'
          ? 'bg-button-primary/40 shadow-button-primary/80 shadow-md'
          : 'bg-white shadow-black/20'
      } `}>
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
          <i className={`pi pi-user ${rol === 'paciente' ? 'text-gray-400' : 'text-accent'}`} />
          {rol === 'paciente' ? doctor.name : patient.name}
        </p>
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className={`pi pi-calendar ${rol === 'paciente' ? 'text-gray-400' : 'text-accent'}`} />
          {date}
        </p>
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className={`pi pi-clock ${rol === 'paciente' ? 'text-gray-400' : 'text-accent'}`} />
          {time}
        </p>
        <p className="flex items-center gap-3 text-sm md:text-base">
          <i className={`pi pi-tag ${rol === 'paciente' ? 'text-gray-400' : 'text-accent'}`} />
          {type === 'virtual' ? 'Virtual' : 'Presencial'}
        </p>
      </div>

      {/* Acciones adicionales si es cita virtual */}
      {type === 'virtual' && (
        <VirtualAppointmentActions startAt={new Date(start_at)} endAt={new Date(end_at)} />
      )}
    </div>
  );
}
