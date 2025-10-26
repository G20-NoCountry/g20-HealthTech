import type { Specialty } from './specialty.model';

export interface PersonalData {
  full_name: string;
  license_number: string;
  specialty: Specialty;
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
  { id: 'ana-gonzalez', name: 'Dra. Ana González', specialtyId: 'cardio' },
  { id: 'paula-torres', name: 'Dra. Paula Torres', specialtyId: 'derma' },
  { id: 'carlos-ruiz', name: 'Dr. Carlos Ruiz', specialtyId: 'cardio' },
  { id: 'luis-mendoza', name: 'Dr. Luis Mendoza', specialtyId: 'oftal' },
  { id: 'julius-hibbert', name: 'Dr. Julius Hibbert', specialtyId: 'medicina-general' },
  { id: 'nick-rivera', name: 'Dr. Nick Riviera', specialtyId: 'medicina-general' },
  { id: 'mariana-salinas', name: 'Dra. Mariana Salinas', specialtyId: 'pediatria' },
];
