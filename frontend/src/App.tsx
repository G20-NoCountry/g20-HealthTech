import { BrowserRouter } from 'react-router';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { AppRouter } from './routes/router';

const App = () => {
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
    });
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-dvh items-center justify-center">
        <Toast ref={toast} />
        <Button onClick={show} label="Show" />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};
export default App;
