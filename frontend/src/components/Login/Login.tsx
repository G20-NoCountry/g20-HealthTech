import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router';

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Inicio de sesión exitoso',
          detail: `Bienvenido, ${data.email}`,
          life: 2000,
        });
      }
      setLoading(false);
    }, 800);
  };
  const inputStyleClasses =
    'w-full h-12 rounded-2xl shadow-sm text-black border-0 px-4 py-3 pr-10 bg-[#ffffff] focus:outline-none focus:ring-2 focus:ring-purple-400';
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="bg-secondary flex w-full max-w-[420px] flex-col items-center rounded-[2.5rem] p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl leading-none font-extrabold tracking-wide text-gray-800">
            Bienvenido a
          </h1>
          <h1 className="mt-1 text-3xl leading-none font-extrabold tracking-wider text-purple-600">
            Medic App
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-bold tracking-wide text-black uppercase opacity-80">
              EMAIL
            </label>
            <div className="relative w-full">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Correo inválido',
                  },
                }}
                render={({ field }) => (
                  <InputText
                    id="email"
                    {...field}
                    type="email"
                    className={`${inputStyleClasses} ${errors.email ? 'p-invalid' : ''}`}
                  />
                )}
              />
              <i className="pi pi-envelope absolute top-1/2 right-3 z-10 -translate-y-1/2 transform text-gray-500" />
            </div>
            {errors.email && (
              <small className="mt-1 text-xs text-red-600">{errors.email.message}</small>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="inputContrasena"
              className="mb-2 text-sm font-bold tracking-wide text-black uppercase opacity-80">
              CONTRASEÑA
            </label>
            <div className="relative w-full">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: 'La contraseña es obligatoria',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                }}
                render={({ field }) => (
                  <InputText
                    id="inputContrasena"
                    {...field}
                    type={passwordVisible ? 'text' : 'password'}
                    className={`${inputStyleClasses} ${errors.password ? 'p-invalid' : ''}`}
                  />
                )}
              />
              <i
                className={`absolute top-1/2 right-3 z-10 -translate-y-1/2 transform cursor-pointer ${
                  passwordVisible ? 'pi pi-eye-slash text-gray-500' : 'pi pi-eye text-gray-500'
                }`}
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <small className="mt-1 text-xs text-red-600">{errors.password.message}</small>
            )}
          </div>

          <a
            href="#"
            className="text-opacity-80 mt-1 text-center text-xs font-semibold text-black hover:underline">
            ¿Olvidaste tu contraseña?
          </a>

          <Button
            label={loading ? 'Cargando...' : 'Ingresar'}
            type="submit"
            loading={loading}
            className="bg-button-primary mt-1 h-12 w-full rounded-2xl border-0 text-lg font-bold text-white uppercase shadow-lg transition-all hover:opacity-90"
          />

          <div className="mt-3 text-center">
            <Link to="/register" className="font-bold text-black hover:underline">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
