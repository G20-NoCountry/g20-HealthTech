import ClinicalRecords from '../components/ClinicalRecords/ClinicalRecords';

export default function ClinicalRecordsPage() {
  return (
    <section className="flex flex-col gap-2 p-3 md:p-10">
      <h1 className="text-3xl font-semibold">Historial clínico</h1>
      <p className="text-accent font-medium">
        Consulta tus registros médicos anteriores y diagnósticos
      </p>
      <ClinicalRecords />
    </section>
  );
}
