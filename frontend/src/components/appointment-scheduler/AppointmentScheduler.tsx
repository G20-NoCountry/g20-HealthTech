
import { useState } from 'react';
import { AppointmentStep1 } from './AppointmentStep1';
import { AppointmentStep2 } from './AppointmentStep2';
import { AppointmentStep3 } from './AppointmentStep3';
import type { Nullable } from 'primereact/ts-helpers';


export interface AppointmentData {
  appointmentType: 'Presencial' | 'Virtual';
  specialtyId: string | null;
  doctorId: string | null;
  date: Nullable<Date>;
  time: string | null;
}
export const AppointmentScheduler = () => {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    appointmentType: 'Presencial',
    specialtyId: null,
    doctorId: null,
    date: null,
    time: null,
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Funciones para cambiar de paso
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPrevStep = () => setCurrentStep((prev) => prev - 1);
  const finish = () => alert('¡Cita Confirmada!');

  // Decidimos qué componente mostrar según el estado 'currentStep'
  if (currentStep === 1) {
    return <AppointmentStep1 onNext={goToNextStep} data={appointmentData} setData={setAppointmentData} />;
  }

  if (currentStep === 2) {
    return <AppointmentStep2 onNext={goToNextStep} onPrev={goToPrevStep} data={appointmentData} setData={setAppointmentData} />;
  }

  if (currentStep === 3) {
    return <AppointmentStep3 onPrev={goToPrevStep} onConfirm={finish} data={appointmentData} />;
  }

  // Fallback por si algo sale mal
  return <div>Paso no encontrado</div>;
};