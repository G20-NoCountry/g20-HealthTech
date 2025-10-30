import type { MedicUser } from '../../api/models/user.interface';
// import type { Specialty } from '../../api/models/medic.interface';
import type { DoctorProfileFormData } from './doctorProfile.schema';

export function doctorToFormData(doctor: MedicUser): DoctorProfileFormData {
  return {
    personal_data: {
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      license_num: String(doctor.license_num ?? ''),
      // speciality: String(doctor.speciality ?? ''),
      phone: doctor.phone ?? '',
      email: doctor.email ?? '',
    },
    academic_background:
      Array.isArray(doctor.academic_background) && doctor.academic_background.length > 0
        ? doctor.academic_background.map(({ id, title, institution }) => ({
            id: String(id ?? crypto.randomUUID()), // Asegura que el ID siempre sea válido
            title: title ?? 'Título no disponible', // Agregar valor por defecto si es undefined
            institution: institution ?? 'Institución no disponible', // Agregar valor por defecto si es undefined
          }))
        : [], // Asegura que si no es un array o es vacío, se use un array vacío
    about_me: {
      description: doctor.about_me?.description ?? 'Descripción no disponible', // Valor predeterminado si no existe
      areas_of_expertise: doctor.about_me?.areas_of_expertise ?? [],
    },
  };
}

export function formDataToDoctor(
  formData: DoctorProfileFormData,
  baseDoctor: MedicUser,
  // specialties: Specialty[],
): MedicUser {
  // const specialityId =
  //   specialties.find((s) => String(s.id) === formData.personal_data.speciality)?.id ??
  //   baseDoctor.speciality;
  const licenseNum = parseInt(formData.personal_data.license_num, 10);

  return {
    ...baseDoctor,
    first_name: formData.personal_data.first_name,
    last_name: formData.personal_data.last_name,
    license_num: isNaN(licenseNum) ? baseDoctor.license_num : licenseNum,
    // speciality: specialityId,
    phone: formData.personal_data.phone,
    email: formData.personal_data.email,
    academic_background: formData.academic_background.map((a) => ({
      id: String(a.id ?? crypto.randomUUID()),
      title: a.title,
      institution: a.institution,
    })),
    about_me: formData.about_me,
  };
}
