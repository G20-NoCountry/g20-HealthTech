import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import { Calendar } from 'primereact/calendar';
import type { Nullable } from "primereact/ts-helpers";
import { useState } from 'react';
import { addLocale } from 'primereact/api';

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

interface Step2Props { onNext: () => void; onPrev: () => void; }

export const AppointmentStep2= ({  onNext, onPrev }: Step2Props) => {
    const availableTimes = [
        '9:00 AM',  '9:15 AM',  '9:30 AM',  '9:45 AM','10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM','11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM','12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM','1:00 PM',  '1:15 PM',  '1:30 PM',  '1:45 PM','2:00 PM',  '2:15 PM',  '2:30 PM',  '2:45 PM', '3:00 PM',  '3:15 PM',  '3:30 PM',  '3:45 PM', '4:00 PM',  '4:15 PM',  '4:30 PM',  '4:45 PM','5:00 PM'
      ];
const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-3xl border border-[#AFAAAA] shadow-lg  p-8 md:p-12 space-y-6 overflow-y-auto">
        
        <AppointmentHeader />
        <AppointmentStepper currentStep={2} />

        <div className="flex-grow flex flex-col md:flex-row gap-8 pt-6">
            <div className="flex-1">
                <label className="font-semibold block mb-2">FECHA</label>
                <div className="w-full">
              <Calendar 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.value)} 
                inline  
                className="w-full border-none" 
                locale="es"
              />
            </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="font-semibold block mb-2">HORA DISPONIBLE</label>
                <div className='h-72 flex-grow overflow-y-auto pr-2'>
                    <div className="grid grid-cols-3 gap-3">
                      {availableTimes.map((time) => (
                       <button key={time} className="w-full p-3 border border-gray-300 rounded-lg text-center text-gray-700 hover:border-[#734F96] hover:text-[#734F96] focus:bg-purple-50 focus:border-[#734F96] focus:text-[#734F96] transition-colors">
                          {time}
                      </button>
                      ))}
                  </div>  
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