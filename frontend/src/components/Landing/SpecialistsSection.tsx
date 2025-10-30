import { Link } from "react-router";
import medica from "../../assets/Dra. Maria lopez.png"

const SpecialistsSection = () => {
  return (
    <section id="especialistas" className="rounded-3xl border border-[#AFAAAA] p-6 my-8 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-md">
        <h3 className="text-2xl font-bold text-[#734F96] mb-2">
          Encuentra a tu especialista y pide una cita
        </h3>
        <p className="text-gray-700 mb-4">
          15.000 profesionales están aquí para ayudarte
        </p>
        <Link
          to="/login"
          className="bg-[#E8DEF8] text-[#734F96] px-5 py-2 rounded-lg font-semibold hover:bg-purple-300 transition-all"
        >
          VER ESPECIALISTAS
        </Link>
      </div>

      <img
        src={medica}
        alt="Doctora"
        className="w-64 h-64 rounded-full object-cover mt-6 md:mt-0 shadow-lg"
      />
    </section>
  );
};

export default SpecialistsSection;
