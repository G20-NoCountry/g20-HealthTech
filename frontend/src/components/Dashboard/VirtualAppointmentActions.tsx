import { canJoinVirtualAppointment } from '../../utils/date';

interface Props {
  startAt: string;
  endAt: string;
}

export default function VirtualAppointmentActions({ startAt, endAt }: Props) {
  const canJoin = canJoinVirtualAppointment(startAt, endAt);

  if (!canJoin) return null;

  return (
    <div className="flex flex-col gap-2">
      <a
        href="https://react.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-button-primary flex w-fit items-center rounded-4xl px-5 py-2 text-xs shadow-md shadow-black/20 md:text-base">
        <span className="pi pi-video text-accent mr-3"></span>
        Unirse <span className="hidden sm:block">&nbsp;a videollamada</span>
      </a>
    </div>
  );
}
