export interface ClinicalRecord {
  id: number;
  fecha: string;
  medico: { id: string; name: string };
  especialidad: { id: string; name: string };
  diagnostico: { titulo: string; descripcion: string; tratamiento: string };
}
