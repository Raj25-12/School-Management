import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/common/Loader';

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Starts active immediately on initial site visit & browser reload
  const [isNavigating, setIsNavigating] = useState(true);
  const location = useLocation();
  const initialMount = useRef(true);

  // Initial visit & browser reload transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(false);
      initialMount.current = false;
    }, 420);

    return () => clearTimeout(timer);
  }, []);

  // Route navigation transition on every pathname or search change
  useEffect(() => {
    if (!initialMount.current) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 360);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.search]);

  // Immediate global interceptor for all internal link clicks (Navbar, Sidebar, Buttons, Cards)
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (
        target &&
        target.href &&
        target.href.startsWith(window.location.origin) &&
        !target.hasAttribute('download') &&
        target.target !== '_blank'
      ) {
        setIsNavigating(true);
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    return () => document.removeEventListener('click', handleAnchorClick, true);
  }, []);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const withLoading = async (asyncFn) => {
    startLoading();
    try {
      const result = await asyncFn();
      return result;
    } finally {
      stopLoading();
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        withLoading,
      }}
    >
      {/* 
        Global Icon Morph Loader (Dribbble shot 4397553).
        Dead center on screen with strong background blur + dimmed overlay.
        Disables background clicks while active.
      */}
      {(isNavigating || isLoading) && (
        <Loader
          fullScreen
          size="md"
          variant="primary"
        />
      )}

      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
