import { Avatar } from 'primereact/avatar';
import Logo from '../../assets/logo.png';
import { SidebarNav } from './Sidebar';
import { NotificationBell } from '../Notifications/NotificationBell';
import { useAuth } from '../../contexts/AuthContext';
import { patientNotifications, doctorNotifications } from '../../services/mockNotifications';
import type { MedicUser } from '../../api/models/user.interface';

export default function Navbar() {
  const { user } = useAuth();
  const role = user?.rol === 'medico' ? 'medico' : 'paciente';
  const notifications = role === 'medico' ? doctorNotifications : patientNotifications;

  function isMedicUser(user: any): user is MedicUser {
    return user?.rol === 'medico' && 'specialty' in user;
  }

  return (
    <header className="flex h-18 w-full items-center justify-between gap-5 px-3 py-5 md:px-10">
      <SidebarNav />
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar image={Logo} shape="circle" />
          <p className="font-lemonada text-accent text-xl uppercase">Medic App</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right md:block">
            <p className="uppercase">
              {user?.first_name} {user?.last_name}
            </p>
            {isMedicUser(user) && (
              <p className="inline-block rounded-full bg-[#EABAFF] px-2 py-0.5 text-xs">
                {user.specialty}
              </p>
            )}
          </div>
          <NotificationBell notifications={notifications} />
        </div>
      </div>
    </header>
  );
}
