import { Outlet } from 'react-router';

export const RouterLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Outlet />
    </div>
  );
};
