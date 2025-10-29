import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chip } from 'primereact/chip';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { doctorProfileSchema, type DoctorProfileFormData } from './doctorProfile.schema';
import type { DoctorProfile } from '../../models/doctorProfile.model';
import { doctorToFormData, formDataToDoctor } from './doctorProfile.mapper';
import { specialties } from '../../api/models/medic.interface';

export function DoctorProfileForm({
  doctor,
  onSave,
  onCancel,
}: {
  doctor: DoctorProfile;
  onSave: (updated: DoctorProfile) => void;
  onCancel: () => void;
}) {
  const defaultValues = doctorToFormData(doctor);
  const [newArea, setNewArea] = useState('');
  const [newFormation, setNewFormation] = useState({ title: '', institution: '' });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DoctorProfileFormData>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const form = watch();

  const onSubmit = (data: DoctorProfileFormData) => {
    console.log('Formulario enviado con los datos:', data);
    const updatedDoctor = formDataToDoctor(data, doctor, specialties);
    onSave(updatedDoctor);
  };

  const addFormation = () => {
    if (!newFormation.title || !newFormation.institution) return;
    const updated = [...form.academic_background, { id: crypto.randomUUID(), ...newFormation }];
    setValue('academic_background', updated);
    setNewFormation({ title: '', institution: '' });
  };

  const removeFormation = (index: number) => {
    const updated = form.academic_background.filter((_, i) => i !== index);
    setValue('academic_background', updated);
  };

  const addArea = () => {
    if (!newArea.trim()) return;
    const updated = [...form.about_me.areas_of_expertise, newArea.trim()];
    setValue('about_me.areas_of_expertise', updated);
    setNewArea('');
  };

  const removeArea = (index: number) => {
    const updated = form.about_me.areas_of_expertise.filter((_, i) => i !== index);
    setValue('about_me.areas_of_expertise', updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <h3 className="text-xl font-semibold md:col-span-2">Datos personales</h3>
        <InputField
          label="Nombre completo"
          error={errors.personal_data?.full_name?.message}
          {...register('personal_data.full_name')}
        />
        <InputField
          label="Matrícula"
          error={errors.personal_data?.license_number?.message}
          {...register('personal_data.license_number')}
        />
        <InputField
          label="Especialidad"
          error={errors.personal_data?.speciality?.message}
          {...register('personal_data.speciality')}
        />

        <InputField
          label="Años de experiencia"
          error={errors.personal_data?.years_experience?.message}
          {...register('personal_data.years_experience')}
        />

        <InputField
          label="Teléfono"
          error={errors.personal_data?.phone?.message}
          {...register('personal_data.phone')}
        />

        <InputField
          label="Email"
          type="email"
          error={errors.personal_data?.email?.message}
          {...register('personal_data.email')}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Formación académica</h3>

        {form.academic_background.map((item, idx) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid md:grid-cols-2">
            <InputField
              label="Título"
              error={errors.academic_background?.[idx]?.title?.message}
              {...register(`academic_background.${idx}.title`)}
            />

            <InputField
              label="Institución"
              error={errors.academic_background?.[idx]?.institution?.message}
              {...register(`academic_background.${idx}.institution`)}
            />
            <button
              onClick={() => removeFormation(idx)}
              type="button"
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
            type="button"
            className="bg-accent flex w-full cursor-pointer items-center justify-center gap-3 self-center rounded-md p-3 text-white md:col-span-2 md:w-fit md:justify-self-end">
            <span className="pi pi-plus"></span>Agregar
          </button>
        </div>

        {errors.academic_background && (
          <p className="text-sm text-red-500">{errors.academic_background.message}</p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Sobre mí</h3>
        <label htmlFor={`aboutme-description`} className="text-sm font-medium">
          Descripción
        </label>
        <InputTextarea
          id={`aboutme-description`}
          value={form.about_me.description}
          {...register('about_me.description')}
          rows={4}
          className="w-full"
        />
        {errors.about_me?.description && (
          <p className="text-sm text-red-500">{errors.about_me.description.message}</p>
        )}

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
            placeholder="Nueva especialización"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            className="flex-1"
          />
          <button
            onClick={addArea}
            type="button"
            className="bg-accent flex w-full cursor-pointer items-center justify-center gap-3 self-center rounded-md p-3 text-white md:w-fit">
            <span className="pi pi-plus"></span>Agregar
          </button>
        </div>

        {errors.about_me?.areas_of_expertise && (
          <p className="text-sm text-red-500">{errors.about_me.areas_of_expertise.message}</p>
        )}
      </section>

      <div className="flex justify-center gap-3 md:justify-end">
        <button
          type="submit"
          className="bg-button-secondary hover:bg-muted cursor-pointer rounded-3xl px-6 py-3 text-black shadow-md/30 transition duration-300 ease-in-out">
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

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function InputField({ label, name = '', error, value, ...props }: InputFieldProps) {
  const id = `input-${name}`;

  return (
    <span className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <InputText id={id} name={name} {...props} className="w-full" />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </span>
  );
}
