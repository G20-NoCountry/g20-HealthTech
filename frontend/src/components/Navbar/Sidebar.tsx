import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { NavLink, useNavigate } from 'react-router';
import { menuItems } from './menuItems';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';

export const SidebarNav = () => {
  const [visible, setVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const role = user?.rol === 'medico' ? 'medico' : 'paciente';
  const items = menuItems[role];

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
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold transition-colors duration-150 hover:bg-black/10">
                <i className={`${item.icon} mr-3`}></i>
                <span className="font-medium">{item.label}</span>
                <Ripple />
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="p-ripple flex w-full cursor-pointer items-center rounded-xl p-3 font-bold text-red-600 transition-colors duration-150 hover:bg-black/10">
              <i className="pi pi-sign-out mr-3"></i>
              <span className="font-medium">Cerrar sesión</span>
              <Ripple />
            </button>
          </nav>
        </div>
      </Sidebar>

      <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="sidebar-button" />
    </>
  );
};
