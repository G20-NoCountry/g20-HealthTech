import type { FC } from 'react';
import { RouterLayout } from './common/RouterLayout.tsx';
import { Route, Routes } from 'react-router';
import { Login } from '../pages/Login.tsx';
import MedicalRecordsPage from '../pages/MedicalRecordsPage.tsx';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
      </Route>
    </Routes>
  );
};
