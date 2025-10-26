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
import { ClinicalRecordsService } from '../../services/ClinicalRecordsService';
import type { ClinicalRecord } from '../../models/clinicalRecords';
import { specialties } from '../../models/specialty.model';
import { doctors } from '../../models/doctorProfile.model';

export default function ClinicalRecords() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<any>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);
  const [clinicalRecords, setClinicalRecords] = useState<ClinicalRecord[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    'medico.id': { value: null, matchMode: FilterMatchMode.EQUALS },
    'especialidad.id': { value: null, matchMode: FilterMatchMode.EQUALS },
    fecha: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

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
    ClinicalRecordsService.getClinicalRecords().then((data) => setClinicalRecords(data));
  }, []);

  // Aplicar filtros al seleccionar médico
  const onDoctorChange = (e: DropdownChangeEvent) => {
    setSelectedDoctor(e.value);
    setFilters((prev) => ({
      ...prev,
      'medico.id': {
        value: e.value?.id ?? null,
        matchMode: FilterMatchMode.EQUALS,
      },
    }));
  };

  // Aplicar filtros al seleccionar mes
  const onMonthChange = (e: DropdownChangeEvent) => {
    setSelectedMonth(e.value);
    setFilters((prev) => ({
      ...prev,
      fecha: {
        value: e.value?.code ?? null,
        matchMode: FilterMatchMode.CONTAINS,
      },
    }));
  };

  // Aplicar filtros al seleccionar especialidad
  const onSpecialtyChange = (e: DropdownChangeEvent) => {
    setSelectedSpecialty(e.value);
    setFilters((prev) => ({
      ...prev,
      'especialidad.id': {
        value: e.value?.id ?? null,
        matchMode: FilterMatchMode.EQUALS,
      },
    }));
  };

  const allowExpansion = () => clinicalRecords.length > 0;

  const rowExpansionTemplate = (data: ClinicalRecord) => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-accent font-semibold">{data.diagnostico.titulo}</p>
        <div className="border-success rounded-4xl border bg-white px-5 py-3 text-sm">
          <p>{data.diagnostico.descripcion}</p>
          <p className="mt-2 text-gray-600">
            <strong>Tratamiento:</strong> {data.diagnostico.tratamiento}
          </p>
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
            options={doctors}
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
        <div className="flex w-full flex-col gap-2 sm:max-w-md">
          <label htmlFor="specialtyFilter">Filtrar por especialidad</label>
          <Dropdown
            inputId="specialtyFilter"
            value={selectedSpecialty}
            onChange={onSpecialtyChange}
            options={specialties}
            optionLabel="name"
            placeholder="Todas las especialidades"
            className="w-full md:w-md"
            showClear
          />
        </div>
      </div>
      {/* Tabla */}
      <div className="mt-5">
        <DataTable
          value={clinicalRecords}
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
          tableStyle={{ minWidth: '60rem' }}
          emptyMessage="No se encontraron registros médicos"
          className="max-w-7xl">
          <Column field="fecha" header="Fecha" style={{ width: '20%' }} />
          <Column field="medico.name" header="Médico" style={{ width: '20%' }} />
          <Column field="especialidad.name" header="Especialidad" style={{ width: '23%' }} />
          <Column field="diagnostico.titulo" header="Diagnóstico" style={{ width: '23%' }} />
          <Column expander={allowExpansion} style={{ width: '5%' }} />
        </DataTable>
      </div>
    </>
  );
}
