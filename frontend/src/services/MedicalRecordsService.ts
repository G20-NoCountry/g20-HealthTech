export interface MedicalRecord {
  id: number;
  fecha: string;
  medico: { id: string; name: string };
  especialidad: string;
  diagnostico: { titulo: string; descripcion: string; tratamiento: string };
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 1,
    fecha: '2025-10-01',
    medico: { id: 'ana-gonzalez', name: 'Dra. Ana González' },
    especialidad: 'oftamologia',
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
    especialidad: 'medicina general',
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
    especialidad: 'oftamologia',
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
    especialidad: 'dermatología',
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
    especialidad: 'pediatría',
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
    especialidad: 'cardiología',
    diagnostico: {
      titulo: 'Hipertensión arterial',
      descripcion: 'Presión arterial elevada de forma crónica.',
      tratamiento: 'Iniciar tratamiento con enalapril y dieta baja en sodio.',
    },
  },
];

export const MedicalRecordsService = {
  getMedicalRecords(): Promise<MedicalRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMedicalRecords);
      }, 500);
    });
  },
};
