import { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';

export const SettingsSection = () => {
  const [citas, setCitas] = useState(true);
  const [mensajes, setMensajes] = useState(true);
  const [novedades, setNovedades] = useState(true);
  const [laboratorio, setLaboratorio] = useState (true);
  const [biometrica, setBiometrica] = useState(false);
  const [permisos, setPermisos] = useState(false);

  return (
    <div>    
        {/* --- NOTIFICACIONES --- */}
      <div className="">
        <div className="mb-3 flex items-center gap-2">
          <i className="pi pi-bell text-xl text-purple-600"></i>
          <span className="font-bold tracking-wider text-gray-700">NOTIFICACIONES</span>
        </div>

        <div className="rounded-lg border border-purple-200  p-4 shadow-sm md:p-6">
          <ul className="list-inside list-disc space-y-4">
            <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">RECORDATORIO DE CITAS</span>
              <Checkbox inputId="citas" checked={citas} onChange={(e) => setCitas(e.checked!)} />

            </li>
             <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">RESULTADOS DE LABORATORIO</span>
              <Checkbox inputId="citas" checked={laboratorio} onChange={(e) => setLaboratorio(e.checked!)} />
            </li>

            <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">MENSAJES NUEVOS</span>
              <Checkbox
                inputId="mensajes"
                checked={mensajes}
                onChange={(e) => setMensajes(e.checked!)}
              />
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">NOVEDADES DE LA APP</span>
              <Checkbox
                inputId="novedades"
                checked={novedades}
                onChange={(e) => setNovedades(e.checked!)}
              />
            </li>
          </ul>
        </div>
      </div>
        {/* --- PRIVACIDAD Y SEGURIDAD --- */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <i className="pi pi-lock text-xl text-purple-600"></i>
          <span className="font-bold tracking-wider text-gray-700">PRIVACIDAD Y SEGURIDAD</span>
        </div>

        <div className="rounded-lg border border-purple-200  p-4 shadow-sm md:p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">Autenticación biométrica</span>
              <Checkbox
                inputId="biometrica"
                checked={biometrica}
                onChange={(e) => setBiometrica(e.checked!)}
              />
            </div>
            <div className="flex items-center justify-between gap-7">
              <span className="font-medium text-gray-800">Permisos de cámara y micrófono</span>
              <Checkbox
                inputId="permisos"
                checked={permisos}
                onChange={(e) => setPermisos(e.checked!)}
              />
            </div>
            <div className="-m-2 flex cursor-pointer items-center justify-between rounded-lg p-2 font-semibold text-red-600 transition-colors hover:bg-red-50">
              <span>Eliminar cuenta</span>
              <i className="pi pi-trash"></i>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN SOPORTE --- */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <i className="pi pi-question-circle text-xl text-purple-600"></i>
          <span className="font-bold tracking-wider text-gray-700">SOPORTE</span>
        </div>
        <div className="rounded-lg border border-purple-200  p-4 shadow-sm md:p-6">
          <div className="flex flex-col space-y-3">
            {/* Contactar soporte */}
            <div className="flex items-center gap-3">
              <i className="pi pi-briefcase text-xl text-gray-600"></i>
              <span className="cursor-pointer font-semibold text-gray-800 hover:underline">
                Contactar soporte
              </span>
            </div>

            {/* Preguntas frecuentes */}
            <div className="flex items-center gap-3">
              <i className="pi pi-question-circle text-xl text-gray-600"></i>
              <span className="cursor-pointer font-semibold text-gray-800 hover:underline">
                Preguntas frecuentes
              </span>
            </div>

            {/* Enviar sugerencia */}
            <div className="flex items-center gap-3">
              <i className="pi pi-lightbulb text-xl text-gray-600"></i>
              <span className="cursor-pointer font-semibold text-gray-800 hover:underline">
                Enviar sugerencia
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
