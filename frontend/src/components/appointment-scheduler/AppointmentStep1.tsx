import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import { specialties, doctors } from '../appointment-scheduler/mockData';
import type { AppointmentData } from './AppointmentScheduler';

// ícono para el dropdown
const ChevronDownIcon = () => (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

interface Step1Props {
  onNext: () => void;
  data: AppointmentData;
  setData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}

export const AppointmentStep1 = ({ onNext, data, setData }: Step1Props) => {

  // Lógica para filtrar los médicos según la especialidad seleccionada en data
  const availableDoctors = data.specialtyId
    ? doctors.filter(doc => doc.specialtyId === data.specialtyId)
    : [];

    const handleDataChange = (field: keyof AppointmentData, value: any) => {
    setData(prevData => {
      const newData = { ...prevData, [field]: value };
      if (field === 'specialtyId') {
        newData.doctorId = null;
      }
      return newData;
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF5FF] p-4 flex items-center justify-center">
      <div className="w-full h-full max-w-6xl bg-white rounded-3xl border border-[#AFAAAA] shadow-lg flex flex-col p-8 md:p-12 space-y-6">
        <AppointmentHeader />
        <AppointmentStepper currentStep={1} />

        <div className="flex-grow space-y-6 pt-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleDataChange('appointmentType', 'Presencial')}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg border transition-all ${data.appointmentType === 'Presencial' ? 'bg-purple-50 border-[#734F96]' : 'bg-white border-gray-300'}`}
            >
              <span className={`font-semibold ${data.appointmentType === 'Presencial' ? 'text-[#734F96]' : 'text-gray-700'}`}>PRESENCIAL</span>
            </button>
            <button
              onClick={() => handleDataChange('appointmentType', 'Virtual')}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg border transition-all ${data.appointmentType === 'Virtual' ? 'bg-purple-50 border-[#734F96]' : 'bg-white border-gray-300'}`}
            >
              <span className={`font-semibold ${data.appointmentType === 'Virtual' ? 'text-[#734F96]' : 'text-gray-700'}`}>VIRTUAL</span>
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-2">ESPECIALIDAD</label>
            <select
              value={data.specialtyId || ''}
              onChange={(e) => handleDataChange('specialtyId', e.target.value)}
              className="w-full p-4 rounded-lg border border-[#AFAAAA] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#734F96]"
            >
              <option value="" disabled>Seleccionar especialidad</option>
              {specialties.map(spec => (
                <option key={spec.id} value={spec.id}>{spec.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-4"><ChevronDownIcon /></div>
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-2">MÉDICO</label>
            <select
              value={data.doctorId || ''}
              onChange={(e) => handleDataChange('doctorId', e.target.value)}
              disabled={!data.specialtyId}
              className="w-full p-4 rounded-lg border border-[#AFAAAA] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#734F96] disabled:bg-gray-100"
            >
              <option value="" disabled>Seleccionar médico</option>
              {availableDoctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-4"><ChevronDownIcon /></div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button onClick={onNext} className="bg-[#734F96] text-white font-bold py-3 px-10 rounded-full hover:bg-[#5f3d7c] transition-colors">
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};