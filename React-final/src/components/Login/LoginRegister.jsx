import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';

import axios from 'axios';
import { USER_POST } from '../../api.js';

import Input from '../Form/Input';
import Button from '../Form/Buttom';
import useForm from '../Hooks/useForm.jsx';
import useFetch from '../Hooks/useFetch.jsx';

const LoginRegister = () => {
  const [id, setId] = useState(null);

  const username = useForm('');
  const email = useForm('email');
  const password = useForm('');

  const { userLogin } = useContext(UserContext);
  const { request, loading, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      console.log('ok');
      const { url, body } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      try {
        const response = await axios.post(url, body, {});
        if ((response && response.status === 200) || response.status === 201) {
          setId(response.data);
          console.log('chamando userLogin()...');
          await userLogin(username.value, password.value);
        }
      } catch (err) {
        console.log(err.response);
        throw err;
      }
    }
  };

  return (
    <section className="animeLeft">
      <h1 className="font-secundary leading-1 text-4xl relative z-20 text-[#4799fd]">
        Cadastre-se
      </h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type={'text'} id={'username'} {...username} />
        <Input label="Email" type={'email'} id={'email'} {...email} />
        <Input label="Senha" type={'password'} id={'password'} {...password} />
        <Button label="Cadastrar" />
      </form>
    </section>
  );
};

export default LoginRegister;
