import { useState, useEffect } from 'react';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import {
  DataTable,
  type DataTableExpandedRows,
  type DataTableFilterMeta,
  type DataTableValueArray,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { MedicalRecordsService, type MedicalRecord } from '../../services/MedicalRecordsService';

export default function MedicalRecords() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    medico: { value: null, matchMode: FilterMatchMode.EQUALS },
    fecha: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const doctor = [
    { id: 'ana-gonzalez', name: 'Dra. Ana González' },
    { id: 'carlos-ruiz', name: 'Dr. Carlos Ruiz' },
    { id: 'luis-mendoza', name: 'Dr. Luis Mendoza' },
    { id: 'paula-torres', name: 'Dra. Paula Torres' },
    { id: 'julius-hibbert', name: 'Dr. Julius Hibbert' },
    { id: 'nick-rivera', name: 'Dr. Nick Riviera' },
  ];
  const months = [
    { name: 'Enero', code: '01' },
    { name: 'Febrero', code: '02' },
    { name: 'Marzo', code: '03' },
    { name: 'Abril', code: '04' },
    { name: 'Mayo', code: '05' },
    { name: 'Junio', code: '06' },
    { name: 'Julio', code: '07' },
    { name: 'Agosto', code: '08' },
    { name: 'Septiembre', code: '09' },
    { name: 'Octubre', code: '10' },
    { name: 'Noviembre', code: '11' },
    { name: 'Diciembre', code: '12' },
  ];

  useEffect(() => {
    MedicalRecordsService.getMedicalRecords().then((data) => setMedicalRecords(data));
  }, []);

  // Aplicar filtros al seleccionar médico
  const onDoctorChange = (e: DropdownChangeEvent) => {
    setSelectedDoctor(e.value);
    setFilters((prev) => ({
      ...prev,
      'medico.id': { value: e.value?.id || null, matchMode: FilterMatchMode.EQUALS },
    }));
  };

  // Aplicar filtros al seleccionar mes
  const onMonthChange = (e: DropdownChangeEvent) => {
    setSelectedMonth(e.value);
    setFilters((prev) => ({
      ...prev,
      fecha: {
        value: e.value?.code || null,
        matchMode: FilterMatchMode.CONTAINS, // porque la fecha es "2025-10-01"
      },
    }));
  };

  const allowExpansion = () => {
    return medicalRecords!.length > 0;
  };

  const rowExpansionTemplate = (data: MedicalRecord) => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-accent">{data.diagnostico.descripcion}</p>
        <div className="border-success rounded-4xl border bg-white px-5 py-3 text-xs">
          <p>{data.diagnostico.tratamiento}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Filtros */}
      <div className="mt-5 flex w-full flex-wrap gap-4">
        <div className="flex w-full flex-col gap-2 sm:max-w-md">
          <label htmlFor="doctorFilter">Filtrar por médico</label>
          <Dropdown
            inputId="doctorFilter"
            value={selectedDoctor}
            onChange={onDoctorChange}
            options={doctor}
            optionLabel="name"
            placeholder="Todos los médicos"
            className="w-full md:w-md"
            showClear
          />
        </div>
        <div className="flex w-full flex-col gap-2 sm:max-w-md">
          <label htmlFor="monthFilter">Filtrar por mes</label>
          <Dropdown
            inputId="monthFilter"
            value={selectedMonth}
            onChange={onMonthChange}
            options={months}
            optionLabel="name"
            placeholder="Todos los meses"
            className="w-full md:w-md"
            showClear
          />
        </div>
      </div>
      {/* Tabla */}
      <div className="mt-5">
        <DataTable
          value={medicalRecords}
          filters={filters}
          filterDisplay="menu"
          paginator
          rows={5}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} a {last} de {totalRecords}"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}
          emptyMessage="No se encontraron registros médicos"
          className="max-w-7xl">
          <Column
            field="fecha"
            header="Fecha"
            style={{ width: '20%' }}
            filterPlaceholder="Buscar por fecha"
          />
          <Column
            field="medico.name"
            header="Médico"
            style={{ width: '20%' }}
            filterPlaceholder="Buscar por médico"
          />
          <Column field="especialidad" header="Especialidad" style={{ width: '23%' }}></Column>
          <Column field="diagnostico.titulo" header="Diagnóstico" style={{ width: '23%' }}></Column>
          <Column expander={allowExpansion} style={{ width: '8' }}></Column>
        </DataTable>
      </div>
    </>
  );
}
