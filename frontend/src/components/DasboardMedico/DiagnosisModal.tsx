import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import type { NextAppointment } from './NextAppointmentCard'; 

interface DiagnosisData {
  motivoConsulta: string;
  diagnosticoFinal: string;
  plan: string;
}

interface DiagnosisModalProps {
  appointmentData: NextAppointment; 
  onClose: () => void; 
}

export const DiagnosisModal = ({ appointmentData }: DiagnosisModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
 
  const [diagnosis, setDiagnosis] = useState<DiagnosisData>({
    motivoConsulta: appointmentData.reason || 'Control de Hipertensión..', // Usamos el motivo de la cita si existe
    diagnosticoFinal: 'I10 - Hipertensión Arterial Esencial (Primaria).', // Ejemplo
    plan: 'Continuar con Losartan..', // Ejemplo
  });

  // Fecha actual 
  const todayDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiagnosis(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log('Guardando diagnóstico:', diagnosis);
    setIsEditing(false); 
    alert('Cambios guardados (simulado).');
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
  };

  return (
    <div className="p-4 bg-[#F0E6F7] rounded-lg">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-300">
        <h3 className="text-lg font-semibold">Detalles del Diagnóstico</h3>
        <div>
          {!isEditing ? (
            <Button icon="pi pi-pencil" rounded text onClick={() => setIsEditing(true)} tooltip="Editar" />
          ) : (
            <Button icon="pi pi-times" rounded text severity="danger" onClick={handleCancelEdit} tooltip="Cancelar Edición" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="font-bold">FECHA:</p>
          <p>{todayDate}</p>
        </div>
        <div>
          <p className="font-bold">MOTIVO DE CONSULTA:</p>
          {isEditing ? (
            <InputTextarea 
              name="motivoConsulta"
              value={diagnosis.motivoConsulta} 
              onChange={handleInputChange} 
              rows={3} 
              className="w-full" 
              autoResize 
            />
          ) : (
            <p>{diagnosis.motivoConsulta}</p>
          )}
        </div>
        <div>
          <p className="font-bold">DIAGNÓSTICO FINAL (CIE-10):</p>
          {isEditing ? (
            <InputTextarea 
              name="diagnosticoFinal"
              value={diagnosis.diagnosticoFinal} 
              onChange={handleInputChange} 
              rows={3} 
              className="w-full" 
              autoResize 
            />
          ) : (
            <p>{diagnosis.diagnosticoFinal}</p>
          )}
        </div>
        <div>
          <p className="font-bold">PLAN:</p>
          {isEditing ? (
            <InputTextarea 
              name="plan"
              value={diagnosis.plan} 
              onChange={handleInputChange} 
              rows={3} 
              className="w-full" 
              autoResize 
            />
          ) : (
            <p>{diagnosis.plan}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <Button label="Guardar Cambios" icon="pi pi-check" onClick={handleSaveChanges} />
        </div>
      )}
    </div>
  );
};