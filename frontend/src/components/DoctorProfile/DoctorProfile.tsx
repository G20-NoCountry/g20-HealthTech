import { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { PersonalDataSection } from './PersonalDataSection';
import { AcademicBackgroundSection } from './AcademicBackgroundSection';
import { AboutMeSection } from './AboutMeSection';
import { Dialog } from 'primereact/dialog';
import { DoctorProfileForm } from './DoctorProfileForm';
import { Toast } from 'primereact/toast';
import { api } from '../../api';
import type { MedicUser } from '../../api/models/user.interface';
import { specialties } from '../../api/models/medic.interface';
import { enrichMedicWithMockData } from '../../services/enrichMedicWithMockData';

export function DoctorProfileView({ doctorId }: { doctorId: string }) {
  const [doctor, setDoctor] = useState<MedicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.users.getMedicById(Number(doctorId));
        if (response.success) {
          const enriched = enrichMedicWithMockData(response.data);
          setDoctor(enriched);
        } else {
          setDoctor(null);
        }
      } catch (error) {
        console.error('Error cargando el perfil del doctor:', error);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
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

  const personalData = {
    first_name: doctor.first_name ?? '',
    last_name: doctor.last_name ?? '',
    license_num: String(doctor.license_num ?? ''),
    speciality: specialties.find((s) => s.id === doctor.speciality) ?? {
      id: 'na',
      name: 'Sin especialidad',
    },
    phone: doctor.phone ?? '—',
    email: doctor.email ?? '',
  };

  const doctorAboutMe = doctor?.about_me ?? {
    description: 'No disponible',
    areas_of_expertise: [],
  };

  return (
    <>
      <Toast ref={toast} />

      <PersonalDataSection data={personalData} onEdit={() => setEditVisible(true)} />

      <AcademicBackgroundSection background={doctor.academic_background} />

      <AboutMeSection about={doctorAboutMe} />

      <Dialog
        header="Editar Perfil"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        style={{ width: '60vw' }}
        breakpoints={{ '960px': '75vw', '641px': '95vw' }}>
        <DoctorProfileForm
          doctor={doctor}
          onSave={async (updatedDoctor: MedicUser) => {
            try {
              // Preparar los datos para enviar solo los datos personales
              const personalDataToUpdate = {
                first_name: updatedDoctor.first_name,
                last_name: updatedDoctor.last_name,
                license_num: updatedDoctor.license_num,
                speciality: updatedDoctor.speciality,
                phone: updatedDoctor.phone,
                email: updatedDoctor.email,
              };

              const response = await api.users.updateMedicUser({
                ...personalDataToUpdate,
              });

              if (response.success) {
                setDoctor(updatedDoctor);
                setEditVisible(false);

                toast.current?.show({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Perfil guardado correctamente',
                  life: 3000,
                  className: 'normal-case',
                });
              } else {
                toast.current?.show({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'No se pudo guardar el perfil. Intenta nuevamente.',
                  life: 3000,
                  className: 'normal-case',
                });
              }
            } catch (error) {
              console.error('Error al actualizar el perfil del doctor:', error);
              toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema con la actualización. Intenta nuevamente.',
                life: 3000,
                className: 'normal-case',
              });
            }
          }}
          onCancel={() => setEditVisible(false)}
        />
      </Dialog>
    </>
  );
}
