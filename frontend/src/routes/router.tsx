import { Route, Routes } from 'react-router';
import { RouterLayout } from './common/RouterLayout.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegisterPage } from '../pages/RegisterPage.tsx';
import ClinicalRecordsPage from '../pages/ClinicalRecordsPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import DashboardPage from '../pages/DashboardPage.tsx';
import AppointmentStepperPage from '../pages/AppointmentStepperPage.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Layout que incluye sidebar */}
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="appointment" element={<AppointmentStepperPage />} />
        <Route path="clinical-records" element={<ClinicalRecordsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      {/* Rutas sin sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
