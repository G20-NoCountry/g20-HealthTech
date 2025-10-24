import type { PersonalData } from '../../models/doctorProfile.model';

export const PersonalDataSection = ({
  data,
  onEdit,
}: {
  data: PersonalData;
  onEdit: () => void;
}) => {
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Datos personales</h1>
        <button
          onClick={onEdit}
          aria-label="Editar datos personales"
          className="border-accent hover:bg-secondary flex h-7 w-7 cursor-pointer items-center justify-center rounded border bg-transparent">
          <span className="pi pi-pen-to-square text-accent"></span>
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nombre completo" value={data.full_name} />
        <Field label="Matrícula" value={data.license_number} />
        <Field label="Especialidad" value={data.specialty} />
        <Field label="Experiencia Laboral" value={`${data.years_experience} años`} />
        <Field label="Teléfono" value={data.phone} />
        <Field label="Email" value={data.email} />
      </div>
    </section>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{label}</p>
      <div
        role="textbox"
        aria-readonly="true"
        aria-label={label}
        tabIndex={0}
        className="border-success rounded-2xl border bg-white px-3 py-2">
        {value}
      </div>
    </div>
  );
}
