import type { PersonalData } from '../../models/doctorProfile.model';

export const PersonalDataSection = ({ data }: { data: PersonalData }) => {
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Datos personales</h1>
        <button className="border-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded border bg-transparent">
          <span className="pi pi-pen-to-square text-accent"></span>
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Nombre completo</label>
          <div className="border-success rounded-2xl border bg-white px-3 py-2">
            {data.full_name}
          </div>
        </div>

        {/* Matrícula */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Matrícula</label>
          <div className="border-success rounded-2xl border bg-white px-3 py-2">
            {data.license_number}
          </div>
        </div>

        {/* Especialidad */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Especialidad</label>
          <div className="border-success rounded-2xl border bg-white px-3 py-2">
            {data.specialty}
          </div>
        </div>

        {/* Experiencia */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Experiencia Laboral</label>
          <div className="border-success rounded-2xl border bg-white px-3 py-2">
            {data.years_experience} años
          </div>
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Teléfono</label>
          <div className="border-success rounded-2xl border bg-white px-3 py-2">{data.phone}</div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <div className="border-success rounded-2xl border bg-white px-3 py-2">{data.email}</div>
        </div>
      </div>
    </section>
  );
};
