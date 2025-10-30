import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { api } from '../../api';
import type { PatientUser } from '../../api/models/user.interface';
import { useNavigate } from 'react-router';

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const nameRegex = new RegExp('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$');
const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] as const;
const socialOptions = [
  'OSECAC',
  'OSPRERA',
  'UPCN',
  'OBSBA',
  'OSDEPYM',
  'OSUTHGRA',
  'OSPE',
  'OSPECON',
  'OSIAD',
  'OSSEG',
] as const;

const registrationSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres.')
    .regex(nameRegex, 'El nombre solo puede contener letras y espacios.'),
  last_name: z
    .string()
    .trim()
    .min(3, 'El apellido debe tener al menos 3 caracteres.')
    .regex(nameRegex, 'El apellido solo puede contener letras y espacios.'),
  direccion: z.string().trim().min(5, 'La dirección es requerida.'),
  telefono: z
    .string()
    .min(7, 'Mínimo 7 dígitos.')
    .max(15, 'Máximo 15 dígitos.')
    .regex(/^\d+$/, 'El teléfono debe contener solo números.'),
  obraSocialParticular: z.enum(socialOptions, { error: 'Debe seleccionar una obra social.' }),
  tipoSangre: z.enum(bloodTypes, 'Debe seleccionar un tipo de sangre.'),
  email: z.email('Email inválido.').min(1, 'El email es requerido.'),
  contrasena: z
    .string()
    .min(8, 'Mínimo 8 caracteres.')
    .regex(
      passwordRegex,
      'Debe incluir Mayúscula, Minúscula, Número y Carácter especial (!@#$%^&*).',
    ),
});

type FormData = z.infer<typeof registrationSchema>;

const FormField = ({
  label,
  name,
  icon,
  type = 'text',
  register,
  error,
  isPassword = false,
  placeholder,
}: {
  label: string;
  name: keyof FormData;
  icon: React.ReactNode;
  type?: string;
  register: any;
  error?: any;
  isPassword?: boolean;
  placeholder?: string;
}) => (
  <div className="flex flex-col space-y-1">
    <label
      htmlFor={name}
      className="mb-2 text-sm font-bold tracking-wide text-black uppercase opacity-80">
      {label}
    </label>
    <div
      className={`flex h-12 items-center space-x-2 rounded-2xl border-2 bg-white px-3 transition duration-150 ${error ? 'border-red-500' : 'border-gray-200 hover:border-purple-300'}`}>
      {icon}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
        autoComplete={isPassword ? 'new-password' : 'on'}
      />
    </div>
    {error?.message && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

export const RegistrationForm = () => {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const authEndpoint = api.auth;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Mapear los datos para el paciente
      const mappedData: PatientUser = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.telefono,
        password: data.contrasena,
        is_active: true,
        rol: 'paciente',
        created_at: new Date(),
        updated_at: new Date(),
        location: data.direccion,
        health_insurance: data.obraSocialParticular,
        blood_type: data.tipoSangre,
        alergias: 'Ninguna',
        cronicas_condition: 'Ninguna',
        actual_medication: 'Ninguna',
      };

      // Registro del paciente
      const response = await authEndpoint.patientRegister(mappedData);
      if (response.success) {
        toast.current?.show({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: `Paciente registrado con éxito.`,
          life: 3000,
          className: 'normal-case',
        });
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        throw new Error(response.message || 'Hubo un problema al registrar al paciente.');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error en el registro',
        detail: 'Por favor, intente nuevamente más tarde.',
        life: 3000,
        className: 'normal-case',
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error en el formulario',
      detail: 'Por favor revisa los campos marcados en rojo.',
      life: 3000,
      className: 'normal-case',
    });
  };

  return (
    <div className="bg-secondary relative mx-auto w-full rounded-[2.5rem] p-6 shadow-xl sm:max-w-xl sm:p-10 lg:max-w-2xl">
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
        className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <FormField
          label="Nombre"
          name="first_name"
          placeholder="Juan"
          register={register}
          error={errors.first_name}
          icon={
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />
        <FormField
          label="Apellido"
          name="last_name"
          placeholder="Perez"
          register={register}
          error={errors.last_name}
          icon={
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />
        <FormField
          label="Teléfono"
          name="telefono"
          placeholder="+54 11 9012-3456"
          register={register}
          error={errors.telefono}
          icon={
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          }
        />
        <FormField
          label="Email"
          name="email"
          placeholder="juan.perez@gmail.com"
          register={register}
          error={errors.email}
          icon={
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <FormField
          label="Dirección"
          name="direccion"
          placeholder="Buenos Aires, Argentina"
          register={register}
          error={errors.direccion}
          icon={
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="obraSocialParticular"
            className="mb-2 text-sm font-bold tracking-wide text-black uppercase opacity-80">
            Obra social / Particular
          </label>
          <Controller
            name="obraSocialParticular"
            control={control}
            render={({ field }) => (
              <div
                className={`flex h-12 items-center space-x-2 rounded-2xl border-2 bg-white px-3 transition duration-150 ${errors.tipoSangre ? 'border-red-500' : 'border-gray-200 hover:border-purple-300'}`}>
                <i className={`pi pi-check h-5 w-5 text-purple-500`} />
                <select
                  id="obraSocialParticular"
                  {...field}
                  className={`w-full bg-transparent text-sm text-gray-900 focus:outline-none`}>
                  <option value="">Selecciona obra social</option>
                  {socialOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          {errors.obraSocialParticular?.message && (
            <p className="mt-1 text-xs text-red-600">{errors.obraSocialParticular.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="tipoSangre"
            className="mb-2 text-sm font-bold tracking-wide text-black uppercase opacity-80">
            Tipo de sangre
          </label>
          <Controller
            name="tipoSangre"
            control={control}
            render={({ field }) => (
              <div
                className={`flex h-12 items-center space-x-2 rounded-2xl border-2 bg-white px-3 transition duration-150 ${errors.tipoSangre ? 'border-red-500' : 'border-gray-200 hover:border-purple-300'}`}>
                <i className={`pi pi-heart-fill h-5 w-5 text-purple-500`} />
                <select
                  id="tipoSangre"
                  {...field}
                  className={`w-full bg-transparent text-sm text-gray-900 focus:outline-none`}>
                  <option value="">Selecciona tipo de sangre</option>
                  {bloodTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          {errors.tipoSangre?.message && (
            <p className="mt-1 text-xs text-red-600">{errors.tipoSangre.message}</p>
          )}
        </div>
        <FormField
          label="Contraseña"
          name="contrasena"
          type="password"
          isPassword
          placeholder="********"
          register={register}
          error={errors.contrasena}
          icon={
            <svg
              className="h-5 w-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />
        <button
          type="submit"
          className="col-span-1 mx-auto mt-4 h-12 w-full rounded-2xl border-0 bg-purple-600 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 sm:col-span-2 sm:w-64"
          disabled={loading}>
          {loading ? 'Registrando...' : 'REGISTRAR'}
        </button>
      </form>
    </div>
  );
};
