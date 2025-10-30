import { useState } from 'react';
import { AppointmentStep1 } from './AppointmentStep1';
import { AppointmentStep2 } from './AppointmentStep2';
import { AppointmentStep3 } from './AppointmentStep3';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import appointmentSchema from './appointmentSteps.schema';
import { useNavigate } from 'react-router';
import { api } from '../../api';
import { useAuth } from '../../contexts/AuthContext';

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
    appointmentType: 'Virtual',
    specialityId: '',
    doctorId: '',
    date: null,
    time: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const finish: SubmitHandler<AppointmentData> = async (data: AppointmentData) => {
    try {
      if (!user || user.rol !== 'paciente') throw new Error('Debes iniciar sesión como paciente');
      if (!data.date || !data.time || !data.doctorId || !data.specialityId) throw new Error('Faltan datos');

      // Construir start_at y end_at (sumamos 30 minutos por defecto)
      const [hh, mm] = data.time.split(':').map((n) => parseInt(n, 10));
      const startAt = new Date(data.date);
      startAt.setHours(hh, mm, 0, 0);
      const endAt = new Date(startAt.getTime() + 30 * 60 * 1000);

      // Mapear tipo
      const type = data.appointmentType === 'Presencial' ? 'in_person' : 'virtual';

      const payload = {
        start_at: startAt.toISOString(),
        end_at: endAt.toISOString(),
        type,
        patient_id: Number(user.id),
        medic_id: Number(data.doctorId),
        location: type === 'in_person' ? 'Consultorio 1' : 'Virtual',
      } as any;

      const res = await api.appointments.createAppointmentAsPatient(payload);
      if (!res.success) throw new Error(res.message || 'Error al crear la cita');

      console.log(payload);
      
      toast.current?.show({
        severity: 'success',
        summary: '¡Cita agendada correctamente!',
        life: 2500,
      });
      setTimeout(() => navigate('/dashboard', { replace: true }), 1200);
    } catch (err: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'No se pudo crear la cita',
        detail: err?.message || 'Intenta nuevamente',
        life: 3000,
      });
    }
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
