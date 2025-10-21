import Dashboard from '../components/Dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-2 p-3 md:p-10">
      <div className="flex w-full max-w-7xl flex-col space-y-6 overflow-y-auto rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
        <header>
          <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
          <p className="text-accent text-sm font-medium md:text-base">Administra tus citas</p>
        </header>
        <Dashboard />
      </div>
    </section>
  );
}
