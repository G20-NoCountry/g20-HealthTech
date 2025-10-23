import { useEffect, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { DoctorProfileService } from '../../services/DoctorProfileService';
import type { DoctorProfile } from '../../models/doctorProfile.model';
import { PersonalDataSection } from './PersonalDataSection';
import { AcademicBackgroundSection } from './AcademicBackgroundSection';
import { AboutMeSection } from './AboutMeSection';

export function DoctorProfileView({ doctorId }: { doctorId: string }) {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DoctorProfileService.getById(doctorId).then((data) => {
      setDoctor(data || null);
      setLoading(false);
    });
  }, [doctorId]);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton width="80%" height="2rem" />
        <Skeleton width="100%" height="10rem" />
        <Skeleton width="100%" height="8rem" />
      </div>
    );
  }

  if (!doctor) {
    return <p className="text-center text-gray-500">Perfil no encontrado.</p>;
  }

  return (
    <>
      <PersonalDataSection data={doctor.personal_data} />

      <AcademicBackgroundSection background={doctor.academic_background} />

      <AboutMeSection about={doctor.about_me} />
    </>
  );
}
