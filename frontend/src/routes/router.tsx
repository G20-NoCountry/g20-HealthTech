import { RouterLayout } from './common/RouterLayout.tsx';
import { Route, Routes } from 'react-router';
import { LoginPage } from '../pages/LoginPage.tsx';
import MedicalRecordsPage from '../pages/MedicalRecordsPage.tsx';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
      </Route>
    </Routes>
  );
};
