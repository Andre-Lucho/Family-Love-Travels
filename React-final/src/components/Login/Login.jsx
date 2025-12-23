import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginRegister from './LoginRegister';
import LoginLost from './LoginLost';
import LoginReset from './LoginReset';
import { UserContext } from '../../UserContext';

const Login = () => {
  const { login } = useContext(UserContext);

  if (login) return <Navigate to="/user" />;
  return (
    <section>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/lost" element={<LoginLost />} />
          <Route path="/reset" element={<LoginReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
