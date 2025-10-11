import type { FC } from "react";
import { RouterLayout } from './common/RouterLayout.tsx';
import { Route, Routes } from 'react-router';
import { Login } from '../pages/Login.tsx';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};
