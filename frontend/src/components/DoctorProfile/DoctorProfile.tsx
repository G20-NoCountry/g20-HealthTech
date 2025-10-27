import { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { DoctorProfileService } from '../../services/DoctorProfileService';
import type { DoctorProfile } from '../../models/doctorProfile.model';
import { PersonalDataSection } from './PersonalDataSection';
import { AcademicBackgroundSection } from './AcademicBackgroundSection';
import { AboutMeSection } from './AboutMeSection';
import { Dialog } from 'primereact/dialog';
import { DoctorProfileForm } from './DoctorProfileForm';
import { Toast } from 'primereact/toast';

export function DoctorProfileView({ doctorId }: { doctorId: string }) {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

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
      <Toast ref={toast} />

      <PersonalDataSection data={doctor.personal_data} onEdit={() => setEditVisible(true)} />

      <AcademicBackgroundSection background={doctor.academic_background} />

      <AboutMeSection about={doctor.about_me} />

      {/* Modal de edición */}
      <Dialog
        header="Editar Perfil"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        style={{ width: '60vw' }}
        breakpoints={{ '960px': '75vw', '641px': '95vw' }}>
        <DoctorProfileForm
          doctor={doctor}
          onSave={(updatedDoctor: DoctorProfile) => {
            console.log('Datos enviados del formulario:', updatedDoctor);
            setDoctor(updatedDoctor);
            setEditVisible(false);
            toast.current?.show({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Perfil guardado correctamente',
              life: 3000,
            });
          }}
          onCancel={() => setEditVisible(false)}
        />
      </Dialog>
    </>
  );
}
