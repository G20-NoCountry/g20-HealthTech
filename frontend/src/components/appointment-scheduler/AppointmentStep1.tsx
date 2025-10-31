import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentStepper } from './AppointmentStepper';
import type { AppointmentData } from './AppointmentScheduler';
import { Controller } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api';
import type { MedicListItem } from '../../api/models/medic-list-item.interface';
import { specialties } from '../../api/models/medic.interface';

interface Step1Props {
  onNext: () => void;
  data: AppointmentData;
  setData: React.Dispatch<React.SetStateAction<AppointmentData>>;
  setValue: any;
  control: any;
  errors: any;
}

export const AppointmentStep1 = ({
  onNext,
  data,
  setData,
  setValue,
  control,
  errors,
}: Step1Props) => {
  const [medics, setMedics] = useState<MedicListItem[]>([]);

  useEffect(() => {
    // cargar resumen de médicos desde backend
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

  const availableDoctors = useMemo(() => {
    if (!data.specialityId) return [] as MedicListItem[];
    return medics.filter((m) => m.speciality === data.specialityId);
  }, [medics, data.specialityId]);

  useEffect(() => {
    if (data.specialityId !== '') {
      setValue('specialityId', data.specialityId); // Establece el valor en react-hook-form solo cuando specialityId cambia
    }

    // Solo reseteamos el doctorId después de que la especialidad haya cambiado.
    if (data.specialityId === '') {
      setValue('doctorId', ''); // Resetea el doctorId si la especialidad está vacía
    }
  }, [data.specialityId, setValue]);

    const handleDataChange = (field: keyof AppointmentData, value: any) => {
      setData((prevData) => {
        const newData = { ...prevData, [field]: value };

        if (field === 'specialityId') {
          newData.doctorId = ''; // Resetear doctor al cambiar especialidad
        }

        return newData;
      });


    setValue(field as any, value);
    };

  const handleDoctorChange = (value: string) => {
    setData((prevData) => ({ ...prevData, doctorId: value }));
    setValue('doctorId', value); // Actualiza doctorId en react-hook-form
  };

  return (
    <div className="flex w-full max-w-7xl flex-col space-y-6 rounded-3xl border border-[#AFAAAA] p-6 shadow-lg md:p-10">
      <AppointmentHeader />
      <AppointmentStepper currentStep={1} />

      <div className="flex-grow space-y-6 pt-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleDataChange('appointmentType', 'Presencial')}
            className={`flex items-center gap-2 rounded-lg border px-8 py-3 transition-all ${data.appointmentType === 'Presencial' ? 'border-[#734F96] bg-purple-50' : 'border-gray-300 bg-white'}`}>
            <span
              className={`font-semibold ${data.appointmentType === 'Presencial' ? 'text-[#734F96]' : 'text-gray-700'}`}>
              PRESENCIAL
            </span>
          </button>
          <button
            onClick={() => handleDataChange('appointmentType', 'Virtual')}
            className={`flex items-center gap-2 rounded-lg border px-8 py-3 transition-all ${data.appointmentType === 'Virtual' ? 'border-[#734F96] bg-purple-50' : 'border-gray-300 bg-white'}`}>
            <span
              className={`font-semibold ${data.appointmentType === 'Virtual' ? 'text-[#734F96]' : 'text-gray-700'}`}>
              VIRTUAL
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Especialidad</label>
          <div className="relative">
            <Controller
              name="specialityId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => handleDataChange('specialityId', e.target.value)} // Actualizar el estado local
                  value={data.specialityId} // Vincula el valor seleccionado con el estado de 'data'
                  className="w-full appearance-none rounded-lg border border-[#AFAAAA] bg-white p-4 uppercase focus:ring-2 focus:ring-[#734F96] focus:outline-none">
                  <option value="">Seleccionar especialidad</option>
                  {specialties.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <i className="pi pi-chevron-down text-gray-400"></i>
            </div>
          </div>
          {errors.specialityId && (
            <span className="text-sm text-red-500 normal-case">{errors.specialityId.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-semibold text-gray-600">Médico</label>
          <div className="relative">
            <Controller
              name="doctorId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  disabled={!data.specialityId} // Solo habilitar si hay una especialidad seleccionada
                  onChange={(e) => handleDoctorChange(e.target.value)} // Actualiza el estado y react-hook-form
                  value={data.doctorId} // Vincula el valor seleccionado con el estado de 'data'
                  className="w-full appearance-none rounded-lg border border-[#AFAAAA] bg-white p-4 uppercase focus:ring-2 focus:ring-[#734F96] focus:outline-none disabled:bg-gray-100">
                  <option value="">Seleccionar médico</option>
                  {availableDoctors.map((doc) => (
                    <option key={doc.medic_id} value={doc.medic_id}>
                      {doc.first_name} {doc.last_name}
                    </option>
                  ))}
                </select>
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <i className="pi pi-chevron-down text-gray-400"></i>
            </div>
          </div>

          {errors.doctorId && (
            <span className="text-sm text-red-500 normal-case">{errors.doctorId.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={onNext}
          className="rounded-full bg-[#734F96] px-10 py-3 font-bold text-white transition-colors hover:bg-[#5f3d7c]">
          SIGUIENTE
        </button>
      </div>
    </div>
  );
};
