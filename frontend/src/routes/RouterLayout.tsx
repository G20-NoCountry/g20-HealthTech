import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

export const RouterLayout = () => {
  return (
    <div className="flex min-h-dvh w-full max-w-7xl flex-1 flex-col items-center">
      <Navbar />
      <Outlet />
    </div>
  );
};
