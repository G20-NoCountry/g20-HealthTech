import { Route, Routes } from 'react-router';
import { RouterLayout } from './common/RouterLayout.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegisterPage } from '../pages/RegisterPage.tsx';
import ClinicalRecordsPage from '../pages/ClinicalRecordsPage.tsx';
import HomePage from '../pages/HomePage.tsx';
import { ProfilePage } from '../pages/ProfilePage.tsx';
import { DoctorDashboardPage } from '../pages/DoctorDashboardPage.tsx';
import { RouterLayoutMedico } from './common/RoutherLayoutMedico.tsx';
import DashboardPage from '../pages/DashboardPage.tsx';
import AppointmentStepperPage from '../pages/AppointmentStepperPage.tsx';
import DoctorProfilePage from '../pages/DoctorProfilePage.tsx';
import SettingsPage from '../pages/SettingsPage.tsx';
import SettingsPageMedico from '../pages/SettingsPageMedico.tsx';
import DoctorDiaryPage from '../pages/DoctorDiaryPage.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Layout que incluye sidebar */}
      <Route path="/" element={<RouterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="appointment" element={<AppointmentStepperPage />} />
        <Route path="clinical-records" element={<ClinicalRecordsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="/" element={<RouterLayoutMedico />}>
        <Route path="dashboardMedico" element={<DoctorDashboardPage />} />
        <Route path="doctor-profile/:id" element={<DoctorProfilePage />} />
        <Route path="settings-medico" element={<SettingsPageMedico />} />
        <Route path="doctor-diary" element={<DoctorDiaryPage />} />
      </Route>

      {/* Rutas sin sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
