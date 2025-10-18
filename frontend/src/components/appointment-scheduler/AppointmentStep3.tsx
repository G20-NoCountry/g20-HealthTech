import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import type { AppointmentData } from './AppointmentScheduler';
import { specialties, doctors } from '../appointment-scheduler/mockData';

interface Step3Props {
  onPrev: () => void;
  onConfirm: () => void;
  data: AppointmentData;
}

export const AppointmentStep3 = ({ onPrev, onConfirm, data }: Step3Props) => {
  const getSpecialtyName = () => {
    const specialty = specialties.find(s => s.id === data.specialtyId);
    return specialty ? specialty.name : 'No seleccionada';
  };

  const getDoctorName = () => {
    const doctor = doctors.find(d => d.id === data.doctorId);
    return doctor ? doctor.name : 'No seleccionado';
  };

  const getFormattedDate = () => {
    if (!data.date) return 'No seleccionada';
    return new Date(data.date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF5FF] p-4 flex items-center justify-center">
      <div className="w-full h-full max-w-6xl bg-white rounded-3xl border border-[#AFAAAA] shadow-lg flex flex-col p-8 md:p-12 space-y-6 overflow-y-auto">    
        <AppointmentHeader />
        <AppointmentStepper currentStep={3} />
        <div className="flex-grow flex flex-col justify-center items-center space-y-6 pt-8">
            <div className="w-full p-8 border-2 border-dashed border-gray-200 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">ESPECIALIDAD</p>
                        <p className="text-lg font-bold text-gray-800">{getSpecialtyName()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">FECHA</p>
                        <p className="text-lg font-bold text-gray-800">{getFormattedDate()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">MÉDICO</p>
                        <p className="text-lg font-bold text-gray-800">{getDoctorName()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">HORA</p>
                        <p className="text-lg font-bold text-gray-800">{data.time || 'No seleccionada'}</p>
                    </div>
                </div>
            </div>
            
            <div className="w-full bg-blue-100/60 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-center">
                <p>RECIBIRÁS UN CORREO DE NOTIFICACIÓN CON LOS DETALLES DE TU CITA</p>
            </div>
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={onPrev} className="bg-gray-200 text-gray-600 font-bold py-3 px-10 rounded-full hover:bg-gray-300 transition-colors">
            ATRÁS
          </button>
          <button onClick={onConfirm} className="bg-[#734F96] text-white font-bold py-3 px-10 rounded-full hover:bg-[#5f3d7c] transition-colors">
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
};