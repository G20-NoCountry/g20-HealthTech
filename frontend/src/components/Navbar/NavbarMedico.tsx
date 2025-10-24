import { Badge } from 'primereact/badge';
import Logo from '../../assets/logo.png';
import { SidebarMedico } from './SidebarMedico';
import { doctorInfo } from '../../components/DasboardMedico/mockDoctorData';
import { Avatar } from 'primereact/avatar';

export default function Navbar() {
  return (
    <header className="flex h-18 w-full items-center justify-between gap-5 px-3 py-5 md:px-10">
      <SidebarMedico />
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar image={Logo} shape="circle" />
          <p className="font-lemonada text-accent text-xl uppercase">Medic App</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right md:block">
            <p className="hidden uppercase md:block">{doctorInfo.name}</p>
            <p className="inline-block rounded-full bg-[#EABAFF] px-2 py-0.5 text-xs">
              {doctorInfo.specialty}
            </p>
          </div>
          <button className="hover:bg-muted flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent">
            <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.5rem' }}>
              <Badge value="" severity="danger"></Badge>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
}
