import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import * as z from 'zod';
import type { SubmitHandler, FieldError, UseFormRegister, Path } from 'react-hook-form';
import type { ReactNode } from 'react';

const MAX_AGE = 120;

const parseDDMMYYYY = (s: string) => {
  const parts = s.split('/');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(Number);
  if ([d, m, y].some(isNaN)) return null;
  return { day: d, month: m, year: y };
};

const isRealDate = (s: string) => {
  const parsed = parseDDMMYYYY(s);
  if (!parsed) return false;
  const { day, month, year } = parsed;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const calcAge = (s: string) => {
  const parsed = parseDDMMYYYY(s);
  if (!parsed) return null;
  const { day, month, year } = parsed;
  const today = new Date();
  let age = today.getFullYear() - year;
  const hasBirthday =
    today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day);
  if (!hasBirthday) age--;
  return age;
};

const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] as const;
const socialOptions = ['Sindicales', 'Provinciales', 'OSDE', 'Otros'] as const;

const profileSchema = z.object({
  nombreCompleto: z
    .string()
    .trim()
    .min(3, 'Debe tener al menos 3 caracteres.')
    .regex(nameRegex, 'Solo letras y espacios.'),
  fechaNacimiento: z.string().superRefine((val, ctx) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Formato requerido: DD/MM/AAAA.' });
      return;
    }
    if (!isRealDate(val)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Fecha inválida.' });
      return;
    }
    const age = calcAge(val);
    if (age === null || age < 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Edad inválida.' });
      return;
    }
    if (age > MAX_AGE) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Edad mayor a ${MAX_AGE} años.` });
    }
  }),
  direccion: z.string().trim().min(5, 'Dirección requerida.'),
  telefono: z
    .string()
    .min(7, 'Mínimo 7 dígitos.')
    .max(15, 'Máximo 15 dígitos.')
    .regex(/^\d+$/, 'Solo números.'),
  obraSocialParticular: z.enum(socialOptions, { error: 'Campo requerido.' }),
  email: z.string().email('Email inválido.'),
  tipoSangre: z.enum(bloodTypes, { error: 'Campo requerido.' }),
  alergias: z.string().trim().min(1, 'Campo requerido.'),
  condicionesCronicas: z.string().trim().min(1, 'Campo requerido.'),
  medicamentosActuales: z.string().trim().min(1, 'Campo requerido.'),
});
type ProfileData = z.infer<typeof profileSchema>;
const defaultValues: ProfileData = {
  nombreCompleto: 'SUSANA RAMIREZ',
  fechaNacimiento: '15/03/1970',
  direccion: 'AV. LIBERTAD, CIUDAD EVITA. BS AS',
  telefono: '01136992010',
  obraSocialParticular: 'OSDE',
  email: 'SUSANA_RAM40@GMAIL.COM',
  tipoSangre: 'O+',
  alergias: 'PENICILINA, POLEN',
  condicionesCronicas: 'NINGUNA',
  medicamentosActuales: 'BETAMETASONA',
};
interface FormFieldProps {
  label: string;
  name: Path<ProfileData>;
  icon: ReactNode;
  type?: string;
  register: UseFormRegister<ProfileData>;
  error?: FieldError;
  disabled?: boolean;
}
const FormField = ({
                     label,
                     name,
                     icon,
                     type = 'text',
                     register,
                     error,
                     disabled,
                   }: FormFieldProps) => (
  <div className="flex flex-col space-y-3">
    <label className="text-2xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
      {label}
    </label>
    <div
      className={`flex h-20 items-center space-x-4 rounded-[2rem] border-2 p-6 transition duration-150 ${error ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${disabled ? 'bg-gray-50' : 'bg-white'}`}>
      <div
        className={`flex-shrink-0 ${disabled ? 'text-purple-300' : 'text-purple-600'} opacity-80`}>
        {icon}
      </div>
      <input
        type={type}
        {...register(name)}
        disabled={disabled}
        className={`w-full bg-transparent text-2xl focus:outline-none ${
          disabled ? 'cursor-not-allowed text-gray-500' : 'text-gray-900'
        }`}
      />
    </div>
    {error?.message && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);
export const Profile = () => {
  const toast = useRef<Toast>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    console.log('Datos actualizados:', data);
    setIsEditing(false);
    toast.current?.show({
      severity: 'success',
      summary: '¡Éxito!',
      detail: 'Cambios guardados con éxito',
      life: 3000,
    });
  };
  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
    toast.current?.show({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Cambios descartados',
      life: 3000,
    });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-10">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl space-y-12">
        <div className="rounded-[2.5rem] bg-pink-50 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.08)] sm:p-16 md:p-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">DATOS PERSONALES</h2>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="rounded-full border border-gray-300 p-4 transition hover:bg-white">
              <svg
                className={`h-8 w-8 ${isEditing ? 'text-purple-400' : 'text-purple-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            <div className="col-span-1 space-y-10">
              <FormField
                label="NOMBRE COMPLETO"
                name="nombreCompleto"
                register={register}
                error={errors.nombreCompleto}
                icon={<i className="pi pi-user text-3xl" />}
                disabled={!isEditing}
              />
              <FormField
                label="DIRECCIÓN"
                name="direccion"
                register={register}
                error={errors.direccion}
                icon={<i className="pi pi-map-marker text-3xl" />}
                disabled={!isEditing}
              />
              <div className="flex flex-col space-y-3">
                <label className="text-2xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
                  OBRA SOCIAL / PARTICULAR
                </label>
                <Controller
                  name="obraSocialParticular"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={`flex h-20 items-center space-x-4 rounded-[2rem] border-2 p-6 transition duration-150 ${errors.obraSocialParticular ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}>
                      <i
                        className={`pi pi-briefcase text-3xl ${isEditing ? 'text-purple-600' : 'text-purple-300'} opacity-80`}
                      />
                      <select
                        {...field}
                        disabled={!isEditing}
                        className={`w-full bg-transparent text-2xl focus:outline-none ${
                          !isEditing ? 'cursor-not-allowed text-gray-500' : 'text-gray-900'
                        }`}>
                        <option value="">Selecciona obra social...</option>
                        {socialOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1 space-y-10">
              <div className="flex flex-col space-y-3">
                <label className="text-2xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
                  FECHA DE NACIMIENTO
                </label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={`flex h-20 items-center space-x-4 rounded-[2rem] border-2 p-6 transition duration-150 ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}>
                      <i
                        className={`pi pi-calendar text-3xl ${isEditing ? 'text-purple-600' : 'text-purple-300'} opacity-80`}
                      />
                      <Calendar
                        {...field}
                        disabled={!isEditing}
                        value={
                          field.value
                            ? (() => {
                              const [d, m, y] = field.value.split('/');
                              return new Date(+y, +m - 1, +d);
                            })()
                            : null
                        }
                        onChange={(e) => {
                          if (e.value instanceof Date) {
                            const d = e.value.getDate().toString().padStart(2, '0');
                            const m = (e.value.getMonth() + 1).toString().padStart(2, '0');
                            const y = e.value.getFullYear();
                            field.onChange(`${d}/${m}/${y}`);
                          }
                        }}
                        dateFormat="dd/mm/yy"
                        placeholder="Selecciona una fecha..."
                        className="w-full border-0 bg-transparent text-2xl shadow-none focus:outline-none"
                        pt={{
                          input: {
                            className: `text-2xl bg-transparent border-0 shadow-none focus:outline-none w-full ${
                              !isEditing
                                ? 'text-gray-500'
                                : 'text-gray-900 placeholder-gray-400'
                            }`,
                          },
                          dropdownButton: { className: 'hidden' },
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <FormField
                label="TELÉFONO"
                name="telefono"
                register={register}
                error={errors.telefono}
                icon={<i className="pi pi-phone text-3xl" />}
                disabled={!isEditing}
              />
              <FormField
                label="EMAIL"
                name="email"
                register={register}
                error={errors.email}
                icon={<i className="pi pi-envelope text-3xl" />}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="rounded-[2.5rem] bg-pink-50 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.08)] sm:p-16 md:p-24">
          <h2 className="mb-8 text-3xl font-extrabold text-gray-800 sm:text-4xl">
            INFORMACIÓN MÉDICA
          </h2>
          <div className="grid grid-cols-1 gap-y-8">
            <div className="flex flex-col space-y-3">
              <label className="text-2xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
                TIPO DE SANGRE
              </label>
              <Controller
                name="tipoSangre"
                control={control}
                render={({ field }) => (
                  <div
                    className={`flex h-20 items-center space-x-4 rounded-[2rem] border-2 p-6 transition duration-150 ${errors.tipoSangre ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}>
                    <i
                      className={`pi pi-heart-fill text-3xl ${isEditing ? 'text-purple-600' : 'text-purple-300'} opacity-80`}
                    />
                    <select
                      {...field}
                      disabled={!isEditing}
                      className={`w-full bg-transparent text-2xl focus:outline-none ${
                        !isEditing ? 'cursor-not-allowed text-gray-500' : 'text-gray-900'
                      }`}>
                      <option value="">Selecciona tipo de sangre...</option>
                      {bloodTypes.map((bt) => (
                        <option key={bt} value={bt}>
                          {bt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />
            </div>
            <FormField
              label="ALERGIAS"
              name="alergias"
              register={register}
              error={errors.alergias}
              icon={<i className="pi pi-exclamation-circle text-3xl" />}
              disabled={!isEditing}
            />
            <FormField
              label="CONDICIONES CRÓNICAS"
              name="condicionesCronicas"
              register={register}
              error={errors.condicionesCronicas}
              icon={<i className="pi pi-heart text-3xl" />}
              disabled={!isEditing}
            />
            <FormField
              label="MEDICAMENTOS ACTUALES"
              name="medicamentosActuales"
              register={register}
              error={errors.medicamentosActuales}
              icon={<i className="pi pi-briefcase text-3xl" />}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && (
          <div className="flex w-full flex-col justify-center space-y-6 pt-6 sm:flex-row sm:space-y-0 sm:space-x-8">
            <button
              type="submit"
              className="h-20 w-full rounded-3xl bg-purple-500 text-2xl font-extrabold text-white shadow-2xl transition-all hover:bg-purple-600 sm:w-80">
              GUARDAR CAMBIOS
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="h-20 w-full rounded-3xl border-2 border-gray-200 bg-white text-2xl font-extrabold text-gray-800 shadow-md transition-all hover:bg-gray-50 sm:w-80">
              CANCELAR
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
