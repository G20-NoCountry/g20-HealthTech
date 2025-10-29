import type { DoctorProfile } from '../models/doctorProfile.model';

export const mockDoctorProfiles: DoctorProfile[] = [
  {
    id: '019a10d8-6e54-787d-a40a-7a5810eaca51',
    personal_data: {
      full_name: 'Dra. Ana González',
      license_number: 'MP-25478',
      speciality: { id: 'cardio', name: 'Cardiología' },
      years_experience: '12',
      phone: '+54 9 11 5555-1234',
      email: 'ana.gonzalez@clinicavida.com',
    },
    academic_background: [
      {
        id: '1',
        title: 'Médica Cirujana',
        institution: 'Universidad de Buenos Aires',
        year_completed: 2010,
      },
      {
        id: '2',
        title: 'Especialización en Cardiología',
        institution: 'Hospital Italiano de Buenos Aires',
        year_completed: 2014,
      },
      {
        id: '3',
        title: 'Diplomatura en Prevención Cardiovascular',
        institution: 'Universidad Austral',
        year_completed: 2018,
      },
    ],
    about_me: {
      description:
        'Soy médico especialista en Medicina Interna con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades complejas del adulto. Mi enfoque está centrado en proporcionar atención médica en el área de cardiología y personalizada a cada paciente.',
      areas_of_expertise: [
        'Hipertensión arterial',
        'Rehabilitación cardíaca',
        'Cardiología preventiva',
      ],
    },
    created_at: '2025-01-12T09:00:00',
    updated_at: '2025-09-28T11:30:00',
  },
  {
    id: 'paula-torres',
    personal_data: {
      full_name: 'Dra. Paula Torres',
      license_number: 'MP-30122',
      speciality: { id: 'derma', name: 'Dermatología' },
      years_experience: '8',
      phone: '+54 9 11 6000-9876',
      email: 'paula.torres@clinicavida.com',
    },
    academic_background: [
      {
        id: '1',
        title: 'Médica',
        institution: 'Universidad Nacional de Córdoba',
        year_completed: 2012,
      },
      {
        id: '2',
        title: 'Residencia en Dermatología',
        institution: 'Hospital Fernández',
        year_completed: 2016,
      },
      {
        id: '3',
        title: 'Diplomatura en Dermatología Estética',
        institution: 'UBA',
        year_completed: 2019,
      },
    ],
    about_me: {
      description:
        'Dermatóloga enfocada en tratamientos estéticos y clínicos personalizados, priorizando siempre la salud y bienestar de la piel.',
      areas_of_expertise: [
        'Dermatología estética',
        'Tratamiento del acné',
        'Melasma y manchas',
        'Dermatología láser',
      ],
    },
    created_at: '2025-02-10T10:00:00',
    updated_at: '2025-10-01T09:30:00',
  },
];

export const DoctorProfileService = {
  getAll(): Promise<DoctorProfile[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDoctorProfiles);
      }, 500);
    });
  },

  getById(id: string): Promise<DoctorProfile | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDoctorProfiles.find((doc) => doc.id === id));
      }, 500);
    });
  },
};
