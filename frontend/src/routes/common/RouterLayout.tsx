import { Outlet } from 'react-router';

export const RouterLayout = () => {
  return (
    <div className="h-full w-full">
      <Outlet /> {/* 👈 aquí se renderiza tu Login */}
    </div>
  );
};
