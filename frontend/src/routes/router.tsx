import { Route, Routes } from 'react-router';
import { RouterLayout } from './common/RouterLayout';
import { RouterLayoutMedico } from './common/RoutherLayoutMedico';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';

// Páginas
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import AppointmentStepperPage from '../pages/AppointmentStepperPage';
import ClinicalRecordsPage from '../pages/ClinicalRecordsPage';
import { ProfilePage } from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';

import { DoctorDashboardPage } from '../pages/DoctorDashboardPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';
import SettingsPageMedico from '../pages/SettingsPageMedico';
import DoctorDiaryPage from '../pages/DoctorDiaryPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas para PACIENTE */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['paciente']} />}>
          <Route element={<RouterLayout />}>
            <Route path="appointment" element={<AppointmentStepperPage />} />
            <Route path="clinical-records" element={<ClinicalRecordsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Rutas protegidas para MÉDICO */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['medico']} />}>
          <Route element={<RouterLayoutMedico />}>
            <Route path="dashboardMedico" element={<DoctorDashboardPage />} />
            <Route path="doctor-profile/:id" element={<DoctorProfilePage />} />
            <Route path="settings-medico" element={<SettingsPageMedico />} />
            <Route path="doctor-diary" element={<DoctorDiaryPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
