import { useState, useEffect } from 'react';

/**
 * Hook to track online/offline network status and connection speed info
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline };
};

export default useNetworkStatus;
