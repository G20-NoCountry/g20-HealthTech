import { AppointmentScheduler } from '../components/appointment-scheduler/AppointmentScheduler';

export default function AppointmentStepperPage() {
  return (
    <section className="flex flex-col gap-2 p-3 md:p-10">
      <AppointmentScheduler />
    </section>
  );
}
