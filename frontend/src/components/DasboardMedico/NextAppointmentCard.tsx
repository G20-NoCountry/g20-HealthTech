import { useNavigate } from "react-router";
import { nextAppointment } from "./mockDoctorData";

// Definimos la "forma" de los datos que espera este componente
interface NextAppointment {
  patientName: string;
  reason: string;
  time: string;
  isToday: boolean;
  meetLink?: string; // Opcional: un link para la videollamada
  patientId?: string; // Opcional: un ID para ir al perfil
}

interface NextAppointmentCardProps {
  appointment: NextAppointment;
}

export const NextAppointmentCard = ({ appointment }: NextAppointmentCardProps) => {
  // 2. Usamos el hook de navegación
  const navigate = useNavigate();

  // --- FUNCIONES PARA LOS BOTONES ---


  // Botón "Ver Perfil"
  const handleVerPerfil = () => {
    // Navegamos a la ruta del perfil del paciente.
    // El ID del paciente vendría en los datos del turno.
    if (appointment.patientId) {
      navigate(`/pacientes/${appointment.patientId}`);
    } else {
      alert('ID del paciente no encontrado.');
    }
  };
  return (
    <div className="bg-[#734F96]  p-6 rounded-3xl border   flex flex-col md:flex-row justify-between items-center ">
              <div className="mb-4 md:mb-0 text-white">
                <p className="text-sm uppercase">Iniciar Video Llamada - Próxima Cita -</p>
                <p className="text-2xl font-bold">Hoy - {nextAppointment.time}</p>
                <p className="text-lg">{nextAppointment.patientName} ({nextAppointment.reason})</p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className='bg-[#EABAFF] flex items-center justify-center gap-2  rounded-full px-5 py-3 hover:bg-gray-200 transition-colors'>
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
  );
};