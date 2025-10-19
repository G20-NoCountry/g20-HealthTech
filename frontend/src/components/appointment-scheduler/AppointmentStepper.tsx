import React from 'react';

// Ícono de check (tilde) para los pasos completados
const CheckIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all
                  ${isCompleted ? 'bg-[#734F96]' : ''}
                  ${isActive ? 'bg-[#734F96] text-white' : ''}
                  ${!isCompleted && !isActive ? 'border-2 border-gray-300 text-gray-400' : ''}
                `}
              >
                {isCompleted ? <CheckIcon /> : step.number}
              </div>
              <p className={`mt-2 text-xs font-semibold ${isActive || isCompleted ? 'text-[#734F96]' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && <div className="flex-auto h-px bg-gray-300 mx-4"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};