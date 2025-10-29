import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PatientHeader } from '../components/PatientHistory/PatientHeader';
import { MedicalHistorySection } from '../components/PatientHistory/MedicalHistorySection';
import { api } from '../api';
import type { PatientUser } from '../api/models/user.interface';

export const PatientHistoryPage = () => {
  const { id: patientIdFromParams } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientIdFromParams) {
        navigate('/dashboardMedico', { replace: true });
        return;
      }

      try {
        setLoading(true);
        const res = await api.users.getPatientById(Number(patientIdFromParams));
        if (res.success && res.data) {
          setPatientData(res.data);
          setError(null);
        } else {
          setError('Paciente no encontrado');
          setPatientData(null);
        }
      } catch (err: any) {
        console.error('Error al obtener datos del paciente:', err);
        setError('Error al cargar los datos del paciente');
        setPatientData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientIdFromParams, navigate]);

  const handleDownloadPdf = () => {
    alert('Funcionalidad de descarga de PDF no implementada aún.');
    console.log('Descargar historial para:', patientData ? `${patientData.first_name} ${patientData.last_name}` : '');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <i className="pi pi-spin pi-spinner text-4xl text-[#734F96] mb-4"></i>
          <p className="text-gray-600">Cargando datos del paciente...</p>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Paciente no encontrado'}</p>
          <button
            onClick={() => navigate('/dashboardMedico')}
            className="rounded-lg bg-[#734F96] text-white px-6 py-2 hover:bg-[#EABAFF] transition-colors">
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <PatientHeader patient={patientData} />
        <MedicalHistorySection />
        
        <div className="mt-8 flex justify-end"> 
          <button 
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-[#EABAFF] transition-colors"
          >
            <i className="pi pi-download"></i> 
            <span>Descargar Historial</span>
          </button>
        </div>
      </main>
    </div>
  );
};