import { Avatar } from "primereact/avatar";
import Logo from '../../assets/logo.png';
import { Link } from "react-router";


const LandingNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4  ">
      <div className="flex items-center space-x-2">
          <Avatar image={Logo} shape="circle" />
        <h1 className="text-xl font-semibold text-accent">MEDIC APP</h1>
      </div>
      <div className="flex space-x-4">
        <a href="#especialistas" className="rounded-3xl border shadow-lg border-[#AFAAAA] px-3 py-1  hover:bg-purple-300 ">ESPECIALISTAS</a>
        <a href="#contacto" className=" rounded-3xl border shadow-lg border-[#AFAAAA] px-3 py-1  hover:bg-purple-300 ">CONTACTO</a>
         <Link
          to="/login"
          className="rounded-3xl border shadow-lg border-[#AFAAAA] px-3 py-1  hover:bg-purple-300 transition"
        >
          INICIO SESIÓN
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
