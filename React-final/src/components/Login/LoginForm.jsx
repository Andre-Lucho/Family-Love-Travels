import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useForm from '..//Hooks/useForm';
import Input from '../Form/Input';
import Buttom from '../Form/Buttom';
import { UserContext } from '../../UserContext';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';

import { FaRegPaperPlane } from 'react-icons/fa';

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

  //  max-md:grid-cols-1
  return (
    <section className="grid grid-cols-2 min-h-dvh mt-6 px-2 gap-6 [main-container]">
      <div className="row-span-3 bg-[url('../assets/grecia.jpg')] ml-3 bg-cover bg-center bg-no-repeat rounded-md [img-container]"></div>
      <div className="flex border-6 text-[#2f4657ff] rounded container-externo">
        <section className="flex-1 w-full">
          <div className="bg-[#1569cf] mx-6 p-6">
            <div className="min-w-[600px] justify-self-center mt-3.5 pr-3 [form-container]">
              <div className="flex items-center mb-10 pr-3 animeLeft [title-container]">
                <h1 className="font-secundary leading-1 text-4xl relative z-20 text-dark-blue">
                  Login
                </h1>
                <FaRegPaperPlane className="absolute z-10 block w-4 h-4 left-22 top-px text-[#5a6621]" />
              </div>
              <form onSubmit={handleSubmit} className="mb-6">
                <Input
                  label={'Usuário'}
                  type={'text'}
                  id={'username'}
                  {...username}
                />
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
                <Error error={error} />
              </form>
              <Link
                to="/login/lost"
                className="inline-block py-2 pr-3 text-[#7d7d7d] leading-1 after:inline-block after:h-0.5 after:w-full after:bg-current"
              >
                Perdeu seu senha?
              </Link>
              <div className="pr-3 mt-6 [register-container]">
                <p className="mt-2 mb-5">Ainda não possui cadastro?</p>
                <Link
                  to="/login/register"
                  className="min-w-25 py-3 px-5 mb-4 bg-[#4799fd] text-dark-blue rounded-md cursor-pointer transition-shadow duration-100 hover:outline-0 hover:shadow-[0_0_0_2px_#0664d8,0_0_0_4px_#0161d5] focus:outline-0 focus:shadow-[0_0_0_2px_#0664d8,0_0_0_4px_#0161d5] disabled:opacity-25"
                >
                  Cadastre-se
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default LoginForm;
