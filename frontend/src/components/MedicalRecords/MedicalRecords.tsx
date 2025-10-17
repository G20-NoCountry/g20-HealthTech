import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import {
  DataTable,
  type DataTableExpandedRows,
  type DataTableValueArray,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MedicalRecordsService, type MedicalRecord } from '../../services/MedicalRecordsService';
import { Button } from 'primereact/button';

export default function MedicalRecords() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

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

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  useEffect(() => {
    MedicalRecordsService.getMedicalRecords().then((data) => setMedicalRecords(data));
  }, []);

  const allowExpansion = () => {
    return medicalRecords!.length > 0;
  };

  const rowExpansionTemplate = (data: MedicalRecord) => {
    return (
      <div className="flex flex-col gap-2">
        <div>{data.diagnostico}</div>
        <div>{data.nota}</div>
      </div>
    );
  };

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

      <div className="mt-5">
        <DataTable
          value={medicalRecords}
          paginator
          rows={5}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          paginatorLeft={paginatorLeft}
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorRight={paginatorRight}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}>
          <Column
            field="fecha"
            header="Fecha"
            style={{ width: '23%', backgroundColor: 'transparent', color: '#000' }}></Column>
          <Column
            field="medico"
            header="Médico"
            style={{ width: '23%', backgroundColor: 'transparent', color: '#000' }}></Column>
          <Column
            field="especialidad"
            header="Especialidad"
            style={{ width: '23%', backgroundColor: 'transparent', color: '#000' }}></Column>
          <Column
            field="diagnostico"
            header="Diagnóstico"
            style={{ width: '23%', backgroundColor: 'transparent', color: '#000' }}></Column>
          <Column
            expander={allowExpansion}
            style={{ width: '8', backgroundColor: 'transparent', color: '#000' }}></Column>
        </DataTable>
      </div>
    </>
  );
}
