import type { Specialty } from './specialty.model';

export interface ClinicalRecord {
  id: number;
  fecha: string; // Esto puede mantenerse como string si solo se muestra la fecha
  medico: { id: string; name: string };
  especialidad: Specialty;
  diagnostico: {
    titulo: string;
    descripcion: string;
    tratamiento: string;
  };
}
