import { Route, Routes } from 'react-router';
import { RouterLayout } from './common/RouterLayout.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegisterPage } from '../pages/RegisterPage.tsx';
import { AppointmentScheduler } from '../components/appointment-scheduler/AppointmentScheduler.tsx';
import MedicalRecordsPage from '../pages/MedicalRecordsPage.tsx';
import HomePage from '../pages/HomePage.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Layout que incluye sidebar */}
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="appointment" element={<AppointmentScheduler />} />
        <Route path="medical-records" element={<MedicalRecordsPage />} />
      </Route>

      {/* Rutas sin sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
