import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import Loader from '../components/common/Loader';

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const startLoading = useCallback((text = '') => {
    setLoadingText(text);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingText('');
  }, []);

  const withLoading = useCallback(async (asyncFn, text = '') => {
    startLoading(text);
    try {
      const result = await asyncFn();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  const value = useMemo(() => ({
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    withLoading,
  }), [isLoading, loadingText, startLoading, stopLoading, withLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && (
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
    return {
      isLoading: false,
      loadingText: '',
      startLoading: () => {},
      stopLoading: () => {},
      withLoading: async (fn) => fn(),
    };
  }
  return context;
};

export default LoadingContext;
