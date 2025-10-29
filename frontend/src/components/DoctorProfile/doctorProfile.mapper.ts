import type { MedicUser } from '../../api/models/user.interface';
import type { Specialty } from '../../api/models/medic.interface';
import type { DoctorProfileFormData } from './doctorProfile.schema';

export function doctorToFormData(doctor: MedicUser): DoctorProfileFormData {
  return {
    personal_data: {
      full_name: `${doctor.first_name} ${doctor.last_name}`,
      license_num: doctor.license_num ?? 0,
      speciality: String(doctor.speciality ?? ''),
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
      description: doctor.about_me.description ?? '',
      areas_of_expertise: doctor.about_me.areas_of_expertise ?? [],
    },
  };
}

export function formDataToDoctor(
  formData: DoctorProfileFormData,
  baseDoctor: MedicUser,
  specialties: Specialty[],
): MedicUser {
  const specialityId =
    specialties.find((s) => String(s.id) === formData.personal_data.speciality)?.id ??
    baseDoctor.speciality;

  return {
    ...baseDoctor,
    first_name: formData.personal_data.full_name.split(' ')[0] ?? baseDoctor.first_name,
    last_name:
      formData.personal_data.full_name.split(' ').slice(1).join(' ') ?? baseDoctor.last_name,
    license_num: formData.personal_data.license_num,
    speciality: specialityId,
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
