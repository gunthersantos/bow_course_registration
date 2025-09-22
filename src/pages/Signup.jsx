// src/pages/Signup.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import FormField from '../components/FormField';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', dob: '' });
  const [errors, setErrors] = useState({});
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    let err = {};
    if (!form.username) err.username = 'Username is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Invalid email';
    if (!form.password) err.password = 'Password is required';
    if (!form.dob) err.dob = 'Date of birth is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      signup(form);
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Student Signup</h1>
      <FormField label="Username" value={form.username} onChange={handleChange('username')} required error={errors.username} />
      <FormField label="Email" type="email" value={form.email} onChange={handleChange('email')} required error={errors.email} />
      <FormField label="Password" type="password" value={form.password} onChange={handleChange('password')} required error={errors.password} />
      <FormField label="Date of Birth" type="date" value={form.dob} onChange={handleChange('dob')} required error={errors.dob} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">Signup</button>
    </form>
  );
};

export default Signup;