// src/pages/StudentDashboard.jsx
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CourseContext } from '../contexts/CourseContext';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import TermDropdown from '../components/TermDropdown';
import SearchBar from '../components/SearchBar';
import InfoBlock from '../components/InfoBlock';

const StudentDashboard = () => {
  const { user, registerCourse } = useContext(AuthContext);
  const { courses } = useContext(CourseContext);
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState('Winter');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
    }
  }, [user, navigate]);

  const filteredCourses = courses.filter(
    (c) =>
      c.term === selectedTerm &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const registered = user?.registeredCourses[selectedTerm] || [];
  const registeredCourses = courses.filter((c) => registered.includes(c.code));

  const handleRegister = (courseCode) => {
    registerCourse(user.username, courseCode, selectedTerm);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <InfoBlock title="Profile" content={`Username: ${user?.username} | Email: ${user?.email} | DOB: ${user?.dob}`} />
      <div className="flex items-center mb-4">
        <label className="mr-2">Select Term:</label>
        <TermDropdown value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} />
      </div>
      <SearchBar onSearch={setSearchQuery} />
      <h2 className="text-xl font-bold mb-2">Available Courses for {selectedTerm}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((c) => (
          <div key={c.code}>
            <CourseCard course={c} />
            {!registered.includes(c.code) && (
              <button onClick={() => handleRegister(c.code)} className="bg-green-500 text-white p-2 rounded-lg mt-2 w-full">
                Register
              </button>
            )}
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2 mt-6">Registered Courses for {selectedTerm}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {registeredCourses.map((c) => <CourseCard key={c.code} course={c} />)}
      </div>
    </div>
  );
};

export default StudentDashboard;