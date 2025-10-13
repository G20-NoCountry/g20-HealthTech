import type { FC } from 'react';
import { Outlet } from "react-router-dom";

export const RouterLayout: FC = () => {
  return (
    <div>
      {/* Aquí podrías agregar un header o sidebar si luego lo necesitas */}
      <Outlet />
    </div>
  );
};