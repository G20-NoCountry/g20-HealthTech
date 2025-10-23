import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';
import { Toast } from 'primereact/toast';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-primary font-kanit flex min-h-dvh w-full justify-center uppercase">
        <AppRouter />
      </div>
      <Toast />
    </BrowserRouter>
  );
};
export default App;
