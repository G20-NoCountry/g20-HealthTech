import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import type { DoctorProfile } from '../../models/doctorProfile.model';

export function DoctorProfileForm({
  doctor,
  onSave,
  onCancel,
}: {
  doctor: DoctorProfile;
  onSave: (updated: DoctorProfile) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<DoctorProfile>(doctor);
  const [newArea, setNewArea] = useState('');
  const [newFormation, setNewFormation] = useState({ title: '', institution: '' });

  const handleChange = (section: keyof DoctorProfile, field: string, value: any) => {
    setForm((prev) => {
      const sectionValue = prev[section] as Record<string, any>;
      return {
        ...prev,
        [section]: {
          ...sectionValue,
          [field]: value,
        },
      };
    });
  };

  const handleAcademicChange = (index: number, field: string, value: string) => {
    const updated = [...form.academic_background];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, academic_background: updated }));
  };

  const addFormation = () => {
    if (!newFormation.title || !newFormation.institution) return;
    setForm((prev) => ({
      ...prev,
      academic_background: [
        ...prev.academic_background,
        { id: crypto.randomUUID(), ...newFormation },
      ],
    }));
    setNewFormation({ title: '', institution: '' });
  };

  const removeFormation = (index: number) => {
    setForm((prev) => ({
      ...prev,
      academic_background: prev.academic_background.filter((_, i) => i !== index),
    }));
  };

  const addArea = () => {
    if (!newArea.trim()) return;
    setForm((prev) => ({
      ...prev,
      about_me: {
        ...prev.about_me,
        areas_of_expertise: [...prev.about_me.areas_of_expertise, newArea.trim()],
      },
    }));
    setNewArea('');
  };

  const removeArea = (index: number) => {
    setForm((prev) => ({
      ...prev,
      about_me: {
        ...prev.about_me,
        areas_of_expertise: prev.about_me.areas_of_expertise.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Datos personales */}
      <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <h3 className="text-xl font-semibold md:col-span-2">Datos personales</h3>
        <InputField
          label="Nombre completo"
          name="full_name"
          value={form.personal_data.full_name}
          onChange={(e) => handleChange('personal_data', 'full_name', e.target.value)}
        />
        <InputField
          label="Matrícula"
          name="license_number"
          value={form.personal_data.license_number}
          onChange={(e) => handleChange('personal_data', 'license_number', e.target.value)}
        />
        <InputField
          label="Especialidad"
          name="specialty"
          value={form.personal_data.specialty}
          onChange={(e) => handleChange('personal_data', 'specialty', e.target.value)}
        />
        <InputField
          label="Años de experiencia"
          name="years_experience"
          value={form.personal_data.years_experience.toString()}
          onChange={(e) =>
            handleChange('personal_data', 'years_experience', Number(e.target.value))
          }
        />
        <InputField
          label="Teléfono"
          name="phone"
          value={form.personal_data.phone}
          onChange={(e) => handleChange('personal_data', 'phone', e.target.value)}
        />
        <InputField
          label="Email"
          name="email"
          value={form.personal_data.email}
          onChange={(e) => handleChange('personal_data', 'email', e.target.value)}
        />
      </section>

      {/* Formación académica */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Formación académica</h3>

        {form.academic_background.map((item, idx) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid md:grid-cols-2">
            <InputField
              name={`title-${idx}`}
              label="Título"
              value={item.title}
              onChange={(e) => handleAcademicChange(idx, 'title', e.target.value)}
            />
            <InputField
              name={`institution-${idx}`}
              label="Institución"
              value={item.institution}
              onChange={(e) => handleAcademicChange(idx, 'institution', e.target.value)}
            />
            <button
              onClick={() => removeFormation(idx)}
              className="flex cursor-pointer items-center gap-3 self-center text-red-500 md:col-span-2 md:w-fit md:justify-self-end">
              <span className="pi pi-trash"></span>Eliminar
            </button>
          </div>
        ))}

        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid md:grid-cols-2">
          <InputText
            name={`institution-title`}
            placeholder="Nuevo título"
            value={newFormation.title}
            onChange={(e) => setNewFormation((prev) => ({ ...prev, title: e.target.value }))}
          />
          <InputText
            name={`institution-formation`}
            placeholder="Institución"
            value={newFormation.institution}
            onChange={(e) => setNewFormation((prev) => ({ ...prev, institution: e.target.value }))}
          />
          <button
            onClick={addFormation}
            className="bg-accent flex w-full cursor-pointer items-center justify-center gap-3 self-center rounded-md p-3 text-white md:col-span-2 md:w-fit md:justify-self-end">
            <span className="pi pi-plus"></span>Agregar
          </button>
        </div>
      </section>

      {/* Sobre mí */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Sobre mí</h3>
        <label htmlFor={`aboutme-description`} className="text-sm font-medium">
          Descripción
        </label>
        <InputTextarea
          id={`aboutme-description`}
          name={`aboutme-description`}
          value={form.about_me.description}
          onChange={(e) => handleChange('about_me', 'description', e.target.value)}
          rows={4}
          className="w-full"
        />

        <label htmlFor={`aboutme-area`} className="text-sm font-medium">
          Áreas de especialización
        </label>
        <div className="flex flex-wrap gap-2">
          {form.about_me.areas_of_expertise.map((area, idx) => (
            <Chip
              key={`${area}-${idx}`}
              label={area}
              removable
              onRemove={() => {
                removeArea(idx);
                return true;
              }}
            />
          ))}
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <InputText
            id={`aboutme-area`}
            name={`aboutme-area`}
            placeholder="Nueva especialización"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            className="flex-1"
          />
          <button
            onClick={addArea}
            className="bg-accent flex w-full cursor-pointer items-center justify-center gap-3 self-center rounded-md p-3 text-white md:w-fit">
            <span className="pi pi-plus"></span>Agregar
          </button>
        </div>
      </section>

      {/* Botones de acción */}
      <div className="flex justify-center gap-3 md:justify-end">
        <button
          type="submit"
          className="bg-button-secondary cursor-pointer rounded-3xl px-6 py-3 text-black shadow-md/30">
          Guardar
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="bg-muted cursor-pointer rounded-3xl px-6 py-3 text-black shadow-md/30">
          Cancelar
        </button>
      </div>
    </form>
  );
}

function InputField({
  label,
  value,
  onChange,
  name,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) {
  const id = `input-${name.replace(/\s+/g, '-').toLowerCase()}`; // genera id único basado en el name

  return (
    <span className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <InputText
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="false"
        className="w-full"
      />
    </span>
  );
}
