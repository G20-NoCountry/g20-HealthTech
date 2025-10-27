export interface MedicalRecord {
  id?: number;
  patient_id: number;
  medic_id: number;
  record_type: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}
