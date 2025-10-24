import { Link } from 'react-router';
import { AppointmentListItem } from '../components/DasboardMedico/AppointmentListItem';
import {
  nextAppointment,
  stats,
  todayAppointments,
} from '../components/DasboardMedico/mockDoctorData';
import { NextAppointmentCard } from '../components/DasboardMedico/NextAppointmentCard';
import { StatCard } from '../components/DasboardMedico/StatCard';

export const DoctorDashboardPage = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const finalDateString = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="min-h-screen p-4 md:p-8 w-full max-w-7xl">
      <main>
        <h2 className="mb-4 text-lg text-gray-600">{finalDateString}</h2>
        <NextAppointmentCard appointment={nextAppointment} />
        <div className="mt-5 mb-8 rounded-3xl border border-[#AFAAAA] bg-white/50 p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between md:flex-row flex-col gap-2">
            <h3 className="text-xl font-bold">CITAS DE HOY</h3>

            <Link
              to="/" //AGREGAR RUTA DE AGENDA COMPLETA CUANDO ESTE LISTA
              className="rounded-3xl border border-[#AFAAAA] p-3 shadow-lg transition-colors hover:bg-gray-200">
              <i className="pi pi-calendar text-[#734F96]"></i>
              <span className="p-2">VER AGENDA COMPLETA</span>
            </Link>
          </div>
          <div className="custom-scrollbar max-h-[23rem] overflow-y-auto pr-4">
            <div className="space-y-3">
              {todayAppointments.map((app) => (
                <AppointmentListItem key={app.id} appointment={app} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.id} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </main>
    </div>
  );
};
