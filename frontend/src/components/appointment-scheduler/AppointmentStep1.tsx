import { useState } from 'react';
import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';

const ChevronDownIcon = () => (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

interface Step1Props { onNext: () => void; }

export const AppointmentStep1=  ({ onNext }: Step1Props) => {
  const [appointmentType, setAppointmentType] = useState('presencial');

  return (
    <div className="min-h-screen w-full  p-4 flex items-center justify-center">
      
      <div className="w-full max-w-6xl rounded-3xl border border-[#AFAAAA] shadow-lg  p-8 md:p-12 space-y-6 overflow-y-auto">
        
        <AppointmentHeader />
        <AppointmentStepper currentStep={1} />

        <div className="flex-grow space-y-6 pt-4">
            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => setAppointmentType('presencial')}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg border transition-all ${appointmentType === 'presencial' ? 'bg-purple-50 border-[#734F96]' : 'bg-white border-gray-300'}`}
                >
                    <span className={`font-semibold ${appointmentType === 'presencial' ? 'text-[#734F96]' : 'text-gray-700'}`}>PRESENCIAL</span>
                </button>
                <button 
                    onClick={() => setAppointmentType('virtual')}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg border transition-all ${appointmentType === 'virtual' ? 'bg-purple-50 border-[#734F96]' : 'bg-white border-gray-300'}`}
                >
                    <span className={`font-semibold ${appointmentType === 'virtual' ? 'text-[#734F96]' : 'text-gray-700'}`}>VIRTUAL</span>
                </button>
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-2">ESPECIALIDAD</label>
                <select className="w-full p-4 rounded-lg border border-[#AFAAAA] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#734F96]">
                    <option>Seleccionar especialidad</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-4"><ChevronDownIcon /></div>
            </div>
            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-2">MÉDICO</label>
                <select className="w-full p-4 rounded-lg border border-[#AFAAAA] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#734F96]">
                    <option>Seleccionar médico</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-4"><ChevronDownIcon /></div>
            </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-end pt-6">
          <button onClick={onNext} className="bg-[#734F96] text-white font-bold py-3 px-10 rounded-full hover:bg-[#5f3d7c] transition-colors">
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};