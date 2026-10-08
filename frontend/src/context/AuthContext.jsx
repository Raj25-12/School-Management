import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

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
  updateUser: () => {},
  isAuthenticated: false,
};

export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);
  const [loading] = useState(false);

  // Sync user state on custom dispatch or storage changes
  useEffect(() => {
    const handleSync = () => {
      const stored = getStoredUser();
      if (stored) {
        setUser(stored);
      }
    };
    window.addEventListener('school_user_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('school_user_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

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
    window.dispatchEvent(new CustomEvent('school_user_updated', { detail: userData }));
  }, []);

  const updateUser = useCallback((userData) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...userData };
      try {
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    window.dispatchEvent(new CustomEvent('school_user_updated', { detail: userData }));
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
    window.dispatchEvent(new CustomEvent('school_user_updated', { detail: null }));
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: Boolean(user || token),
  }), [user, token, loading, login, logout, updateUser]);

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
      updateUser: () => {},
      isAuthenticated: Boolean(fallbackUser || fallbackToken),
    };
  }
  return context;
};

export default AuthContext;

