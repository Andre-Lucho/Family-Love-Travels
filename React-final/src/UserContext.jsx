import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api.js';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = async (token) => {
    const { url, config } = USER_GET(token);
    try {
      const UserRes = await axios.get(url, config);
      console.log(UserRes.data);
      setData(UserRes.data);
      setLogin(true);
    } catch (err) {
      console.log(err);
    }
  };

  const userLogin = async (username, password) => {
    const { url } = TOKEN_POST();
    try {
      setError(null);
      setLoading(true);
      const tokenRes = await axios.post(url, { username, password });
      // console.log(tokenRes.data);
      if (tokenRes.data) {
        const token = tokenRes.data.token;
        localStorage.setItem('token', token);
        getUser(token);
      }
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const tokenValidate = async (token) => {
    const { url, config } = TOKEN_VALIDATE_POST(token);
    try {
      const loginRes = await axios.post(url, {}, config);
      // console.log(loginRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const login = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          await tokenValidate(token);
          await getUser(token);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    login();
  }, [login]);

  const userLogout = async () => {
    setData(null);
    setError(null);
    setLogin(false);
    setLoading(false);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, login }}>
      {children}
    </UserContext.Provider>
  );
};
