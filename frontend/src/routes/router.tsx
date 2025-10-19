// src/routes/router.tsx

// Eliminamos 'import React from "react";'
import { Route, Routes } from 'react-router';
import { LoginPage } from '../pages/LoginPage.tsx'; // Asumo esta ruta
import { RegisterPage } from '../pages/RegisterPage.tsx';
import { RouterLayout } from './common/RouterLayout.tsx'; // Importa la página corregida

// export const de la aplicación principal
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Uso de la página corregida */}
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};