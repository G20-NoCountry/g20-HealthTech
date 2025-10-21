import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

export const RouterLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
