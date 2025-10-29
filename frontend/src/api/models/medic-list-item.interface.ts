import type { Specialty } from './medic.interface';

export interface MedicListItem {
  medic_id: string;
  speciality: Specialty['id'];
  first_name: string;
  last_name: string;
}
