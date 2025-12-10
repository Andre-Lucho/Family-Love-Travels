import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../Hooks/useForm';
import Input from '../Form/Input';
import Buttom from '../Form/Buttom';
import { UserContext } from '../../UserContext';
import Loading from '../Loading';

const LoginForm = () => {
  const { userLogin, error, loading, login } = useContext(UserContext);
  const username = useForm('');
  const password = useForm('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      try {
        await userLogin(username.value, password.value);
        console.log('Login ok');
      } catch (error) {
        console.error('Erro no login:', error);
      }
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
        {loading ? (
          <Buttom label={'Entrar'} disabled />
        ) : (
          <Buttom label={'Entrar'} />
        )}

        <Loading />
        {error && <span>{error}</span>}
      </form>
      <Link to="/login/register">Cadastre-se</Link>
      <Link to="/login/lost">Perdeu seu senha?</Link>
    </section>
  );
};

export default LoginForm;
