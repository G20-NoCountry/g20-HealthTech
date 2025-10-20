import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { NavLink } from 'react-router';
import Logo from '../../assets/logoMedicalApp.png';

export default function SidebarNav() {
  const [visible, setVisible] = useState<boolean>(false);

  const customHeader = (
    <div className="flex items-center gap-3">
      <Avatar image={Logo} shape="circle" />
      <span className="font-lemonada text-accent text-xl uppercase">Medic App</span>
    </div>
  );

  return (
    <>
      <Sidebar
        header={customHeader}
        visible={visible}
        onHide={() => setVisible(false)}
        className="bg-info">
        <div className="overflow-y-auto">
          <nav className="flex flex-col gap-1">
            <NavLink
              to="/"
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-home mr-3"></i>
              <span className="font-medium">Inicio</span>
              <Ripple />
            </NavLink>
            <NavLink
              to="/profile"
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-user mr-3"></i>
              <span className="font-medium">Perfil</span>
              <Ripple />
            </NavLink>
            <NavLink
              to="/medical-records"
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-folder-open mr-3"></i>
              <span className="font-medium">Historial Médico</span>
              <Ripple />
            </NavLink>
            <NavLink
              to="/medical-records"
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-credit-card mr-3"></i>
              <span className="font-medium">Pagos</span>
              <Ripple />
            </NavLink>
            <NavLink
              to="/settings"
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-cog mr-3"></i>
              <span className="font-medium">Ajustes</span>
              <Ripple />
            </NavLink>
            <NavLink
              to="/"
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-sign-out mr-3"></i>
              <span className="font-medium">Cerrar sesión</span>
              <Ripple />
            </NavLink>
          </nav>
        </div>
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="sidebar-button" />
    </>
  );
}
