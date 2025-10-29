import type { speciality } from './speciality.model';

export interface PersonalData {
  full_name: string;
  license_number: string;
  speciality: speciality;
  years_experience: string;
  phone: string;
  email: string;
}

export interface AcademicFormation {
  id: string;
  title: string;
  institution: string;
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

export const doctors = [
  { id: 'ana-gonzalez', name: 'Dra. Ana González', specialityId: 'cardio' },
  { id: 'paula-torres', name: 'Dra. Paula Torres', specialityId: 'derma' },
  { id: 'carlos-ruiz', name: 'Dr. Carlos Ruiz', specialityId: 'cardio' },
  { id: 'luis-mendoza', name: 'Dr. Luis Mendoza', specialityId: 'oftal' },
  { id: 'julius-hibbert', name: 'Dr. Julius Hibbert', specialityId: 'medicina-general' },
  { id: 'nick-rivera', name: 'Dr. Nick Riviera', specialityId: 'medicina-general' },
  { id: 'mariana-salinas', name: 'Dra. Mariana Salinas', specialityId: 'pediatria' },
];
