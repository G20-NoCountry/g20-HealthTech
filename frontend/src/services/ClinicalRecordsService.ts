import type { ClinicalRecord } from '../models/clinicalRecords';

const mockClinicalRecords: ClinicalRecord[] = [
  {
    id: 1,
    fecha: '2025-10-01',
    medico: { id: 'ana-gonzalez', name: 'Dra. Ana González' },
    especialidad: { id: 'oftalmologia', name: 'Oftalmología' },
    diagnostico: {
      titulo: 'Conjuntivitis bacteriana',
      descripcion: 'Infección ocular común causada por bacterias.',
      tratamiento: 'Aplicar gotas antibióticas cada 8 horas por 7 días.',
    },
  },
  {
    id: 2,
    fecha: '2025-09-12',
    medico: { id: 'carlos-ruiz', name: 'Dr. Carlos Ruiz' },
    especialidad: { id: 'medicina-general', name: 'Medicina General' },
    diagnostico: {
      titulo: 'Gripe estacional',
      descripcion: 'Infección viral leve a moderada con síntomas comunes.',
      tratamiento: 'Reposo por 3 días. Tomar paracetamol si hay fiebre.',
    },
  },
  {
    id: 3,
    fecha: '2025-08-20',
    medico: { id: 'ana-gonzalez', name: 'Dra. Ana González' },
    especialidad: { id: 'oftalmologia', name: 'Oftalmología' },
    diagnostico: {
      titulo: 'Miopía moderada',
      descripcion: 'Dificultad para ver objetos lejanos.',
      tratamiento: 'Requiere lentes con graduación -2.0 en ambos ojos.',
    },
  },
  {
    id: 4,
    fecha: '2025-07-15',
    medico: { id: 'luis-mendoza', name: 'Dr. Luis Mendoza' },
    especialidad: { id: 'dermatologia', name: 'Dermatología' },
    diagnostico: {
      titulo: 'Dermatitis atópica',
      descripcion: 'Inflamación crónica de la piel con picazón.',
      tratamiento: 'Aplicar crema con corticoides dos veces al día durante 10 días.',
    },
  },
  {
    id: 5,
    fecha: '2025-06-30',
    medico: { id: 'paula-torres', name: 'Dra. Paula Torres' },
    especialidad: { id: 'pediatria', name: 'Pediatría' },
    diagnostico: {
      titulo: 'Otitis media',
      descripcion: 'Infección del oído medio, común en niños.',
      tratamiento: 'Administrar antibióticos orales por 5 días y control en una semana.',
    },
  },
  {
    id: 6,
    fecha: '2025-05-22',
    medico: { id: 'julius-hibbert', name: 'Dr. Julius Hibbert' },
    especialidad: { id: 'cardiologia', name: 'Cardiología' },
    diagnostico: {
      titulo: 'Hipertensión arterial',
      descripcion: 'Presión arterial elevada de forma crónica.',
      tratamiento: 'Iniciar tratamiento con enalapril y dieta baja en sodio.',
    },
  },
  {
    id: 7,
    fecha: '2025-10-15',
    medico: { id: 'mariana-salinas', name: 'Dra. Mariana Salinas' },
    especialidad: { id: 'oftalmologia', name: 'Oftalmología' },
    diagnostico: {
      titulo: 'Astigmatismo',
      descripcion: 'Defecto en la curvatura del ojo que causa visión borrosa.',
      tratamiento: 'Uso de lentes correctivos cilíndricos.',
    },
  },
];

export const ClinicalRecordsService = {
  getClinicalRecords(): Promise<ClinicalRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClinicalRecords);
      }, 500);
    });
  },
};
