import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/common/Loader';

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  // Start active immediately from the very first frame on page reload / initial load
  const [isNavigating, setIsNavigating] = useState(true);
  const location = useLocation();
  const initialMount = useRef(true);

  // Initial load / reload transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigating(false);
      initialMount.current = false;
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  // Subsequent route navigation transition
  useEffect(() => {
    if (!initialMount.current) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.search]);

  // Instant feedback on any link clicks
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

  const startLoading = (text = '') => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingText('');
  };

  const withLoading = async (asyncFn, text = '') => {
    startLoading(text);
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
        loadingText,
        startLoading,
        stopLoading,
        withLoading,
      }}
    >
      {/* 
        Compact Dribbble Icon Morph Loader in the exact dead center of the screen
        with soft background blur running from the very start of page reload to end!
      */}
      {(isNavigating || isLoading) && (
        <Loader
          fullScreen
          size="md"
          variant="primary"
          text={loadingText || ''}
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
