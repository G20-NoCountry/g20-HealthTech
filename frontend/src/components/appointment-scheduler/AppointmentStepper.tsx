import React from 'react';

// Ícono de check (tilde) para los pasos completados
const CheckIcon = () => (
  <svg
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

interface StepperProps {
  currentStep: number;
}

export const AppointmentStepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'MÉDICO' },
    { number: 2, title: 'FECHA Y HORA' },
    { number: 3, title: 'CONFIRMAR' },
  ];

  return (
    <div className="flex w-full items-center">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-all ${isCompleted ? 'bg-[#734F96]' : ''} ${isActive ? 'bg-[#734F96] text-white' : ''} ${!isCompleted && !isActive ? 'border-2 border-gray-300 text-gray-400' : ''} `}>
                {isCompleted ? <CheckIcon /> : step.number}
              </div>
              <p
                className={`mt-2 text-xs font-semibold ${isActive || isCompleted ? 'text-[#734F96]' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && <div className="mx-4 h-px flex-auto bg-gray-300"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};
