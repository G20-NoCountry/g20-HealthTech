import { BrowserRouter } from 'react-router';
import { AppRouter } from './routes/router';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-dvh w-full bg-primary">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};
export default App;
