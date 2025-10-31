import { Route, Routes } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import AppointmentStepperPage from '../pages/AppointmentStepperPage';
import ClinicalRecordsPage from '../pages/ClinicalRecordsPage';
import { ProfilePage } from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import { DoctorDashboardPage } from '../pages/DoctorDashboardPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';
import SettingsPageMedico from '../pages/SettingsPageMedico';
import DoctorDiaryPage from '../pages/DoctorDiaryPage';
import { RouterLayout } from './RouterLayout';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PatientHistoryPage } from '../pages/PatientHistoryPage';
import LandingPage from '../pages/LandingPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RouterLayout />}>
          {/* Rutas PACIENTE */}
          <Route element={<RoleRoute allowedRoles={['paciente']} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="appointment" element={<AppointmentStepperPage />} />
            <Route path="clinical-records" element={<ClinicalRecordsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Rutas MÉDICO */}
          <Route element={<RoleRoute allowedRoles={['medico']} />}>
            <Route path="dashboardMedico" element={<DoctorDashboardPage />} />
            <Route path="doctor-profile/:id" element={<DoctorProfilePage />} />
            <Route path="patient-profile/:id" element={<ProfilePage />} />
            <Route path="settings-medico" element={<SettingsPageMedico />} />
            <Route path="doctor-diary" element={<DoctorDiaryPage />} />
            <Route path='medical-history/:id' element={<PatientHistoryPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
