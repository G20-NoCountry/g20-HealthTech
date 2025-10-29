import { useState, useEffect } from 'react';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import {
  DataTable,
  type DataTableExpandedRows,
  type DataTableValueArray,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Appointment } from '../../api/models/appointment.interface';
import { api } from '../../api';
import type { MedicListItem } from '../../api/models/medic-list-item.interface';
import { specialties } from '../../api/models/medic.interface';

export default function ClinicalRecords() {
  const [selectedDoctor, setSelectedDoctor] = useState<MedicListItem | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<{ name: string; code: string } | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [records, setRecords] = useState<Appointment[]>([]);
  const [medics, setMedics] = useState<MedicListItem[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

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
    Promise.all([api.users.getMedicsSummary(), api.appointments.searchPatientAppointments()])
      .then(([medicsRes, recordsRes]) => {
        if (medicsRes.success) setMedics(medicsRes.data);

        if (recordsRes.success) {
          const now = new Date();
          const oldAppointments = recordsRes.data.filter(
            (r: Appointment) => new Date(r.end_at) < now,
          );
          setRecords(oldAppointments);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRecords = records.filter((r) => {
    let match = true;

    if (selectedDoctor?.medic_id && r.medic_id !== Number(selectedDoctor.medic_id)) match = false;

    if (selectedMonth?.code) {
      const month = new Date(r.start_at).toISOString().slice(5, 7);
      if (month !== selectedMonth.code) match = false;
    }

    if (selectedSpecialty?.id) {
      const medic = medics.find((m) => m.medic_id === String(r.medic_id));
      if (medic?.speciality !== selectedSpecialty.id) match = false;
    }

    return match;
  });

  const onDoctorChange = (e: DropdownChangeEvent) => setSelectedDoctor(e.value);
  const onMonthChange = (e: DropdownChangeEvent) => setSelectedMonth(e.value);
  const onSpecialtyChange = (e: DropdownChangeEvent) => setSelectedSpecialty(e.value);

  const rowExpansionTemplate = (data: Appointment) => (
    <div className="flex flex-col gap-2">
      <p className="text-accent font-semibold">{data.diagnostic || 'Sin diagnóstico registrado'}</p>
      <div className="border-success rounded-3xl border bg-white px-5 py-3 text-sm">
        <p>
          <strong>Síntomas:</strong> {data.symptoms || 'No especificados'}
        </p>
        {data.location && (
          <p className="mt-2 text-gray-600">
            <strong>Ubicación:</strong> {data.location}
          </p>
        )}
      </div>
    </div>
  );

  if (loading) return <p>Cargando historial clínico...</p>;

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
            options={medics}
            optionLabel="first_name"
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
          value={filteredRecords}
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
          <Column
            field="start_at"
            header="Fecha"
            body={(row) => new Date(row.start_at).toLocaleDateString()}
            style={{ width: '20%' }}
          />
          <Column
            field="medic.name"
            header="Médico"
            body={(row) => {
              const medic = medics.find((m) => m.medic_id === String(row.medic_id));
              return medic ? `${medic.first_name} ${medic.last_name}` : 'N/A';
            }}
            style={{ width: '20%' }}
          />
          <Column
            field="specialty"
            header="Especialidad"
            body={(row) => {
              const medic = medics.find((m) => Number(m.medic_id) === row.medic_id);
              const spec = specialties.find((s) => s.id === medic?.speciality);
              return spec?.name ?? 'N/A';
            }}
            style={{ width: '25%' }}
          />
          <Column field="diagnostic" header="Diagnóstico" style={{ width: '25%' }} />
          <Column expander style={{ width: '5%' }} />
        </DataTable>
      </div>
    </>
  );
}
