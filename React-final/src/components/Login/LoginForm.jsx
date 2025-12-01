import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import useForm from '../Hooks/useForm';
import useFetch from '../Hooks/useFetch';
import { useEffect } from 'react';
import Buttom from '../Form/Buttom';

const LoginForm = () => {
  const username = useForm('');
  const password = useForm('');

  const { request, response, fetchData } = useFetch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const usernameValid = username.validate();
    const passwordValid = password.validate();

    if (usernameValid && passwordValid) {
      const requestData = {
        url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        },
      };

      const { url, options } = requestData;
      request(url, options);
    } else {
      console.log('Formulário inválido. Corrija os erros.');
    }
  };

  useEffect(() => console.log(fetchData), [fetchData]);

  return (
    <section className="m-2">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label={'Usuário'} type={'text'} id={'username'} {...username} />
        <Input
          label={'Senha'}
          type={'password'}
          id={'password'}
          {...password}
        />
        <Buttom />
      </form>
      <Link to="/login/register">Cadastre-se</Link>
      <Link to="/login/lost">Perdeu seu senha?</Link>
    </section>
  );
};

export default LoginForm;
