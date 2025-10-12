import { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

function App() {
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  };

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Toast ref={toast} />
      <Button onClick={show} label="Show" />
    </div>
  );
}

export default App;
