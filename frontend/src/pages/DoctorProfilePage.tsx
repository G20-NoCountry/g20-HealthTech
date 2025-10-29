import { useParams, Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { DoctorProfileView } from '../components/DoctorProfile/DoctorProfile';

export default function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  if (!user || user.rol !== 'medico') {
    return <Navigate to="/login" replace />;
  }

  // Si el ID no coincide con el del usuario logueado → redirige
  if (String(user.id) !== id) {
    return <Navigate to={`/doctor-profile/${user.id}`} replace />;
  }

  return (
    <section className="flex w-full flex-col items-center gap-2 p-3 md:p-10">
      <div className="flex w-full max-w-7xl flex-col space-y-6 rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
        <DoctorProfileView doctorId={id!} />
      </div>
    </section>
  );
}
