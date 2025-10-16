import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';

interface Step2Props { onNext: () => void; onPrev: () => void; }

export const AppointmentStep2= ({  onNext, onPrev }: Step2Props) => {
    const availableTimes = [
        '9:00 AM', '10:00 AM', '11:30 AM', '12:30 PM', 
        '1:45 PM', '2:00 PM', '3:30 PM', '4:00 PM', 
        '4:30 PM', '5:00 PM', '5:30 PM', '5:00 PM', '5:30 PM'
      ];

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center">
      <div className="w-full h-full max-w-6xl rounded-3xl border border-[#AFAAAA] shadow-lg  p-8 md:p-12 space-y-6 overflow-y-auto">
        
        <AppointmentHeader />
        <AppointmentStepper currentStep={2} />

        <div className="flex-grow flex flex-col md:flex-row gap-8 pt-6">
            <div className="flex-1">
                <label className="font-semibold block mb-2">FECHA</label>
                <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 font-medium">Calendario</p>
                </div>
            </div>
            <div className="flex-1">
                <label className="font-semibold block mb-2">HORA DISPONIBLE</label>
                <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((time) => (
                    <button key={time} className="w-full p-3 border border-gray-300 rounded-lg text-center text-gray-700 hover:border-[#734F96] hover:text-[#734F96] focus:bg-purple-50 focus:border-[#734F96] focus:text-[#734F96] transition-colors">
                        {time}
                    </button>
                ))}
                </div>
            </div>
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={onPrev} className="bg-gray-200 text-gray-600 font-bold py-3 px-10 rounded-full hover:bg-gray-300 transition-colors">
            ATRÁS
          </button>
          <button onClick={onNext} className="bg-[#734F96] text-white font-bold py-3 px-10 rounded-full hover:bg-[#5f3d7c] transition-colors">
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};