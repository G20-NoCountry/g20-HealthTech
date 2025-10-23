import { Avatar } from 'primereact/avatar';
import SidebarNav from './Sidebar';
import Logo from '../../assets/logoMedicalApp.png';

export default function Navbar() {
  return (
    <header className="flex h-18 w-full items-center gap-5 px-3 py-5 md:px-10">
      <SidebarNav />
      <div className="flex items-center gap-3">
        <Avatar image={Logo} shape="circle" />
        <span className="font-lemonada text-accent text-xl uppercase">Medic App</span>
      </div>
    </header>
  );
}
