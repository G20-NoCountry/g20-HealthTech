import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';
import { Toast } from 'primereact/toast';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-primary min-h-dvh w-full p-3 uppercase md:p-10">
        <AppRouter />
      </div>
      <Toast />
    </BrowserRouter>
  );
};
export default App;
