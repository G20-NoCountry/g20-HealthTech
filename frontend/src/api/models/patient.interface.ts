export interface Patient {
  id?: number;
  health_insurance: HealthInsurance;
  location: string;
  blood_type?: BloodType;
  alergias?: string;
  cronicas_condition?: string;
  actual_medication?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type HealthInsurance =
  | 'OSECAC'
  | 'OSPRERA'
  | 'UPCN'
  | 'OBSBA'
  | 'OSDEPYM'
  | 'OSUTHGRA'
  | 'OSPE'
  | 'OSPECON'
  | 'OSIAD'
  | 'OSSEG';

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
