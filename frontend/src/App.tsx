import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';
import { Toast } from 'primereact/toast';

const App = () => {

  return (
    <BrowserRouter>
        <AppRouter />
      <Toast />
    </BrowserRouter>
  );
};
export default App;
