import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import { Calendar } from 'primereact/calendar';
import type { AppointmentData } from './AppointmentScheduler';
import { availableTimes } from './mockData';
import { Controller } from 'react-hook-form';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  data: AppointmentData;
  setData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  setValue: any;
  control: any;
  errors: any;
}

export const AppointmentStep2 = ({
  onNext,
  onPrev,
  data,
  setData,
  setValue,
  control,
  errors,
}: Step2Props) => {
  const handleDateChange = (e: any) => {
    const selectedDate = e.value; // Extraemos la fecha desde el evento
    setData((prevData) => ({ ...prevData, date: selectedDate }));
    setValue('date', selectedDate); // Actualiza el valor en react-hook-form
  };

  const handleTimeChange = (time: string) => {
    setData((prevData) => ({ ...prevData, time: time }));
    setValue('time', time); // Actualiza el valor en react-hook-form
  };

  const today = new Date();

  return (
    <div className="flex w-full max-w-7xl flex-col space-y-6 overflow-y-auto rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
      <AppointmentHeader />
      <AppointmentStepper currentStep={2} />

      <div className="flex flex-grow flex-col gap-8 rounded-3xl border border-[#AFAAAA] p-8 pt-6 lg:flex-row">
        <div className="flex-1">
          <label className="mb-2 block font-semibold">FECHA</label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Calendar
                {...field}
                inline
                locale="es"
                className="w-full"
                minDate={today}
                onChange={handleDateChange}
              />
            )}
          />
          {errors.date && <span>{errors.date.message}</span>}
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
              {errors.time && <span>{errors.time.message}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="rounded-full bg-gray-200 px-10 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-300">
          Atrás
        </button>
        <button
          onClick={onNext}
          className="rounded-full bg-[#734F96] px-10 py-3 font-bold text-white transition-colors hover:bg-[#5f3d7c]">
          Siguiente
        </button>
      </div>
    </div>
  );
};
