import type { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { RouterLayout } from './common/RouterLayout.tsx';
import Login from '../pages/Login.tsx';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};
