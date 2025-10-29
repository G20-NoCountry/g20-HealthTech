export interface Patient {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  condition: string; 
  phone: string;
  email: string;
  address: string;
  allergiesSummary: string; 
}

const patientsData: { [key: string]: Patient } = {
  "p001": {
    id: "p001",
    name: "Susana Ramirez",
    age: 55,
    bloodGroup: "O+",
    condition: "Hipertensión",
    phone: "1136992010",
    email: "susana_ram40@gmail.com",
    address: "Av. Libertad, Ciudad Evita, Bs As",
    allergiesSummary: "Penicilina y Polen",
  },
  "p002": { 
    id: "p002",
    name: "Carlos Gomez",
    age: 42,
    bloodGroup: "A-",
    condition: "Diabetes Tipo 2",
    phone: "1122334455",
    email: "carlos.gomez@email.com",
    address: "Calle Falsa 123, Springfield",
    allergiesSummary: "Ninguna conocida",
  },
};

export const getPatientById = (id: string): Patient | undefined => {
  return patientsData[id];
};