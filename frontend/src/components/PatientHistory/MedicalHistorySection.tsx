import historyData from '../../services/MedicalHistory.json';

interface HistorySectionItem {
  subtitle?: string;
  items: string[];
}

interface HistoryData {
  criticalAntecedents: { title: string; items: string[] };
  personalAntecedents: { title: string; sections: HistorySectionItem[] };
  familyAntecedents: { title: string; items: string[] };
}

const SimpleSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className=" p-4 rounded-lg shadow-sm border border-[#AFAAAA] mb-4">
    <h3 className="font-bold text-gray-700 mb-2">{title}</h3>
    <ul className="list-none space-y-1 text-sm text-gray-600">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const PersonalSection = ({ title, sections }: { title: string; sections: HistorySectionItem[] }) => (
  <div className=" p-4 rounded-lg shadow-sm border border-[#AFAAAA] mb-4">
    <h3 className="font-bold text-gray-700 mb-2">{title}</h3>
    <div className="space-y-3">
      {sections.map((section, index) => (
        <div key={index}>
          {section.subtitle && 
          <h4 className="font-semibold text-sm text-gray-700">{section.subtitle}</h4>}
          <ul className="list-none space-y-1 text-sm text-gray-600 pl-2">
            {section.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export const MedicalHistorySection = () => {
  const data = historyData as HistoryData; 

  return (
    <div>
      <h2 className="text-xl p-2 font-semibold mb-4 bg-[#E8DEF8] ">HISTORIAL MÉDICO</h2>
      <SimpleSection title={data.criticalAntecedents.title} items={data.criticalAntecedents.items} />
      <PersonalSection title={data.personalAntecedents.title} sections={data.personalAntecedents.sections} />
      <SimpleSection title={data.familyAntecedents.title} items={data.familyAntecedents.items} />
    </div>
  );
};