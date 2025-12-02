import { useState, useCallback } from 'react';

const useFetch = () => {
  const [fetchData, setFetchData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const request = useCallback(async (url, options) => {
    let response, json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      setResponse(response);
    } catch (erro) {
      json = null;
      setError(erro);
    } finally {
      setFetchData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    request,
    setFetchData,
    fetchData,
    setResponse,
    response,
    setError,
    error,
    setLoading,
    loading,
  };
};

export default useFetch;
