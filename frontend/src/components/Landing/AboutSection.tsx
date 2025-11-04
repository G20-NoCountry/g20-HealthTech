const AboutSection = () => {
  return (
    <div>
      <div className="p-6 ">
        <h2 className="mb-2 text-xl flex  justify-center">“Tu salud más cerca que nunca”</h2>
        <p className="text-gray-700 flex  justify-center">
         Medic app te permite programar tus consultas
          médicas y elegir entre atención presencial o virtual, en segundos.
        </p>
      </div>
      <section className="my-8 mx-4 sm:mx-6 p-6 shadow-sm rounded-3xl border border-[#AFAAAA]">
        <h3 className="mb-3 text-lg font-semibold">Sobre nosotros</h3>
        <p className="mb-2 ">
          En Medic App entendemos que tu tiempo y tu salud son lo más importante.
        </p>
        <p className="mb-2 ">
          Por eso creamos una plataforma que te permite gestionar tus citas médicas de forma rápida
          y sin complicaciones.
        </p>
        <p className="">
          Nuestra misión es acompañarte en cada paso, acercando la atención médica de calidad a un
          solo clic.
        </p>
      </section>
    </div>
  );
};

export default AboutSection;
