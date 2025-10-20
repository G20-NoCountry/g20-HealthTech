import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import { specialties, doctors } from '../appointment-scheduler/mockData';
import type { AppointmentData } from './AppointmentScheduler';

// ícono para el dropdown
const ChevronDownIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor">
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
    ? doctors.filter((doc) => doc.specialtyId === data.specialtyId)
    : [];

  const handleDataChange = (field: keyof AppointmentData, value: any) => {
    setData((prevData) => {
      const newData = { ...prevData, [field]: value };
      if (field === 'specialtyId') {
        newData.doctorId = null;
      }
      return newData;
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FDF5FF] p-4">
      <div className="flex h-full w-full max-w-6xl flex-col space-y-6 rounded-3xl border border-[#AFAAAA] p-8 shadow-lg md:p-12">
        <AppointmentHeader />
        <AppointmentStepper currentStep={1} />

        <div className="flex-grow space-y-6 pt-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleDataChange('appointmentType', 'Presencial')}
              className={`flex items-center gap-2 rounded-lg border px-8 py-3 transition-all ${data.appointmentType === 'Presencial' ? 'border-[#734F96] bg-purple-50' : 'border-gray-300 bg-white'}`}>
              <span
                className={`font-semibold ${data.appointmentType === 'Presencial' ? 'text-[#734F96]' : 'text-gray-700'}`}>
                PRESENCIAL
              </span>
            </button>
            <button
              onClick={() => handleDataChange('appointmentType', 'Virtual')}
              className={`flex items-center gap-2 rounded-lg border px-8 py-3 transition-all ${data.appointmentType === 'Virtual' ? 'border-[#734F96] bg-purple-50' : 'border-gray-300 bg-white'}`}>
              <span
                className={`font-semibold ${data.appointmentType === 'Virtual' ? 'text-[#734F96]' : 'text-gray-700'}`}>
                VIRTUAL
              </span>
            </button>
          </div>

          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-600">ESPECIALIDAD</label>
            <select
              value={data.specialtyId || ''}
              onChange={(e) => handleDataChange('specialtyId', e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#AFAAAA] bg-white p-4 focus:ring-2 focus:ring-[#734F96] focus:outline-none">
              <option value="" disabled>
                Seleccionar especialidad
              </option>
              {specialties.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-7 right-0 flex items-center px-4">
              <ChevronDownIcon />
            </div>
          </div>
          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-600">MÉDICO</label>
            <select
              value={data.doctorId || ''}
              onChange={(e) => handleDataChange('doctorId', e.target.value)}
              disabled={!data.specialtyId}
              className="w-full appearance-none rounded-lg border border-[#AFAAAA] bg-white p-4 focus:ring-2 focus:ring-[#734F96] focus:outline-none disabled:bg-gray-100">
              <option value="" disabled>
                Seleccionar médico
              </option>
              {availableDoctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-7 right-0 flex items-center px-4">
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onNext}
            className="rounded-full bg-[#734F96] px-10 py-3 font-bold text-white transition-colors hover:bg-[#5f3d7c]">
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};
