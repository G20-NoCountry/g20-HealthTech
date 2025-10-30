import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer id="contacto" >
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        <SocialLinks />
        <div className="w-full border-t border-gray-300 my-4"></div>
        <p className="text-sm text-gray-500"> © 2025 MedicApp</p>
      </div>
    </footer>
  );
};

export default Footer;
