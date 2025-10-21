import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import { Calendar } from 'primereact/calendar';
import type { Nullable } from 'primereact/ts-helpers';
import type { AppointmentData } from './AppointmentScheduler';
import { addLocale } from 'primereact/api';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  data: AppointmentData;
  setData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ],
  today: 'Hoy',
  clear: 'Limpiar',
});
export const AppointmentStep2 = ({ onNext, onPrev, data, setData }: Step2Props) => {
  const availableTimes = [
    '9:00 AM',
    '9:15 AM',
    '9:30 AM',
    '9:45 AM',
    '10:00 AM',
    '10:15 AM',
    '10:30 AM',
    '10:45 AM',
    '11:00 AM',
    '11:15 AM',
    '11:30 AM',
    '11:45 AM',
    '12:00 PM',
    '12:15 PM',
    '12:30 PM',
    '12:45 PM',
    '1:00 PM',
    '1:15 PM',
    '1:30 PM',
    '1:45 PM',
    '2:00 PM',
    '2:15 PM',
    '2:30 PM',
    '2:45 PM',
    '3:00 PM',
    '3:15 PM',
    '3:30 PM',
    '3:45 PM',
    '4:00 PM',
    '4:15 PM',
    '4:30 PM',
    '4:45 PM',
    '5:00 PM',
    '5:15 PM',
    '5:30 PM',
    '5:45 PM',
  ];

  const handleDateChange = (date: Nullable<Date>) => {
    setData((prevData) => ({ ...prevData, date: date }));
  };

  const handleTimeChange = (time: string) => {
    setData((prevData) => ({ ...prevData, time: time }));
  };

  const today = new Date();

  return (
    <div className="flex w-full max-w-7xl flex-col space-y-6 overflow-y-auto rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
      <AppointmentHeader />
      <AppointmentStepper currentStep={2} />

      <div className="flex flex-grow flex-col gap-8 rounded-3xl border border-[#AFAAAA] p-8 pt-6 lg:flex-row">
        <div className="flex-1">
          <label className="mb-2 block font-semibold">FECHA</label>
          <Calendar
            value={data.date}
            onChange={(e) => handleDateChange(e.value)}
            inline
            locale="es"
            className="w-full"
            minDate={today}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <label className="mb-2 block font-semibold">HORA DISPONIBLE</label>
          <div className="custom-scrollbar scrollable h-72 flex-grow overflow-y-auto pr-4">
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeChange(time)}
                  className={`w-full rounded-lg border p-3 text-center transition-colors ${
                    data.time === time
                      ? 'border-[#734F96] bg-purple-50 font-semibold text-[#734F96]'
                      : 'border-gray-300 text-gray-700 hover:border-[#734F96]'
                  }`}>
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="rounded-full bg-gray-200 px-10 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-300">
          ATRÁS
        </button>
        <button
          onClick={onNext}
          className="rounded-full bg-[#734F96] px-10 py-3 font-bold text-white transition-colors hover:bg-[#5f3d7c]">
          SIGUIENTE
        </button>
      </div>
    </div>
  );
};
