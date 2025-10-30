import type { PatientUser } from '../../api/models/user.interface';

interface PatientHeaderProps {
  patient: PatientUser;
}

export const PatientHeader = ({ patient }: PatientHeaderProps) => {
  const patientName = `${patient.first_name || ''} ${patient.last_name || ''}`.trim();
  const bloodGroup = patient.blood_type || 'No especificado';
  const condition = patient.cronicas_condition || 'No tiene ninguna condición registrada';
  const phone = patient.phone || 'No especificado';
  const email = patient.email || 'No especificado';
  const address = patient.location || 'No especificado';
  const allergies = patient.alergias || 'Ninguna alergia registrada';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-[#AFAAAA]">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{patientName}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm  mt-1">
            <span className='bg-[#E6D9F2]  px-2 py-0.5 rounded-full text-xs'>Grupo Sanguíneo: {bloodGroup}</span>
            <span className="bg-[#E6D9F2]  px-2 py-0.5 rounded-full text-xs">{condition}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
        <p className="flex items-center gap-2"><i className="pi pi-phone text-[#734F96]"></i> {phone}</p>
        <p className="flex items-center gap-2 truncate"><i className="pi pi-envelope text-[#734F96]"></i> {email}</p>
        <p className="flex items-center gap-2"><i className="pi pi-map-marker text-[#734F96]"></i> {address}</p>
      </div>
      {patient.alergias && (
          <div className="flex justify-center"> 
          <span className="border border-red-600  p-2 rounded-md flex items-center gap-2 ">
            <i className="pi pi-exclamation-circle text-red-600"></i> 
            <span>Alergias: {allergies}</span>
          </span>
        </div>
      )}
    </div>
  );
};