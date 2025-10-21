import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';
import { Toast } from 'primereact/toast';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-primary font-kanit min-h-dvh w-full uppercase">
        <AppRouter />
      </div>
      <Toast />
    </BrowserRouter>
  );
};
export default App;
