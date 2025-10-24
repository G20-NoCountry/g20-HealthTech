import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldError, UseFormRegister, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const isValidDate = (dateString: string): boolean => {
  const parts = dateString.split('/');
  if (parts.length !== 3) return false;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const nameRegex = new RegExp('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$');
const userTypes = ['Doctor', 'Paciente'] as const;

const registrationSchema = z.object({
  nombreCompleto: z
    .string()
    .trim()
    .min(3, 'El nombre completo debe tener al menos 3 caracteres.')
    .regex(nameRegex, 'El nombre solo puede contener letras y espacios.'),
  fechaNacimiento: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato DD/MM/AAAA requerido.')
    .refine(isValidDate, { message: 'Fecha inválida o imposible.' }),
  direccion: z.string().trim().min(5, 'La dirección es requerida.'),
  telefono: z
    .string()
    .min(7, 'Mínimo 7 dígitos.')
    .max(15, 'Máximo 15 dígitos.')
    .regex(/^\d+$/, 'El teléfono debe contener solo números.'),
  obraSocialParticular: z.string().trim().min(1, 'El campo de Obra Social es requerido.'),
  email: z.string().trim().email('Email inválido.').min(1, 'El email es requerido.'),
  contrasena: z
    .string()
    .min(8, 'Mínimo 8 caracteres.')
    .regex(passwordRegex, 'Debe incluir Mayúscula, Minúscula, Número y Carácter especial (!@#$%^&*).'),
  tipoUsuario: z.enum(userTypes, 'Debe seleccionar un tipo de usuario.'),
});

type FormData = z.infer<typeof registrationSchema>;

interface FormFieldProps {
  label: string;
  name: Path<FormData>;
  icon: React.ReactNode;
  type?: string;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  isPassword?: boolean;
}

const FormField = ({
                     label,
                     name,
                     icon,
                     type = 'text',
                     register,
                     error,
                     isPassword = false,
                   }: FormFieldProps) => (
  <div className="flex flex-col space-y-1">
    <label className="mb-2 text-sm font-bold tracking-wide text-black uppercase opacity-80">
      {label}
    </label>
    <div
      className={`flex h-12 items-center space-x-2 rounded-2xl border-2 bg-white p-2 transition duration-150 ${
        error ? 'border-red-500' : 'border-gray-200 hover:border-purple-300'
      }`}>
      {icon}
      <input
        type={type}
        {...register(name)}
        placeholder={isPassword ? 'XXXXXXXX' : ''}
        className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
        autoComplete={isPassword ? 'new-password' : 'on'}
      />
    </div>
    {error?.message && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

export const RegistrationForm = () => {
  const toast = useRef<Toast>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Formulario de REGISTRO enviado con éxito:', data);
    toast.current?.show({
      severity: 'success',
      summary: 'Registro exitoso',
      detail: `Usuario registrado como ${data.tipoUsuario}`,
      life: 3000,
    });
  };

  const onError = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error en el formulario',
      detail: 'Por favor revisa los campos marcados en rojo.',
      life: 3000,
    });
  };

  return (
    <div className="bg-secondary relative w-full sm:max-w-xl lg:max-w-2xl rounded-[2.5rem] p-6 sm:p-10 shadow-xl mx-auto">
      <Toast ref={toast} position="top-right" />
      <div className="mb-8 text-center">
        <h1 className="text-3xl leading-none font-extrabold tracking-wide text-gray-800">
          Regístrate a <br />
          <span className="mt-1 text-3xl leading-none font-extrabold tracking-wider text-purple-600">
            Medic App
          </span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6"
      >
        <div className="space-y-6">
          <FormField
            label="NOMBRE COMPLETO"
            name="nombreCompleto"
            register={register}
            error={errors.nombreCompleto}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>}
          />
          <FormField
            label="DIRECCION"
            name="direccion"
            register={register}
            error={errors.direccion}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>}
          />
          <FormField
            label="OBRA SOCIAL/PARTICULAR"
            name="obraSocialParticular"
            register={register}
            error={errors.obraSocialParticular}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>}
          />
          <FormField
            label="CONTRASEÑA"
            name="contrasena"
            type="password"
            isPassword
            register={register}
            error={errors.contrasena}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>}
          />
        </div>
        <div className="space-y-6">
          <FormField
            label="FECHA DE NACIMIENTO"
            name="fechaNacimiento"
            register={register}
            error={errors.fechaNacimiento}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>}
          />
          <FormField
            label="TELÉFONO"
            name="telefono"
            register={register}
            error={errors.telefono}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>}
          />
          <FormField
            label="EMAIL"
            name="email"
            register={register}
            error={errors.email}
            icon={<svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>}
          />
          <div className="pt-2">
            <label className="mb-2 block text-xs font-semibold text-gray-700">
              SELECCIONAR TIPO DE USUARIO
            </label>
            <Controller
              name={'tipoUsuario' as Path<FormData>}
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {userTypes.map((type) => (
                    <label key={type} className="flex cursor-pointer items-center space-x-2">
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={() => field.onChange(type)}
                        className="hidden"
                      />
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full border-2 transition duration-150 ease-in-out"
                        style={{ borderColor: field.value === type ? '#9333ea' : '#d1d5db' }}>
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: field.value === type ? '#9333ea' : 'transparent',
                          }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{type}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.tipoUsuario?.message && (
              <p className="mt-1 ml-3 text-xs text-red-500">{errors.tipoUsuario.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 mx-auto mt-4 h-12 w-full sm:w-64 rounded-2xl border-0 bg-purple-600 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90"
        >
          REGISTRAR
        </button>
      </form>
    </div>
  );
};
