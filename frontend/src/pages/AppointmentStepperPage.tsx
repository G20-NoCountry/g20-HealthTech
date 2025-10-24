import { AppointmentScheduler } from '../components/appointment-scheduler/AppointmentScheduler';

export default function AppointmentStepperPage() {
  return (
    <section className="flex w-full flex-col items-center gap-2 p-3 md:p-10">
      <AppointmentScheduler />
    </section>
  );
}
