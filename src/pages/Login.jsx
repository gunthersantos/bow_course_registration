// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import FormField from '../components/FormField';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = login(username, password);
    if (loggedUser) {
      navigate(loggedUser.role === 'student' ? '/student/dashboard' : '/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <FormField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <FormField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">Login</button>
    </form>
  );
};

export default Login;