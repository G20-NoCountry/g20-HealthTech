import { nextAppointment } from "./mockDoctorData";

interface NextAppointment {
  patientName: string;
  reason: string;
  time: string;
  isToday: boolean;
}

interface NextAppointmentCardProps {
  appointment: NextAppointment;
}

export const NextAppointmentCard = ({ }: NextAppointmentCardProps) => {
  return (
    <div className="bg-[#734F96] text-white p-6 rounded-3xl border   flex flex-col md:flex-row justify-between items-center ">
              <div className="mb-4 md:mb-0">
                <p className="text-sm uppercase">Iniciar Video Llamada - Próxima Cita -</p>
                <p className="text-2xl font-bold">Hoy - {nextAppointment.time}</p>
                <p className="text-lg">{nextAppointment.patientName} ({nextAppointment.reason})</p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className=' bg-[#EABAFF]  rounded-full px-5 py-3 inline-block'>DIAGNOSTICO</button>
                <button className='bg-[#EABAFF]  rounded-full px-5 py-3 inline-block'>VER PERFIL</button>
                <button className='bg-[#EABAFF]  rounded-full px-5 py-3 inline-block'>INICIAR AHORA</button>
            </div>
            </div>
  );
};