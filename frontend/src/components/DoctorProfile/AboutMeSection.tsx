import { Divider } from 'primereact/divider';
import type { AboutMe } from '../../models/doctorProfile.model';

export const AboutMeSection = ({ about }: { about: AboutMe }) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-3 text-2xl">
        <i className="pi pi-address-book" style={{ fontSize: '1.5rem' }}></i>Sobre mí
      </h2>
      <div className="space-y-4 rounded-3xl border bg-white p-5">
        <p className="normal-case">{about.description}</p>
        <Divider />
        <section className="flex flex-col gap-3">
          <h3>Áreas de especialización</h3>

          <div className="flex flex-wrap gap-2">
            {about.areas_of_expertise.map((area, i) => (
              <span
                key={i}
                className="border-accent bg-primary rounded-xl border px-3 py-1 text-sm shadow-md">
                {area}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
