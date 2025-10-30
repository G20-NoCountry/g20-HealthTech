import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import * as z from 'zod';
import type { SubmitHandler, FieldError, UseFormRegister, Path } from 'react-hook-form';
import type { ReactNode } from 'react';
import { api } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useParams } from 'react-router';

const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
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

const profileSchema = z.object({
  nombreCompleto: z
    .string()
    .trim()
    .min(3, 'Debe tener al menos 3 caracteres.')
    .regex(nameRegex, 'Solo letras y espacios.'),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida.'),
  direccion: z.string().trim().min(5, 'Dirección requerida.'),
  telefono: z
    .string()
    .min(7, 'Mínimo 7 dígitos.')
    .max(18, 'Máximo 18 dígitos.')
    .regex(
      /^\+?[\d\s()-]{6,18}$/,
      'Formato de teléfono no válido. Ejemplo: +54 9 11 5555-1234 o 2995339976',
    ),
  obraSocialParticular: z.enum(socialOptions, { error: 'Campo requerido.' }),
  email: z.email('Email inválido.'),
  tipoSangre: z.enum(bloodTypes, { error: 'Campo requerido.' }),
  alergias: z.string().trim().min(1, 'Campo requerido.'),
  condicionesCronicas: z.string().trim().min(1, 'Campo requerido.'),
  medicamentosActuales: z.string().trim().min(1, 'Campo requerido.'),
});
type ProfileData = z.infer<typeof profileSchema>;
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
  <div className="flex flex-col space-y-2">
    <label className="text-xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
      {label}
    </label>
    <div
      className={`flex h-16 items-center space-x-3 rounded-[2rem] border-2 p-4 transition duration-150 ${error ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${disabled ? 'bg-gray-50' : 'bg-white'}`}>
      <div
        className={`flex-shrink-0 ${disabled ? 'text-purple-300' : 'text-purple-600'} opacity-80`}>
        {icon}
      </div>
      <input
        type={type}
        {...register(name)}
        disabled={disabled}
        className={`w-full bg-transparent text-xl focus:outline-none ${
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
  const { user, refreshUser } = useAuth();
  const { id: patientIdFromParams } = useParams<{ id: string }>();
  const [externalPatient, setExternalPatient] = useState<any | null>(null);

  const isMedico = user?.rol === 'medico';
  const isMedicoViewingPatient = isMedico && !!patientIdFromParams;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  // Si el médico entra con :id, traer ese paciente
  useEffect(() => {
    const fetchExternalPatient = async () => {
      if (isMedicoViewingPatient && patientIdFromParams) {
        try {
          const res = await api.users.getPatientById(Number(patientIdFromParams));
          if (res.success) {
            setExternalPatient(res.data);
            setIsEditing(false);
          } else {
            setExternalPatient(null);
          }
        } catch {
          setExternalPatient(null);
        }
      } else {
        setExternalPatient(null);
      }
    };
    fetchExternalPatient();
  }, [isMedicoViewingPatient, patientIdFromParams]);

  useEffect(() => {
    const subject: any = externalPatient ?? user;
    if (subject && 'location' in subject) {
      const nombres = (subject.first_name + ' ' + subject.last_name).trim();
      const defaultValues = {
        nombreCompleto: nombres || '',
        fechaNacimiento: '01/01/1990',
        direccion: subject.location || '',
        telefono: subject.phone || '',
        obraSocialParticular: (subject.health_insurance as any) || 'OSECAC',
        email: subject.email || '',
        tipoSangre: (subject.blood_type as any) || 'O+',
        alergias: subject.alergias || '',
        condicionesCronicas: subject.cronicas_condition || '',
        medicamentosActuales: subject.actual_medication || '',
      };
      reset(defaultValues);
    }
  }, [user, externalPatient, reset]);

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    if (!user || !('location' in user)) return;

    try {
      const nombres = data.nombreCompleto.trim().split(' ');
      const last_name = nombres.pop() || '';
      const first_name = nombres.join(' ') || last_name;

      const updateData = {
        id: user.id,
        first_name,
        last_name,
        email: data.email,
        phone: data.telefono,
        location: data.direccion,
        health_insurance: data.obraSocialParticular,
        blood_type: data.tipoSangre,
        alergias: data.alergias,
        cronicas_condition: data.condicionesCronicas,
        actual_medication: data.medicamentosActuales,
      };

      await api.users.updatePatientUser(updateData);
      await refreshUser();

      setIsEditing(false);
      toast.current?.show({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Cambios guardados con éxito',
        life: 3000,
        className: 'normal-case',
      });
    } catch (error: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.response?.data?.message || 'No se pudieron guardar los cambios',
        life: 3000,
        className: 'normal-case',
      });
    }
  };

  const handleCancel = () => {
    if (user && 'location' in user) {
      const nombres = (user.first_name + ' ' + user.last_name).trim();
      const defaultValues = {
        nombreCompleto: nombres || '',
        fechaNacimiento: '01/01/1990',
        direccion: user.location || '',
        telefono: user.phone || '',
        obraSocialParticular: (user.health_insurance as any) || 'OSECAC',
        email: user.email || '',
        tipoSangre: (user.blood_type as any) || 'O+',
        alergias: user.alergias || '',
        condicionesCronicas: user.cronicas_condition || '',
        medicamentosActuales: user.actual_medication || '',
      };
      reset(defaultValues);
    }
    setIsEditing(false);
    toast.current?.show({
      severity: 'info',
      summary: 'Cancelado',
      detail: 'Cambios descartados',
      life: 3000,
      className: 'normal-case',
    });
  };
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4 sm:p-10">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl space-y-8">
        <div className="rounded-[2.5rem] bg-pink-50 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.08)] sm:p-10 md:p-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">DATOS PERSONALES</h2>
            {!isMedicoViewingPatient && (
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
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <div className="col-span-1 space-y-6">
              <FormField
                label="NOMBRE COMPLETO"
                name="nombreCompleto"
                register={register}
                error={errors.nombreCompleto}
                icon={<i className="pi pi-user text-2xl" />}
                disabled={!isEditing}
              />
              <FormField
                label="DIRECCIÓN"
                name="direccion"
                register={register}
                error={errors.direccion}
                icon={<i className="pi pi-map-marker text-2xl" />}
                disabled={!isEditing}
              />
              <div className="flex flex-col space-y-2">
                <label className="text-xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
                  OBRA SOCIAL / PARTICULAR
                </label>
                <Controller
                  name="obraSocialParticular"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={`flex h-16 items-center space-x-3 rounded-[2rem] border-2 p-4 transition duration-150 ${errors.obraSocialParticular ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}>
                      <i
                        className={`pi pi-check text-2xl ${isEditing ? 'text-purple-600' : 'text-purple-300'} opacity-80`}
                      />
                      <select
                        {...field}
                        disabled={!isEditing}
                        className={`w-full bg-transparent text-xl focus:outline-none ${
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
            <div className="col-span-1 space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
                  FECHA DE NACIMIENTO
                </label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={`flex h-16 items-center space-x-3 rounded-[2rem] border-2 p-4 transition duration-150 ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}>
                      <i
                        className={`pi pi-calendar text-2xl ${isEditing ? 'text-purple-600' : 'text-purple-300'} opacity-80`}
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
                        className="w-full border-0 bg-transparent text-xl shadow-none focus:outline-none"
                        pt={{
                          input: {
                            className: `text-xl bg-transparent border-0 shadow-none focus:outline-none w-full ${
                              !isEditing ? 'text-gray-500' : 'text-gray-900 placeholder-gray-400'
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
                icon={<i className="pi pi-phone text-2xl" />}
                disabled={!isEditing}
              />
              <FormField
                label="EMAIL"
                name="email"
                register={register}
                error={errors.email}
                icon={<i className="pi pi-envelope text-2xl" />}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="rounded-[2.5rem] bg-pink-50 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.08)] sm:p-10 md:p-12">
          <h2 className="mb-6 text-2xl font-extrabold text-gray-800 sm:text-3xl">
            INFORMACIÓN MÉDICA
          </h2>
          <div className="grid grid-cols-1 gap-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xl font-semibold tracking-wide text-gray-800 uppercase opacity-95">
                TIPO DE SANGRE
              </label>
              <Controller
                name="tipoSangre"
                control={control}
                render={({ field }) => (
                  <div
                    className={`flex h-16 items-center space-x-3 rounded-[2rem] border-2 p-4 transition duration-150 ${errors.tipoSangre ? 'border-red-500' : 'border-gray-200 hover:border-purple-400'} ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}>
                    <i
                      className={`pi pi-heart-fill text-2xl ${isEditing ? 'text-purple-600' : 'text-purple-300'} opacity-80`}
                    />
                    <select
                      {...field}
                      disabled={!isEditing}
                      className={`w-full bg-transparent text-xl focus:outline-none ${
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
              icon={<i className="pi pi-exclamation-circle text-2xl" />}
              disabled={!isEditing}
            />
            <FormField
              label="CONDICIONES CRÓNICAS"
              name="condicionesCronicas"
              register={register}
              error={errors.condicionesCronicas}
              icon={<i className="pi pi-heart text-2xl" />}
              disabled={!isEditing}
            />
            <FormField
              label="MEDICAMENTOS ACTUALES"
              name="medicamentosActuales"
              register={register}
              error={errors.medicamentosActuales}
              icon={<i className="pi pi-briefcase text-2xl" />}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && !isMedicoViewingPatient && (
          <div className="flex w-full flex-col justify-center space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <button
              type="submit"
              className="h-14 w-full rounded-3xl bg-purple-500 text-xl font-extrabold text-white shadow-2xl transition-all hover:bg-purple-600 sm:w-64">
              GUARDAR CAMBIOS
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="h-14 w-full rounded-3xl border-2 border-gray-200 bg-white text-xl font-extrabold text-gray-800 shadow-md transition-all hover:bg-gray-50 sm:w-64">
              CANCELAR
            </button>
          </div>
        )}
        {isMedico && (
          <div className="flex w-full flex-col gap-6 pt-6 md:flex-row">
            <Link
              to={
                isMedicoViewingPatient && patientIdFromParams
                  ? `/medical-history/${patientIdFromParams}`
                  : '/'
              }
              className="flex-1 rounded-[2rem] bg-purple-200 py-4 text-center text-lg font-semibold text-gray-700 shadow-md transition hover:bg-purple-300">
              Historial médico
            </Link>
            <Link
              to="/"
              className="flex-1 rounded-[2rem] bg-purple-200 py-4 text-center text-lg font-semibold text-gray-700 shadow-md transition hover:bg-purple-300">
              Historial de turnos
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};
