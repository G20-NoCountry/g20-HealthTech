import { canJoinVirtualAppointment } from '../../utils/date';

interface Props {
  startAt: string;
  endAt: string;
}

export default function VirtualAppointmentActions({ startAt, endAt }: Props) {
  const canJoin = canJoinVirtualAppointment(startAt, endAt);

  if (!canJoin) return null;

  return (
    <div className="flex flex-col gap-2 self-end">
      <a
        href="https://react.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-button-primary flex w-fit items-center gap-3 rounded-4xl px-5 py-2 shadow-md shadow-black/20">
        <span className="pi pi-video text-accent"></span>
        Unirse a videollamada
      </a>
    </div>
  );
}
