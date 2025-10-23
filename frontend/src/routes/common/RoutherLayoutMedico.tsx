import { Outlet } from 'react-router';
import NavbarMedico from '../../components/Navbar/NavbarMedico';

export const RouterLayoutMedico = () => {
  return (
    <div className="flex min-h-dvh w-full max-w-7xl flex-1 flex-col items-center">
      <NavbarMedico />
      <Outlet />
    </div>
  );
};
