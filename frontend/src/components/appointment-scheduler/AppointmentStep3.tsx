import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import type { AppointmentData } from './AppointmentScheduler';
import { specialties } from '../../api/models/medic.interface';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import type { MedicListItem } from '../../api/models/medic-list-item.interface';

interface Step3Props {
  onPrev: () => void;
  onConfirm: () => void;
  data: AppointmentData;
}

export const AppointmentStep3 = ({ onPrev, onConfirm, data }: Step3Props) => {
  const [medics, setMedics] = useState<MedicListItem[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.users.getMedicsSummary();
        if (res.success && res.data) setMedics(res.data);
      } catch {
        setMedics([]);
      }
    };
    load();
  }, []);
  const getspecialityName = () => {
    const speciality = specialties.find((s) => s.id === data.specialityId);
    return speciality ? speciality.name : 'No seleccionada';
  };

  const getDoctorName = () => {
    const doctor = medics.find((d) => d.medic_id === data.doctorId);
    return doctor ? `${doctor.first_name} ${doctor.last_name}` : 'No seleccionado';
  };

  const getFormattedDate = () => {
    if (!data.date) return 'No seleccionada';
    return new Date(data.date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="flex w-full max-w-7xl flex-col space-y-6 overflow-y-auto rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
      <AppointmentHeader />
      <AppointmentStepper currentStep={3} />
      <div className="flex flex-grow flex-col items-center justify-center space-y-6 pt-8">
        <div className="w-full rounded-xl border-2 border-dashed border-gray-200 p-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-500">ESPECIALIDAD</p>
              <p className="text-lg font-bold text-gray-800">{getspecialityName()}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-500">FECHA</p>
              <p className="text-lg font-bold text-gray-800">{getFormattedDate()}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-500">MÉDICO</p>
              <p className="text-lg font-bold text-gray-800">{getDoctorName()}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-500">HORA</p>
              <p className="text-lg font-bold text-gray-800">{data.time || 'No seleccionada'}</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg border border-blue-200 bg-blue-100/60 px-4 py-3 text-center text-blue-700">
          <p>RECIBIRÁS UN CORREO DE NOTIFICACIÓN CON LOS DETALLES DE TU CITA</p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="rounded-full bg-gray-200 px-10 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-300">
          ATRÁS
        </button>
        <button
          onClick={onConfirm}
          className="rounded-full bg-[#734F96] px-10 py-3 font-bold text-white transition-colors hover:bg-[#5f3d7c]">
          CONFIRMAR
        </button>
      </div>
    </div>
  );
};
