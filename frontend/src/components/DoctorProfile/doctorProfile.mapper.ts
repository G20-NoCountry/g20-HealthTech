import type { DoctorProfile } from '../../models/doctorProfile.model';
import type { DoctorProfileFormData } from './doctorProfile.schema';
import type { speciality } from '../../models/speciality.model';

/**
 * Convierte un DoctorProfile del backend al formato del formulario (DoctorProfileFormData)
 */
export function doctorToFormData(doctor: DoctorProfile): DoctorProfileFormData {
  return {
    personal_data: {
      full_name: doctor.personal_data.full_name,
      license_number: doctor.personal_data.license_number,
      speciality: doctor.personal_data.speciality.id, // 👈 string
      years_experience: doctor.personal_data.years_experience,
      phone: doctor.personal_data.phone,
      email: doctor.personal_data.email,
    },
    academic_background: doctor.academic_background.map((a) => ({
      id: a.id,
      title: a.title,
      institution: a.institution,
    })),
    about_me: {
      description: doctor.about_me.description,
      areas_of_expertise: [...doctor.about_me.areas_of_expertise],
    },
  };
}

/**
 * Convierte los datos del formulario al formato del modelo DoctorProfile (para guardar o enviar al backend)
 */
export function formDataToDoctor(
  formData: DoctorProfileFormData,
  baseDoctor: DoctorProfile,
  specialties: speciality[],
): DoctorProfile {
  const specialityObj =
    specialties.find((s) => s.id === formData.personal_data.speciality) ??
    baseDoctor.personal_data.speciality;

  return {
    ...baseDoctor,
    personal_data: {
      ...formData.personal_data,
      speciality: specialityObj,
    },
    academic_background: formData.academic_background.map((item, index) => ({
      id: baseDoctor.academic_background[index]?.id ?? crypto.randomUUID(),
      ...item,
    })),
    about_me: {
      ...formData.about_me,
    },
    updated_at: new Date().toISOString(),
  };
}
