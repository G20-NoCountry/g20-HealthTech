import type { speciality } from './specialty.model';

export interface ClinicalRecord {
  id: number;
  fecha: string; // Esto puede mantenerse como string si solo se muestra la fecha
  medico: { id: string; name: string };
  especialidad: speciality;
  diagnostico: {
    titulo: string;
    descripcion: string;
    tratamiento: string;
  };
}
