import { useState, useEffect } from "react";
import ImgCarrusel0 from "../../assets/IMG-Carrusel.jpg";
import ImgCarrusel1 from "../../assets/IMG-carrusel1.png";
import ImgCarrusel2 from "../../assets/IMG-carrusel2.png";

const HeroCarousel = () => {
  const images = [ImgCarrusel0, ImgCarrusel1, ImgCarrusel2];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full h-[350px] overflow-hidden rounded-2xl shadow-lg">
      {/* Imagen actual */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* Gradiente sutil para contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent"></div>

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 b text-white rounded-full p-2 transition-all duration-200"
      >
        <i className="pi pi-angle-left text-2xl"></i>
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2  text-white rounded-full p-2 transition-all duration-200"
      >
        <i className="pi pi-angle-right text-2xl"></i>
      </button>

      {/* Indicadores sutiles abajo */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === i ? "bg-white/80 scale-110" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
