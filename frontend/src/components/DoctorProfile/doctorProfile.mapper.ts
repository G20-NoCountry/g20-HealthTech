import type { MedicUser } from '../../api/models/user.interface';
import type { DoctorProfileFormData } from './doctorProfile.schema';
import type { speciality } from '../../models/specialty.model';

export function doctorToFormData(doctor: MedicUser): DoctorProfileFormData {
  return {
    personal_data: {
      full_name: `${doctor.first_name} ${doctor.last_name}`,
      license_number: doctor.licence_num ?? '',
      speciality: String(doctor.speciality?.id ?? ''),
      years_experience: String(doctor.years_experience ?? '0'),
      phone: doctor.phone ?? '',
      email: doctor.email ?? '',
    },
    academic_background:
      doctor.academic_background?.map((a) => ({
        id: String(a.id ?? crypto.randomUUID()),
        title: a.title,
        institution: a.institution,
      })) ?? [],
    about_me: {
      description: doctor.about_me ?? '',
      areas_of_expertise: doctor.areas_of_expertise ?? [],
    },
  };
}

export function formDataToDoctor(
  formData: DoctorProfileFormData,
  baseDoctor: MedicUser,
  specialties: speciality[],
): MedicUser {
  const specialityObj =
    specialties.find((s) => String(s.id) === formData.personal_data.speciality) ??
    baseDoctor.speciality;

  return {
    ...baseDoctor,
    first_name: formData.personal_data.full_name.split(' ')[0] ?? baseDoctor.first_name,
    last_name:
      formData.personal_data.full_name.split(' ').slice(1).join(' ') ?? baseDoctor.last_name,
    license_number: formData.personal_data.license_number,
    speciality: specialityObj,
    years_experience: Number(formData.personal_data.years_experience),
    phone: formData.personal_data.phone,
    email: formData.personal_data.email,
    academic_background: formData.academic_background.map((a) => ({
      id: a.id ? Number(a.id) : undefined,
      title: a.title,
      institution: a.institution,
    })),
    about_me: formData.about_me.description,
    areas_of_expertise: formData.about_me.areas_of_expertise,
    updated_at: new Date().toISOString(),
  };
}
