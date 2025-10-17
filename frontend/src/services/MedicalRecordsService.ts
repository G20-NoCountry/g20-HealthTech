export interface MedicalRecord {
  id: number;
  fecha: string;
  medico: string;
  especialidad: string;
  diagnostico: string;
  nota: string;
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 1,
    fecha: '2025-10-01',
    medico: 'Dra. Ana González',
    especialidad: 'oftamologia',
    diagnostico: 'Conjuntivitis bacteriana',
    nota: 'Aplicar gotas antibióticas cada 8 horas por 7 días.',
  },
  {
    id: 2,
    fecha: '2025-09-12',
    medico: 'Dr. Carlos Ruiz',
    especialidad: 'medicina general',
    diagnostico: 'Gripe estacional',
    nota: 'Reposo por 3 días. Tomar paracetamol si hay fiebre.',
  },
  {
    id: 3,
    fecha: '2025-08-20',
    medico: 'Dra. Ana González',
    especialidad: 'oftamologia',
    diagnostico: 'Miopía moderada',
    nota: 'Requiere lentes con graduación -2.0 en ambos ojos.',
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
