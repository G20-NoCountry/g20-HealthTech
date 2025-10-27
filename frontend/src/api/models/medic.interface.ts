export interface Medic {
  id?: number;
  specialty: string;
  licence_num: number;
  schedule_from?: Date;
  schedule_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
