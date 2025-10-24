import { Route, Routes } from 'react-router';
import { RouterLayout } from './common/RouterLayout.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegisterPage } from '../pages/RegisterPage.tsx'
import ClinicalRecordsPage from '../pages/ClinicalRecordsPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import { ProfilePage } from '../pages/ProfilePage.tsx';
import DashboardPage from '../pages/DashboardPage.tsx';
import AppointmentStepperPage from '../pages/AppointmentStepperPage.tsx';
import DoctorProfilePage from '../pages/DoctorProfilePage.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Layout que incluye sidebar */}
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="appointment" element={<AppointmentStepperPage/>} />
        <Route path="clinical-records" element={<ClinicalRecordsPage />} />
        <Route path="profile" element={<ProfilePage/>} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="doctor-profile/:id" element={<DoctorProfilePage />} />
      </Route>

      {/* Rutas sin sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
