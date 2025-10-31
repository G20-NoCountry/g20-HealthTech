const SocialLinks = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-4xl">
      <a
        href="https://wa.me/541155963637"
        className="w-full md:w-1/2 px-4 py-2 flex items-center gap-2 hover:bg-green-50 rounded-3xl border border-[#AFAAAA] justify-center text-center"
      >
        <i className="pi pi-whatsapp text-green-600 text-lg"></i>
        <span>
          Contactanos por Whatsapp 
        </span>
      </a>

      <a
        href="https://www.linkedin.com/company/nocountrytalent/"
        className="w-full md:w-1/2 px-4 py-2 flex items-center gap-2 hover:bg-blue-50 rounded-3xl border border-[#AFAAAA] justify-center text-center"
      >
        <i className="pi pi-linkedin text-blue-600 text-xl"></i>
        <span>Encontranos en LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialLinks;
