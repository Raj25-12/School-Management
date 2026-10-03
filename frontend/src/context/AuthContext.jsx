import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

const getStoredToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch {
    return null;
  }
};

const defaultAuthContext = {
  user: null,
  token: null,
  loading: false,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);
  const [loading] = useState(false);

  const login = useCallback((userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    if (userData) {
      try {
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (e) {
        console.error(e);
      }
    }
    if (userToken) {
      try {
        localStorage.setItem('token', userToken);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (e) {
      console.error(e);
    }
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
    const fallbackUser = getStoredUser();
    const fallbackToken = getStoredToken();
    return {
      user: fallbackUser,
      token: fallbackToken,
      loading: false,
      login: () => {},
      logout: () => {},
      isAuthenticated: Boolean(fallbackUser || fallbackToken),
    };
  }
  return context;
};

export default AuthContext;

