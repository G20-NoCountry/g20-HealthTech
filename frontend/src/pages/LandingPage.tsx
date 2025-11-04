import Navbar from '../components/Landing/LandingNavbar';
import HeroCarousel from '../components/Landing/HeroCarousel';
import AboutSection from '../components/Landing/AboutSection';
import SpecialistsSection from '../components/Landing/SpecialistsSection';
import Footer from '../components/Landing/Footer';

const LandingPage = () => {
  return (
    <div className="">
      <Navbar />
      <HeroCarousel />
      <AboutSection />
      <SpecialistsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
