import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DiagnosisModal } from './DiagnosisModal';

export interface NextAppointment {
  patientName: string;
  reason: string;
  time: string;
  isToday: boolean;
  dateLabel?: string;
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
      navigate(`/patient-profile/${appointment.patientId}`);
    } else {
      alert('ID del paciente no encontrado.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between rounded-3xl border bg-[#734F96] p-6 md:flex-row">
        <div className="mb-4 text-white md:mb-0">
          <p className="text-sm uppercase">Próxima Cita</p>
          <p className="text-2xl font-bold">
            {appointment.isToday ? 'Hoy' : appointment.dateLabel || 'Próximamente'} -{' '}
            {appointment.time}
          </p>
          <p className="text-lg">
            {appointment.patientName}
            {appointment.reason && ` (${appointment.reason})`}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto">
          <button
            onClick={handleDiagnostico}
            className="flex items-center justify-center gap-2 rounded-full bg-[#EABAFF] px-5 py-3 transition-colors hover:bg-gray-200">
            <i className="pi pi-folder-open"></i>
            <span>DIAGNOSTICO</span>
          </button>

          <button
            onClick={handleVerPerfil}
            className="flex items-center justify-center gap-2 rounded-full bg-[#EABAFF] px-5 py-3 transition-colors hover:bg-gray-200">
            <i className="pi pi-user"></i>
            <span>VER PERFIL</span>
          </button>
          <a
            href={appointment.meetLink || 'https://meet.google.com/landing'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#EABAFF] px-5 py-3 transition-colors hover:bg-gray-200">
            <i className="pi pi-video"></i>
            <span>INICIAR AHORA</span>
          </a>
        </div>
      </div>
      <Dialog
        header="Registro de Consulta"
        visible={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        className="w-11/12 md:w-3/4 lg:w-1/2 xl:max-w-3xl">
        <DiagnosisModal appointmentData={appointment} onClose={() => setIsModalVisible(false)} />
      </Dialog>
    </>
  );
};
