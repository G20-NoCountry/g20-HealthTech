import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

export default function MedicalRecords() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const doctor = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  const months = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  return (
    <>
      <div className="mt-5 flex w-full flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="doctorFilter">Filtrar por médico</label>
          <Dropdown
            inputId="doctorFilter"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.value)}
            options={doctor}
            optionLabel="name"
            editable
            placeholder="TODOS LOS MÉDICOS"
            className="w-full md:w-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="monthFilter">Filtrar por mes</label>
          <Dropdown
            inputId="monthFilter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.value)}
            options={months}
            optionLabel="name"
            placeholder="Todos los meses"
            className="w-full md:w-md"
          />
        </div>
      </div>
    </>
  );
}
