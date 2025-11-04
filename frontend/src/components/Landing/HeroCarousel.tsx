import { useState, useEffect } from 'react';
import ImgCarrusel0 from '../../assets/IMG-carrousel-1.jpg';
import ImgCarrusel1 from '../../assets/IMG-carrousel-2.jpg';
import ImgCarrusel2 from '../../assets/IMG-carrousel-3.jpg';

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
    <section className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-2xl shadow-lg ">
      {/* Imagen actual */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="h-full w-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* Gradiente sutil para contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent"></div>

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        aria-label="Prev Slide"
        className="b absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-2 text-white transition-all duration-200">
        <i className="pi pi-angle-left text-2xl"></i>
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-2 text-white transition-all duration-200">
        <i className="pi pi-angle-right text-2xl"></i>
      </button>

      {/* Indicadores sutiles abajo */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === i ? 'scale-110 bg-white/80' : 'bg-white/40'
            }`}></div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
