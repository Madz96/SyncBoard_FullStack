import { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{ backgroundColor: '#ef4444', color: 'white', textAlign: 'center', padding: '8px', position: 'sticky', top: 0, zIndex: 1000 }}>
      You are currently offline. Viewing cached data.
    </div>
  );
}
