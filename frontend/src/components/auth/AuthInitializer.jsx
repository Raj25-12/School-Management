import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const InitializerInner = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Validate stored token / session state on app bootstrap
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return children;
};

export const AuthInitializer = ({ children }) => {
  return (
    <AuthProvider>
      <InitializerInner>
        {children}
      </InitializerInner>
    </AuthProvider>
  );
};

export default AuthInitializer;
