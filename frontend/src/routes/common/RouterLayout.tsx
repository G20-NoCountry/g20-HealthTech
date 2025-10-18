import { Outlet } from "react-router";

export const RouterLayout = () => {
  return (
    <div className="w-full h-full">
      <Outlet /> {/* 👈 aquí se renderiza tu Login */}
    </div>
  );
};
