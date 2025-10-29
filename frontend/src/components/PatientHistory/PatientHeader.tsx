import type { Patient } from '../../services/mockPatientData';

interface PatientHeaderProps {
  patient: Patient;
}

export const PatientHeader = ({ patient }: PatientHeaderProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-[#AFAAAA]">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm  mt-1">
            <span className='bg-[#E6D9F2]  px-2 py-0.5 rounded-full text-xs'>{patient.age} años</span>
            <span className='bg-[#E6D9F2]  px-2 py-0.5 rounded-full text-xs'>Grupo Sanguíneo: {patient.bloodGroup}</span>
            <span className="bg-[#E6D9F2]  px-2 py-0.5 rounded-full text-xs">{patient.condition}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
        <p className="flex items-center gap-2"><i className="pi pi-phone text-[#734F96]"></i> {patient.phone}</p>
        <p className="flex items-center gap-2 truncate"><i className="pi pi-envelope text-[#734F96]"></i> {patient.email}</p>
        <p className="flex items-center gap-2"><i className="pi pi-map-marker text-[#734F96]"></i> {patient.address}</p>
      </div>
      {patient.allergiesSummary && (
          <div className="flex justify-center"> 
          <span className="border border-red-600  p-2 rounded-md flex items-center gap-2 ">
            <i className="pi pi-exclamation-circle text-red-600"></i> 
            <span>Alergias: {patient.allergiesSummary}</span>
          </span>
        </div>
      )}
    </div>
  );
};