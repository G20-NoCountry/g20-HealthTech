import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-accent mb-4 text-6xl font-bold">404</h1>
      <p className="mb-6 text-lg text-gray-600">La página que buscas no existe.</p>
      <Link
        to="/"
        className="bg-accent hover:bg-accent/90 rounded-xl px-5 py-2 font-semibold text-white transition">
        Volver al inicio
      </Link>
    </div>
  );
};
