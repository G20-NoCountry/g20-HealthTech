export interface Specialty {
  id: string;
  name: string;
}

export const specialties: Specialty[] = [
  { id: 'medicina-general', name: 'Medicina General' },
  { id: 'cardio', name: 'Cardiología' },
  { id: 'derma', name: 'Dermatología' },
  { id: 'oftal', name: 'Oftalmología' },
  { id: 'pediatria', name: 'Pediatría' },
];
