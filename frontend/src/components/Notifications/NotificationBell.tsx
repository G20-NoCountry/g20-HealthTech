import { useState } from 'react';
import { Badge } from 'primereact/badge';
import { Sidebar } from 'primereact/sidebar';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  timestamp: string;
}

interface NotificationBellProps {
  notifications: Notification[];
}

export const NotificationBell = ({ notifications }: NotificationBellProps) => {
  const [visible, setVisible] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    console.log('Notificación clickeada:', notification.id);
    setVisible(false);
  };

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-purple-100/50">
        <i className="pi pi-bell p-overlay-badge text-[#734F96]" style={{ fontSize: '1.5rem' }}>
          {unreadCount > 0 && <Badge value={unreadCount} style={{ backgroundColor: '#734F96' }} />}
        </i>
      </button>
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        header={<h2 className="text-xl font-bold">Notificaciones</h2>}>
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`cursor-pointer rounded-lg p-4 transition-colors ${notification.read ? 'bg-gray-100 text-gray-500' : 'bg-purple-100 hover:bg-purple-200'}`}>
              <p className="font-medium">{notification.message}</p>
              <p className="mt-2 text-right text-xs text-gray-400">{notification.timestamp}</p>
            </div>
          ))}
        </div>
      </Sidebar>
    </>
  );
};
