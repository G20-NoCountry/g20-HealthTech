import MedicalRecords from '../components/MedicalRecords/MedicalRecords';

export default function MedicalRecordsPage() {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">Historial médico</h1>
      <p className="text-subtitle font-medium">
        Consulta tus registros médicos anteriores y diagnósticos
      </p>
      <MedicalRecords />
    </section>
  );
}
