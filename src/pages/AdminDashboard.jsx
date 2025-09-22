// src/pages/AdminDashboard.jsx
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CourseContext } from '../contexts/CourseContext';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import FormField from '../components/FormField';
import InfoBlock from '../components/InfoBlock';

const AdminDashboard = () => {
  const { user, students, messages } = useContext(AuthContext);
  const { courses, addCourse, updateCourse, deleteCourse } = useContext(CourseContext);
  const navigate = useNavigate();
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({ code: '', name: '', term: '', startDate: '', endDate: '', description: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(form);
      setEditingCourse(null);
    } else {
      addCourse(form);
    }
    setForm({ code: '', name: '', term: '', startDate: '', endDate: '', description: '' });
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingCourse(course);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-bold mb-2">Manage Courses</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <FormField label="Code" value={form.code} onChange={handleChange('code')} required />
        <FormField label="Name" value={form.name} onChange={handleChange('name')} required />
        <FormField label="Term" value={form.term} onChange={handleChange('term')} required />
        <FormField label="Start Date" type="date" value={form.startDate} onChange={handleChange('startDate')} required />
        <FormField label="End Date" type="date" value={form.endDate} onChange={handleChange('endDate')} required />
        <FormField label="Description" value={form.description} onChange={handleChange('description')} required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
          {editingCourse ? 'Update Course' : 'Add Course'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {courses.map((c) => (
          <div key={c.code}>
            <CourseCard course={c} />
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleEdit(c)} className="bg-yellow-500 text-white p-2 rounded-lg flex-1">Edit</button>
              <button onClick={() => deleteCourse(c.code)} className="bg-red-500 text-white p-2 rounded-lg flex-1">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2">Students</h2>
      {students.map((s) => (
        <InfoBlock
          key={s.username}
          title={`Student: ${s.username}`}
          content={`Email: ${s.email} | Registered Courses: ${Object.entries(s.registeredCourses || {}).map(([term, codes]) => `${term}: ${codes.join(', ')}`).join(' | ')}`}
        />
      ))}
      <h2 className="text-xl font-bold mb-2 mt-6">Messages</h2>
      {messages.map((m, i) => (
        <InfoBlock key={i} title={`From: ${m.name} (${m.email})`} content={m.message} />
      ))}
    </div>
  );
};

export default AdminDashboard;