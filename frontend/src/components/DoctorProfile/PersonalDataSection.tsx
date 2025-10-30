import type { Specialty } from '../../api/models/medic.interface';

interface PersonalDataProps {
  data: {
    first_name: string;
    last_name: string;
    license_num: number;
    speciality: Specialty;
    phone: string;
    email: string;
  };
  onEdit: () => void;
}

export const PersonalDataSection = ({ data, onEdit }: PersonalDataProps) => {
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

      <div className="grid w-full gap-6 md:grid-cols-2">
        <Field label="Nombre" value={data.first_name} icon="pi-user" />
        <Field label="Apellido" value={data.last_name} icon="pi-user" />
        <Field label="Matrícula" value={data.license_num} icon="pi-id-card" />
        <Field label="Especialidad" value={data.speciality.name} icon="pi-heart" />
        {/* <Field
          label="Experiencia Laboral"
          value={`${data.years_experience} años`}
          icon="pi-briefcase"
        /> */}
        <Field label="Teléfono" value={data.phone!} icon="pi-phone" />
        <Field label="Email" value={data.email} icon="pi-envelope" />
      </div>
    </section>
  );
};

function Field({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative flex items-center gap-2">
        <i className={`pi text-button-secondary absolute left-4 ${icon}`} />
        <input
          role="textbox"
          id={label}
          name={label}
          readOnly
          autoComplete="false"
          tabIndex={0}
          className="border-success w-full rounded-2xl border bg-white py-2 ps-10 pe-2 uppercase"
          value={value}
        />
      </div>
    </div>
  );
}
