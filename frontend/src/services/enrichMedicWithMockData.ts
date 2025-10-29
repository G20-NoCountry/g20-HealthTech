import type { MedicUser } from '../api/models/user.interface';
import { mockDoctorProfiles } from '../services/DoctorProfileService';

/**
 * Fusiona los datos reales de un médico con información de mock,
 * para que el perfil tenga secciones como academic_background y about_me
 * mientras el backend no las provee.
 */
export function enrichMedicWithMockData(medic: MedicUser): MedicUser {
  // Buscar un perfil mock que coincida por especialidad o nombre
  const mock = mockDoctorProfiles.find(
    (m) =>
      m.personal_data.speciality.id === medic.speciality ||
      m.personal_data.full_name
        .toLowerCase()
        .includes(`${medic.first_name} ${medic.last_name}`.toLowerCase()),
  );

  return {
    ...medic,
    id: Number(medic.id) || medic.id,
    academic_background:
      mock?.academic_background?.map((a) => ({
        id: a.id,
        title: a.title,
        institution: a.institution,
        year_completed: a.year_completed ?? undefined,
      })) ?? [],
    about_me: mock?.about_me ?? {
      description: 'Este médico aún no ha completado su perfil.',
      areas_of_expertise: [],
    },
  };
}
