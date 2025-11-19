import { useState } from 'react';
import { endpoints } from './url.js';

const UserPost = () => {
  // const [form, setForm] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { url_base, user_post } = endpoints;

  // const handleForm = ({ target }) => {
  //   const { id, value } = target;
  //   setForm({ ...form, [id]: value });
  //
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: devo passar como string
      body: JSON.stringify({ username, email, password }),
    };

    const formResponse = await fetch(url_base + user_post, options);
    console.log(formResponse);
    const formJson = await formResponse.json();
    console.log(formJson);
  };

  // const { username, email, password } = form;

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
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
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
    </form>
  );
};

export default UserPost;
