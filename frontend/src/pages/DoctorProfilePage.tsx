import { useParams } from 'react-router';
import { DoctorProfileView } from '../components/DoctorProfile/DoctorProfile';

export default function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex w-full flex-col items-center gap-2 p-3 md:p-10">
      <div className="flex w-full max-w-7xl flex-col space-y-6 rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
        {id ? <DoctorProfileView doctorId={id} /> : <p>ID de doctor no especificado.</p>}
      </div>
    </section>
  );
}
