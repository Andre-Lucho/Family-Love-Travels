import { useState } from 'react';
import { endpoints } from './url.js';

const TokenPost = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const { url_base, token_post } = endpoints;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: devo passar como string
      body: JSON.stringify({ username, password }),
    };

    const formResponse = await fetch(url_base + token_post, options);
    console.log(formResponse);
    const formJson = await formResponse.json();
    console.log(formJson);
    setToken(formJson.token);
    return formJson;
  };

  return (
    <form onSubmit={handleSubmit} className="mx-3 my-5">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        className="my-3 block border-2 border-blue-500"
      />
      <button className="mt-2 py-2 px-3 bg-blue-400 border-2 border-blue-500 ">
        Enviar
      </button>
      <p style={{ wordBreak: 'break-all', marginTop: '15px' }}>{token}</p>
    </form>
  );
};

export default TokenPost;
