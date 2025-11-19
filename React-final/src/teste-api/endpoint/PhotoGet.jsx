import { useState } from 'react';
import { endpoints } from './url.js';

const PhotoGet = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState('');
  const { url_base, photo_get } = endpoints;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formResponse = await fetch(`${url_base}${photo_get}/${id}`);
    console.log(formResponse);
    const formJson = await formResponse.json();
    console.log(formJson);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-3 my-5 block">
      <input
        type="text"
        value={id}
        onChange={({ target }) => setId(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <button className="mt-2 py-2 px-3 bg-blue-400 border-2 border-blue-500 ">
        Puxar
      </button>
    </form>
  );
};

export default PhotoGet;
