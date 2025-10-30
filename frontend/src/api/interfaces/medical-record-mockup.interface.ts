export interface MedicalRecordMockup {
  critical_records: {
    allergies: string[];
    intolerances: string[];
  };
  personal_records: {
    surgeries: string[];
    chronicle: string[];
    medication: string[];
    habits: string[];
  };
  familiar_records: {
    mother: string[];
    father: string[];
    sister: string[];
  };
  lifestyle_records: {
    exercise: string[];
    sleep: string[];
    stress_level: string[];
  };
}
