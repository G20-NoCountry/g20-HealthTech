import { Route, Routes } from 'react-router';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegisterPage } from '../pages/RegisterPage.tsx';
import { RouterLayout } from './common/RouterLayout.tsx';
import { AppointmentScheduler } from '../components/appointment-scheduler/AppointmentScheduler.tsx';
import MedicalRecordsPage from '../pages/MedicalRecordsPage.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/appointment" element={<AppointmentScheduler />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/medical-records" element={<MedicalRecordsPage />} />
    </Routes>
  );
};
