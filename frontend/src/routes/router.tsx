import { RouterLayout } from './common/RouterLayout.tsx';
import { Route, Routes } from 'react-router';
import { LoginPage } from '../pages/LoginPage.tsx';


export const AppRouter= () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
