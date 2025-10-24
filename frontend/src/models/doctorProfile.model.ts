// doctorProfile.model.ts

export interface PersonalData {
  full_name: string;
  license_number: string;
  specialty: string;
  years_experience: number;
  phone: string;
  email: string;
}

export interface AcademicFormation {
  id: string;
  title: string; // Ej: "Especialización en Cardiología"
  institution: string; // Ej: "Universidad de Buenos Aires"
  year_completed?: number;
}

export interface AboutMe {
  description: string; // máx 255 caracteres
  areas_of_expertise: string[]; // 3 o 4 especializaciones
}

export interface DoctorProfile {
  id: string;
  personal_data: PersonalData;
  academic_background: AcademicFormation[];
  about_me: AboutMe;
  created_at: string;
  updated_at: string;
}
