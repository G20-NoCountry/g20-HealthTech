import { useState } from 'react';
import { AppointmentStep1 } from './AppointmentStep1';
import { AppointmentStep2 } from './AppointmentStep2';
import { AppointmentStep3 } from './AppointmentStep3';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import appointmentSchema from './appointmentSteps.schema';
import { useNavigate } from 'react-router';

interface Toast {
  toast: any;
}

export interface AppointmentData {
  appointmentType: 'Presencial' | 'Virtual';
  specialityId: string | '';
  doctorId: string | '';
  date: Date | null;
  time: string | '';
}

export const AppointmentScheduler = ({ toast }: Toast) => {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    appointmentType: 'Presencial',
    specialityId: '',
    doctorId: '',
    date: null,
    time: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointmentData,
  });

  // Funciones para cambiar de paso
  const goToNextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger(['appointmentType', 'specialityId', 'doctorId']);
    }

    if (currentStep === 2) {
      isValid = await trigger(['date', 'time']);
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log('Faltan campos obligatorios');
    }
  };

  const goToPrevStep = () => setCurrentStep((prev) => prev - 1);

  const finish: SubmitHandler<AppointmentData> = (data: AppointmentData) => {
    console.log('Cita Confirmada:', data);
    toast.current?.show({
      severity: 'success',
      summary: '¡Cita agendada correctamente!',
      life: 3000,
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  // Decidimos qué componente mostrar según el estado 'currentStep'
  if (currentStep === 1) {
    return (
      <AppointmentStep1
        onNext={goToNextStep}
        data={appointmentData}
        setData={setAppointmentData}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <AppointmentStep2
        onNext={goToNextStep}
        onPrev={goToPrevStep}
        data={appointmentData}
        setData={setAppointmentData}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    );
  }

  if (currentStep === 3) {
    return (
      <AppointmentStep3
        onPrev={goToPrevStep}
        onConfirm={handleSubmit(finish)}
        data={appointmentData}
      />
    );
  }

  // Fallback por si algo sale mal
  return <div>Paso no encontrado</div>;
};
