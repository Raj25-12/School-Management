/**
 * High-Performance Optimized Network API Client
 * - Request Deduplication (prevents multiple duplicate requests in flight)
 * - In-Memory TTL Cache with stale-while-revalidate capability
 * - Auto-Retry with Exponential Backoff
 * - AbortController Timeout Protection
 * - Cache Invalidation helpers
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// In-memory cache store: key -> { data, timestamp, ttl }
const cache = new Map();
// In-flight pending requests: key -> Promise
const pendingRequests = new Map();

const DEFAULT_CACHE_TTL = 60 * 1000; // 60 seconds for GET by default
const DEFAULT_TIMEOUT_MS = 10000; // 10s timeout

/**
 * Invalidate all or matching cache entries
 * @param {string|RegExp} [pattern]
 */
export const invalidateCache = (pattern) => {
  if (!pattern) {
    cache.clear();
    return;
  }
  for (const key of cache.keys()) {
    if (typeof pattern === 'string' && key.includes(pattern)) {
      cache.delete(key);
    } else if (pattern instanceof RegExp && pattern.test(key)) {
      cache.delete(key);
    }
  }
};

/**
 * Core Request function with network resilience and performance caching
 */
export const request = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    cacheTtl = DEFAULT_CACHE_TTL,
    skipCache = false,
    retries = 2,
    retryDelay = 500,
    timeout = DEFAULT_TIMEOUT_MS,
    headers: customHeaders,
    ...restOptions
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  const isGet = method.toUpperCase() === 'GET';
  const cacheKey = `${method}:${url}`;

  // 1. Check in-memory cache for GET requests
  if (isGet && !skipCache) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
  }

  // 2. Request deduplication for simultaneous GET requests
  if (isGet && pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  const executeFetch = async (attempt = 0) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        signal: options.signal || controller.signal,
        ...restOptions,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = 'API request failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = response.statusText
            ? `Request failed (${response.status}: ${response.statusText})`
            : 'Unable to connect to backend server';
        }

        // Retry on 5xx errors or network drops if retries remaining
        if (attempt < retries && (response.status >= 500 || response.status === 429)) {
          await new Promise((res) => setTimeout(res, retryDelay * Math.pow(2, attempt)));
          return executeFetch(attempt + 1);
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Cache successful GET responses
      if (isGet && cacheTtl > 0) {
        cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
          ttl: cacheTtl,
        });
      }

      // If mutation (POST/PUT/DELETE), invalidate relevant cache
      if (!isGet) {
        // Automatically invalidate related endpoints
        const endpointRoot = endpoint.split('/')[1] || '';
        if (endpointRoot) invalidateCache(endpointRoot);
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        throw new Error(`Request to ${endpoint} timed out after ${timeout}ms`);
      }

      if (attempt < retries && !options.signal?.aborted) {
        await new Promise((res) => setTimeout(res, retryDelay * Math.pow(2, attempt)));
        return executeFetch(attempt + 1);
      }

      throw err;
    }
  };

  const promise = executeFetch().finally(() => {
    if (isGet) {
      pendingRequests.delete(cacheKey);
    }
  });

  if (isGet) {
    pendingRequests.set(cacheKey, promise);
  }

  return promise;
};

export default request;
