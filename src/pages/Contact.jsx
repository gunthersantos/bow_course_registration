// src/pages/Contact.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FormField from '../components/FormField';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const { sendMessage } = useContext(AuthContext);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(form);
    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
      <FormField label="Name" value={form.name} onChange={handleChange('name')} required />
      <FormField label="Email" type="email" value={form.email} onChange={handleChange('email')} required />
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Message</label>
        <textarea
          value={form.message}
          onChange={handleChange('message')}
          required
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">Send</button>
      {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
    </form>
  );
};

export default Contact;