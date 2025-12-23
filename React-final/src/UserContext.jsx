import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api.js';

import useFetch from './components/Hooks/useFetch.jsx';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = useState(null);
  const { request, setData, setLoading, setError, data, loading, error } =
    useFetch();

  const navigate = useNavigate();

  useEffect(() => console.log(login), [login]);

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          await tokenValidate(token);
          await getUser(token);
        } catch (err) {
          const errorMessage = err.response.data.message || 'Erro desconhecido';
          setError(errorMessage);
          userLogout();
          throw err;
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    };
    autoLogin();
  }, []);

  const getUser = async (token) => {
    const { url, config } = USER_GET(token);
    try {
      const { response, json } = await request(url, 'get', {}, config);
      console.log(response);
      if (response && response.status === 200) {
        setData(json);
        setLogin(true);
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  const userLogin = async (username, password) => {
    const { url, body } = TOKEN_POST({ username, password });
    try {
      const { response, json } = await request(url, 'post', body);
      console.log(response);
      if ((response && response.status === 200) || response.status === 201) {
        const token = json.token;
        localStorage.setItem('token', token);
        await getUser(token);
        navigate('/userPage');
      }
    } catch (err) {
      const errorMessage =
        'Nome de usuário ou senha inválida. Verifique seus dados novamente' ||
        'Erro desconhecido';
      setError(errorMessage);
      setLogin(false);
      throw err;
    }
  };

  const tokenValidate = async (token) => {
    const { url, config } = TOKEN_VALIDATE_POST(token);
    try {
      const { response, json } = await request(url, 'post', {}, config); // {} = body(data) = vazio
      console.log(json);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const userLogout = () => {
    try {
      setLogin(null);
      setData(null);
      setLoading(false);
      localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/login');
      }, 0);
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
  };

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, login, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
