// src/hooks/useApi.js
import { useState, useEffect } from 'react';

export const useApi = (apiFunction, params = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(params);
        if (isMounted) {
          setData(result.data || result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};

export const useApiMutation = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const mutate = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await apiFunction(data);
      setSuccess(true);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { mutate, loading, error, success, reset };
};
