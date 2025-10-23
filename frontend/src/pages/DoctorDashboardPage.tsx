import { AppointmentListItem } from '../components/DasboardMedico/AppointmentListItem';
import { nextAppointment, stats, todayAppointments } from '../components/DasboardMedico/mockDoctorData';
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
    <div className=" min-h-screen p-4 md:p-8">
      <main>
            <h2 className="text-lg text-gray-600 mb-4">{finalDateString}</h2>
          <NextAppointmentCard appointment={nextAppointment} />
        <div className="bg-white/50 p-6 mt-5 rounded-3xl border shadow-lg border-[#AFAAAA] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold ">CITAS DE HOY</h3>
          <button className="rounded-3xl border shadow-lg border-[#AFAAAA] p-2 ">VER AGENDA COMPLETA</button>
          </div>
          <div className="max-h-[23rem] overflow-y-auto pr-4 custom-scrollbar">
            <div className="space-y-3">
              {todayAppointments.map(app => (
                <AppointmentListItem key={app.id} appointment={app} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {stats.map(stat => (
            <StatCard 
              key={stat.id} 
              icon={stat.icon} 
              value={stat.value} 
              label={stat.label} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};