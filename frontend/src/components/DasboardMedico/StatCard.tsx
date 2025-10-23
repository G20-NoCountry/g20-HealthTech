interface StatCardProps {
  icon: string;
  value: number;
  label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <div className="bg-white p-4 rounded-3xl border shadow-lg border-[#AFAAAA] flex items-center gap-4">
      <i className={`${icon} text-3xl text-[#734F96]`}></i>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
      </div>
    </div>
  );
};