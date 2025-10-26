import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { AppointmentScheduler } from '../components/appointment-scheduler/AppointmentScheduler';

export default function AppointmentStepperPage() {
  const toast = useRef<Toast>(null);
  return (
    <section className="flex w-full flex-col items-center gap-2 p-3 md:p-10">
      <Toast ref={toast} position="top-right" />
      <AppointmentScheduler toast={toast} />
    </section>
  );
}
