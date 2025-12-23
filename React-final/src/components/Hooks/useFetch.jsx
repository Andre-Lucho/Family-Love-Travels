import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method, body, config) => {
    let res;
    try {
      setError(null);
      setLoading(true);
      res = await axios({ url, method, data: body, ...config });
      setData(res.data);
      return { response: res, json: res.data };
    } catch (err) {
      setData(null);
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      return { response: msg, json: null };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    request,
    setData,
    data,
    setError,
    error,
    setLoading,
    loading,
  };
};

export default useFetch;
