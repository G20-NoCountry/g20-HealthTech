
import { useState } from 'react';
import { AppointmentStep1 } from './AppointmentStep1';
import { AppointmentStep2 } from './AppointmentStep2';
import { AppointmentStep3 } from './AppointmentStep3';

export const AppointmentScheduler = () => {
  // Este estado es la clave: nos dice qué paso mostrar.
  const [currentStep, setCurrentStep] = useState(1);

  // Funciones para cambiar de paso
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPrevStep = () => setCurrentStep((prev) => prev - 1);
  const finish = () => alert('¡Cita Confirmada!');

  // Decidimos qué componente mostrar según el estado 'currentStep'
  if (currentStep === 1) {
    return <AppointmentStep1 onNext={goToNextStep} />;
  }

  if (currentStep === 2) {
    return <AppointmentStep2 onNext={goToNextStep} onPrev={goToPrevStep} />;
  }

  if (currentStep === 3) {
    return <AppointmentStep3 onPrev={goToPrevStep} onConfirm={finish} />;
  }

  // Fallback por si algo sale mal
  return <div>Paso no encontrado</div>;
};