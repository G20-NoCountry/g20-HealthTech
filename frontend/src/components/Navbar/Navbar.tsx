import { Avatar } from 'primereact/avatar';
import SidebarNav from './Sidebar';
import Logo from '../../assets/logoMedicalApp.png';
import { Badge } from 'primereact/badge';

export default function Navbar() {
  return (
    <header className="flex h-18 w-full items-center gap-5 px-3 py-5 md:px-10">
      <SidebarNav />
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar image={Logo} shape="circle" />
          <p className="font-lemonada text-accent text-xl uppercase">Medic App</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden uppercase md:block">Susana Ramirez</p>
          <button className="hover:bg-muted flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent">
            <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.5rem' }}>
              <Badge value="3" severity="danger"></Badge>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
}
