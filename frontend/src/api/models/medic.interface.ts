export interface Medic {
  id?: number;
  specialty: Specialty['id'];
  licence_num: number;
  schedule_from?: Date;
  schedule_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface Specialty {
  id: string;
  name: string;
}

export const specialties: Specialty[] = [
  { id: 'oftalmologia', name: 'Oftalmología' },
  { id: 'cardiologia', name: 'Cardiología' },
  { id: 'neurologia', name: 'Neurología' },
  { id: 'dermatologia', name: 'Dermatología' },
  { id: 'pediatria', name: 'Pediatría' },
  { id: 'ginecologia', name: 'Ginecología' },
  { id: 'traumatologia', name: 'Traumatología' },
  { id: 'psiquiatria', name: 'Psiquiatría' },
  { id: 'medicina_general', name: 'Medicina General' },
];
