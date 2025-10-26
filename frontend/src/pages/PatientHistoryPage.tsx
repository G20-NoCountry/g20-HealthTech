import { useState, useEffect } from 'react';
import { PatientHeader } from '../components/PatientHistory/PatientHeader';
import { MedicalHistorySection } from '../components/PatientHistory/MedicalHistorySection';
import { getPatientById } from '../services/mockPatientData';
import type { Patient } from '../services/mockPatientData';

export const PatientHistoryPage = () => {
  const patientId = "p001"; // ID simulado - Cambia esto para ver otro paciente

  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    const data = getPatientById(patientId);
    if (data) {
      setPatientData(data);
    } else {
      console.error("Paciente no encontrado");
    }
  }, [patientId]);

  const handleDownloadPdf = () => {
    alert('Funcionalidad de descarga de PDF no implementada aún.');
    console.log('Descargar historial para:', patientData?.name);
  };

  if (!patientData) {
    return <div>Cargando datos del paciente...</div>; 
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