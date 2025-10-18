import { RouterLayout } from './common/RouterLayout.tsx';
import { Route, Routes } from 'react-router';
import { AppointmentScheduler } from "../components/appointment-scheduler/AppointmentScheduler.tsx";
import { LoginPage } from '../pages/LoginPage.tsx';



export const AppRouter= () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointment" element={<AppointmentScheduler />} />
      </Route>
    </Routes>
  );
};
