import { Link } from 'react-router';
import Dashboard from '../components/Dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <section className="flex w-full flex-col items-center gap-2 p-3 md:p-10">
      <div className="flex w-full max-w-7xl flex-col space-y-6 overflow-y-auto rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
            <p className="text-accent text-sm font-medium md:text-base">Administra tus citas</p>
          </div>
          <Link
            to="/appointment"
            className="bg-button-secondary hover:bg-muted flex w-fit cursor-pointer items-center gap-3 rounded-3xl px-6 py-3 text-black uppercase shadow-md/30 transition duration-300 ease-in-out">
            <span className="pi pi-calendar text-accent" style={{ fontSize: '1.4rem' }}></span>{' '}
            Nueva cita
          </Link>
        </header>
        <Dashboard rol="patient" />
      </div>
    </section>
  );
}
