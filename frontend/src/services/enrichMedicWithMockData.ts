import type { MedicUser } from '../api/models/user.interface';
import { mockDoctorProfiles } from '../services/DoctorProfileService';

/**
 * Fusiona los datos reales del médico con solo la información mockeada
 * de academic_background y about_me.
 */
export function enrichMedicWithMockData(medic: MedicUser): MedicUser {
  const mock = mockDoctorProfiles.find(
    (m) =>
      m.personal_data.full_name
        .toLowerCase()
        .includes(`${medic.first_name} ${medic.last_name}`.toLowerCase()) ||
      m.personal_data.speciality.id === medic.speciality,
  );

  return {
    ...medic,
    academic_background: mock?.academic_background ?? [
      {
        id: 'default',
        title: 'Especialización en Cardiología',
        institution: 'Hospital Italiano de Buenos Aires',
      },
    ],
    about_me: mock?.about_me ?? {
      description:
        'Soy médico especialista en Medicina Interna con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades complejas del adulto. Mi enfoque está centrado en proporcionar atención médica en el área de cardiología y personalizada a cada paciente.',
      areas_of_expertise: [
        'Hipertensión arterial',
        'Rehabilitación cardíaca',
        'Cardiología preventiva',
      ],
    },
  };
}
