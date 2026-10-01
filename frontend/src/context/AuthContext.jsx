import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const [loading] = useState(false);

  const login = useCallback((userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    if (userToken) {
      localStorage.setItem('token', userToken);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: Boolean(user || token),
  }), [user, token, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
