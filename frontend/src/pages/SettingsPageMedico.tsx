import { SettingsSectionMedico } from '../components/Ajustes/SettingsSectionMedico';

export default function SettingsPage() {
  return (
    <main className="p-4 md:p-8">
      <div className="rounded-3xl border border-[#AFAAAA] shadow-lg md:p-10 max mx-auto p-6">
            <SettingsSectionMedico />
      </div>
    </main>
  );
}