import { useNavigate } from "react-router";
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DiagnosisModal } from './DiagnosisModal';

export interface NextAppointment {
  patientName: string;
  reason: string;
  time: string;
  isToday: boolean;
  meetLink?: string; 
  patientId?: string; 
}

interface NextAppointmentCardProps {
  appointment: NextAppointment;
}

export const NextAppointmentCard = ({ appointment }: NextAppointmentCardProps) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDiagnostico = () => {
    setIsModalVisible(true);
  };

  const handleVerPerfil = () => {
    if (appointment.patientId) {
      navigate(`/pacientes/${appointment.patientId}`);
    } else {
      alert('ID del paciente no encontrado.');
    }
  };

  return (
    <><div className="bg-[#734F96]  p-6 rounded-3xl border   flex flex-col md:flex-row justify-between items-center ">
      <div className="mb-4 md:mb-0 text-white">
        <p className="text-sm uppercase">Próxima Cita</p>
        <p className="text-2xl font-bold">{appointment.isToday ? 'Hoy' : 'Próximamente'} - {appointment.time}</p>
        <p className="text-lg">{appointment.patientName}{appointment.reason && ` (${appointment.reason})`}</p>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto">
        <button
          onClick={handleDiagnostico}
          className='bg-[#EABAFF] flex items-center justify-center gap-2  rounded-full px-5 py-3 hover:bg-gray-200 transition-colors'>
          <i className="pi pi-folder-open "></i>
          <span>DIAGNOSTICO</span>
        </button>

        <button
          onClick={handleVerPerfil}
          className='bg-[#EABAFF] flex items-center justify-center gap-2  rounded-full px-5 py-3 hover:bg-gray-200 transition-colors'>
          <i className="pi pi-user "></i>
          <span>VER PERFIL</span>
        </button>
        <a
          href={appointment.meetLink || "https://meet.google.com/landing"}
          target="_blank"
          rel="noopener noreferrer"
          className='bg-[#EABAFF] flex items-center justify-center gap-2  rounded-full px-5 py-3 hover:bg-gray-200 transition-colors'>
          <i className="pi pi-video"></i>
          <span>INICIAR AHORA</span>
        </a>
      </div>
    </div>
    <Dialog
      header="Registro de Consulta"
      visible={isModalVisible}
      onHide={() => setIsModalVisible(false)}
      className="w-11/12 md:w-3/4 lg:w-1/2 xl:max-w-3xl" 
    >
        <DiagnosisModal
          appointmentData={appointment}
          onClose={() => setIsModalVisible(false)} />
      </Dialog></>
  );
};