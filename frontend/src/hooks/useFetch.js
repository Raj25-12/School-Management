import { useState, useEffect, useCallback, useRef } from 'react';
import { request } from '../services/api';

/**
 * Enhanced useFetch hook with:
 * - In-memory caching & deduplication integration
 * - Automatic abort controller on unmount or URL switch
 * - Manual refetch capability
 * - Offline safety
 */
export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(endpoint));
  const [error, setError] = useState(null);

  // Store options in ref to avoid unnecessary re-triggers on inline objects
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      if (!endpoint) {
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      setLoading(true);
      setError(null);

      try {
        const result = await request(endpoint, {
          ...optionsRef.current,
          ...overrideOptions,
          signal: controller.signal,
        });
        setData(result);
        return result;
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error loading data');
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if (endpoint) {
      setLoading(true);
      request(endpoint, {
        ...optionsRef.current,
        signal: controller.signal,
      })
        .then((result) => {
          if (isMounted) {
            setData(result);
            setError(null);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted && err.name !== 'AbortError') {
            setError(err.message || 'Failed to fetch');
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
  };
};

export default useFetch;
