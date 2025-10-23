export interface Appointment {
  id: number;
  time: string;
  patientName: string;
  type: 'Presencial' | 'Virtual';
  status: 'Finalizada' | 'Pendiente';
}

interface AppointmentListItemProps {
  appointment: Appointment;
}

export const AppointmentListItem = ({ appointment }: AppointmentListItemProps) => {
  const isPending = appointment.status === 'Pendiente';

  return (
    <div className="bg-white p-4 rounded-3xl border shadow-lg border-[#AFAAAA] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-center w-20"> {/* Ancho fijo para alinear */}
          <p className="font-bold text-[#734F96]">{appointment.time}</p>
          <p className={`text-xs font-semibold ${isPending ? 'text-yellow-500' : 'text-green-500'}`}>
            {appointment.status.toUpperCase()}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{appointment.patientName}</p>
          <p className="text-sm text-gray-500">{appointment.type}</p>
        </div>
      </div>
      <div className="flex gap-2 ">
        {isPending && appointment.type === 'Virtual' && (
      <button className='bg-[#734F96] text-white rounded-full px-5 py-3 inline-block'>MEET</button>
        )}
      <button className='bg-[#734F96] text-white rounded-full px-5 py-3 inline-block'>VER PERFIL</button>
      </div>
    </div>
  );
};