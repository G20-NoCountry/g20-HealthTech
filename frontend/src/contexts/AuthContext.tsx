import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api';
import type { PatientUser, MedicUser } from '../api/models/user.interface';

interface AuthContextType {
  user: PatientUser | MedicUser | null;
  isLoading: boolean;
  isMedico: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PatientUser | MedicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 AuthContext: Obteniendo usuario actual...');
      const response = await api.users.getCurrentUser();
      console.log('📥 AuthContext: Respuesta recibida:', response);
      if (response.success && response.data?.user) {
        console.log('✅ AuthContext: Usuario cargado:', response.data.user);
        setUser(response.data.user);
      } else {
        console.warn('⚠️ AuthContext: No se pudo cargar el usuario');
      }
    } catch (error: any) {
      // Error 401 es normal cuando no hay sesión, no lo logueamos como error
      if (error?.response?.status === 401) {
        console.log('ℹ️ AuthContext: No hay sesión activa (esto es normal si no has iniciado sesión)');
        setUser(null);
      } else {
        console.error('❌ AuthContext: Error al cargar usuario:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const isMedico = user ? 'specialty' in user : false;

  return (
    <AuthContext.Provider value={{ user, isLoading, isMedico, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

