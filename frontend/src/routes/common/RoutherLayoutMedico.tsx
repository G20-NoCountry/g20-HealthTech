import { Outlet } from 'react-router';
import NavbarMedico from '../../components/Navbar/NavbarMedico';

export const RouterLayoutMedico = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavbarMedico />
      <Outlet />
    </div>
  );
};
