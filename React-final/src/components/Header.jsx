import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa';
import { LuDoorOpen } from 'react-icons/lu';

const Header = () => {
  return (
    <header className="w-full py-1 px-0 fixed z-20 top-0 shadow-sm bg-[#161c26]">
      <nav className="flex justify-between items-center mx-6 h-16 text-white .container">
        <Link to={'/'} aria-label="Home" className="py-2 px-0">
          {/* logo */}
          <FaRegPaperPlane className="mr-1.5 h-8 w-8" />
        </Link>
        <Link
          to={'/login'}
          className="
          flex
          items-center
          py-2 px-0          
          "
        >
          Login / Criar
          <LuDoorOpen className="ml-1.5 mb-1 h-6 w-8" />
        </Link>
        {/* login */}
      </nav>
    </header>
  );
};

export default Header;

/* bg-no-repeat --> impede que a imagem seja 'ladrilhada' - aplica 1 única vez!
o navegador tenta preencher todo o espaço desse elemento repetindo a imagem horizontal e verticalmente. É como se ele estivesse "ladrilhando" o fundo com a sua imagem.
Se o seu elemento for maior do que a imagem de fundo, a imagem será repetida infinitamente (em ambos os eixos X e Y) para cobrir toda a área. */
