import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface RoleRouteProps {
  allowedRoles: ('medico' | 'paciente')[];
  redirectTo?: string;
}

export const RoleRoute = ({ allowedRoles, redirectTo = '/' }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-dvh items-center justify-center text-gray-600">Cargando...</div>;
  }

  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
