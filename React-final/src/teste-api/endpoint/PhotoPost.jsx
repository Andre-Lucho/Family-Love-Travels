import { useState } from 'react';
import { endpoints } from './url.js';

const PhotoPost = () => {
  const [token, setToken] = useState('');

  const [nome, setNome] = useState('');
  const [peso, setpeso] = useState('');
  const [idade, setIdade] = useState('');
  const [img, setImg] = useState('');

  const { url_base, photo_post } = endpoints;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // key e valor
    formData.append('img', img);
    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };

    const formResponse = await fetch(url_base + photo_post, options);
    console.log(formResponse);
    const formJson = await formResponse.json();
    console.log(formJson);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-3 my-5 block">
      <label htmlFor="token">Token</label>
      <input
        type="text"
        id="token"
        value={token}
        onChange={({ target }) => setToken(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        value={nome}
        onChange={({ target }) => setNome(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <label htmlFor="peso">Peso</label>
      <input
        type="text"
        id="peso"
        value={peso}
        onChange={({ target }) => setpeso(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <label htmlFor="idade">Idade</label>
      <input
        type="text"
        id="idade"
        value={idade}
        onChange={({ target }) => setIdade(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <label className="mt-10 block" htmlFor="img">
        Postar Imagem
      </label>
      <input
        type="file"
        id="img"
        onChange={({ target }) => setImg(target.files[0])}
        className="mt-5 py-2 px-3 bg-red-400 border-2 border-red-700 text-black block"
      />
      <button className="mt-2 py-2 px-3 bg-blue-400 border-2 border-blue-500 ">
        Enviar
      </button>
    </form>
  );
};

export default PhotoPost;
