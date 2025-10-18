import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link } from "react-router";

type FormData = {
    email: string;
    password: string;
};

export const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSubmit = (data: FormData) => {
        setLoading(true);
        setTimeout(() => {
            if (toast.current) {
                toast.current.show({
                    severity: "success",
                    summary: "Inicio de sesión exitoso",
                    detail: `Bienvenido, ${data.email}`,
                    life: 2000,
                });
            }
            setLoading(false);
        }, 800);
    };
    const inputStyleClasses = "w-full h-12 rounded-2xl shadow-sm text-black border-0 px-4 py-3 pr-10 bg-[#ffffff] focus:outline-none focus:ring-2 focus:ring-purple-400";
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <div className={`min-h-dvh flex items-center justify-center bg-main p-4`}>
            <Toast ref={toast} position="top-right" />
            <div className={`bg-form rounded-[2.5rem] p-10 shadow-xl w-full max-w-[420px] flex flex-col items-center`}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide leading-none">
                        Bienvenido a
                    </h1>
                    <h1 className="text-3xl font-extrabold text-purple-600 tracking-wider mt-1 leading-none">
                        Medic App
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full max-w-sm"
                >
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="text-sm font-bold text-black mb-2 uppercase tracking-wide opacity-80"
                        >
                            EMAIL
                        </label>
                        <div className="relative w-full">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Correo inválido",
                                    },
                                }}
                                render={({ field }) => (
                                    <InputText
                                        id="email"
                                        {...field}
                                        type="email"
                                        className={`${inputStyleClasses} ${
                                            errors.email ? "p-invalid" : ""
                                        }`}
                                    />
                                )}
                            />
                            <i className="pi pi-envelope absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 z-10" />
                        </div>
                        {errors.email && (
                            <small className="text-red-600 mt-1 text-xs">
                                {errors.email.message}
                            </small>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="inputContrasena"
                            className="text-sm font-bold text-black mb-2 uppercase tracking-wide opacity-80"
                        >
                            CONTRASEÑA
                        </label>
                        <div className="relative w-full">
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "La contraseña es obligatoria",
                                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                                }}
                                render={({ field }) => (
                                    <InputText
                                        id="inputContrasena"
                                        {...field}
                                        type={passwordVisible ? "text" : "password"}
                                        className={`${inputStyleClasses} ${
                                            errors.password ? "p-invalid" : ""
                                        }`}
                                    />
                                )}
                            />
                            <i
                                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-10 ${
                                    passwordVisible ? "pi pi-eye-slash text-gray-500" : "pi pi-eye text-gray-500"
                                }`}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && (
                            <small className="text-red-600 mt-1 text-xs">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    <a
                        href="#"
                        className="text-xs text-black font-semibold hover:underline text-center text-opacity-80 mt-1"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>

                    <Button
                        label={loading ? "Cargando..." : "Ingresar"}
                        type="submit"
                        loading={loading}
                        className={`w-full h-12 rounded-2xl text-white font-bold shadow-lg bg-button-primary border-0 hover:opacity-90 transition-all text-lg mt-1`}
                    />

                    <div className="text-center mt-3">
                        <Link to="/register" className="font-bold text-black hover:underline">
                            Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
