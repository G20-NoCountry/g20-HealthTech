import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-primary min-h-dvh w-full p-3 uppercase md:p-10">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};
export default App;
