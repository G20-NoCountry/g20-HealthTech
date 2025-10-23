import type { AcademicFormation } from '../../models/doctorProfile.model';

export const AcademicBackgroundSection = ({ background }: { background: AcademicFormation[] }) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-3 text-2xl">
        <i className="pi pi-graduation-cap" style={{ fontSize: '1.5rem' }}></i> Formación Académica
      </h2>
      <ul className="space-y-4 rounded-3xl border bg-white p-5">
        {background.map((item) => (
          <li
            key={item.id}
            className="bg-primary flex items-center gap-3 rounded-2xl border px-5 py-3">
            <i className="pi pi-circle-fill" style={{ fontSize: '0.6rem' }}></i>
            {item.title} - {item.institution}
          </li>
        ))}
      </ul>
    </section>
  );
};
