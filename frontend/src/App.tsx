import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';
import { Toast } from 'primereact/toast';
import { addLocale } from 'primereact/api';
import { AuthProvider } from './contexts/AuthContext';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ],
  today: 'Hoy',
  clear: 'Limpiar',
});

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-primary font-kanit flex min-h-dvh w-full justify-center uppercase">
          <AppRouter />
        </div>
        <Toast />
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
