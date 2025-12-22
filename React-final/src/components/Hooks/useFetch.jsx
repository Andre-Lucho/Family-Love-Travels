import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method, body = null, config = {}) => {
    let res;
    try {
      setError(null);
      setLoading(true);
      res = await axios({ url, method, data: body, config });
      setData(res.data);
      return { response: res, json: res.data };
    } catch (erro) {
      setData(null);
      setError(erro.message);
      return { response: null, json: null };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    request,
    data,
    error,
    loading,
  };
};

export default useFetch;
