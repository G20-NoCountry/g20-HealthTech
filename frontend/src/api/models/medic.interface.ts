export interface Medic {
  id?: number;
  speciality: string;
  licence_num: number;
  schedule_from?: Date;
  schedule_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
