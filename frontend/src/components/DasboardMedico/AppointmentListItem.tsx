import { Link } from "react-router";

export interface Appointment {
  id: number;
  time: string;
  patientName: string;
  type: 'Presencial' | 'Virtual';
  status: 'Finalizada' | 'Pendiente';
  patientId?: string;
}

interface AppointmentListItemProps {
  appointment: Appointment;
}

export const AppointmentListItem = ({ appointment }: AppointmentListItemProps) => {
  const isPending = appointment.status === 'Pendiente';

  return (
<div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
        <div className="text-center w-20"> 
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
          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className='bg-[#734F96] text-white rounded-full px-5 py-3 inline-block hover:bg-[#EABAFF] transition-colors'
          >
            MEET
          </a>
        )}
        <Link
          to={`/pacientes/${appointment.patientId || ''}`}
          className='bg-[#734F96] text-white rounded-full px-5 py-3 inline-block hover:bg-[#EABAFF] transition-colors'
        >
          VER PERFIL
        </Link>      </div>
    </div>
    
  );
};