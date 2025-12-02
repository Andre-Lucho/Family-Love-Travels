import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import useLocalStorage from '../../Hooks/useLocalStorage';

import Input from '../Form/Input';
import Buttom from '../Form/Buttom';
import { TOKEN_POST, USER_GET } from '../../api.js';

const LoginForm = () => {
  const username = useForm('');
  const password = useForm('');
  const tokenFetch = useFetch();
  const userFetch = useFetch();
  const [local, setLocal] = useLocalStorage('token', '');

  useEffect(() => {
    if (local) getUser(local);
  }, [local]);

  useEffect(() => {
    if (
      tokenFetch.response &&
      tokenFetch.fetchData &&
      tokenFetch.fetchData.token
    )
      setLocal(tokenFetch.fetchData.token);
  }, [userFetch.response, tokenFetch.fetchData]);

  useEffect(() => console.log(userFetch.fetchData), [userFetch.fetchData]);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    userFetch.request(url, options);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      tokenFetch.request(url, options);
    } else {
      console.log('Formulário inválido. Corrija os erros.');
    }
  };

  return (
    <section className="my-2">
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label={'Usuário'} type={'text'} id={'username'} {...username} />
        <Input
          label={'Senha'}
          type={'password'}
          id={'password'}
          {...password}
        />
        <Buttom label={'Entrar'} />
      </form>
      <Link to="/login/register">Cadastre-se</Link>
      <Link to="/login/lost">Perdeu seu senha?</Link>
    </section>
  );
};

export default LoginForm;
