import { Link } from 'react-router';
import medica from '../../assets/dra-maria-lopez.jpg';

const SpecialistsSection = () => {
  return (
    <section
      id="especialistas"
      className="my-8 mx-4 sm:mx-6  flex flex-col items-center justify-between rounded-3xl border border-[#AFAAAA] p-6 md:flex-row">
      <div className="max-w-md">
        <h3 className="mb-2 text-2xl font-bold text-[#734F96]">
          Encuentra a tu especialista y pide una cita
        </h3>
        <p className="mb-4 text-gray-700">15.000 profesionales están aquí para ayudarte</p>
        <Link
          to="/login"
          className="rounded-lg bg-[#E8DEF8] px-5 py-2 font-semibold text-[#734F96] transition-all hover:bg-purple-300">
          VER ESPECIALISTAS
        </Link>
      </div>

      <img
        src={medica}
        alt="Doctora"
        className="mt-6 h-64 w-64 rounded-full object-cover shadow-lg md:mt-0"
      />
    </section>
  );
};

export default SpecialistsSection;
