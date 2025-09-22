// src/pages/Profile.jsx
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import InfoBlock from '../components/InfoBlock';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <InfoBlock
        title="User Details"
        content={`Username: ${user?.username} | Role: ${user?.role} | Email: ${user?.email || 'N/A'} | DOB: ${user?.dob || 'N/A'}`}
      />
      {user?.role === 'student' && (
        <InfoBlock
          title="Registered Courses"
          content={Object.entries(user?.registeredCourses || {}).map(([term, codes]) => `${term}: ${codes.join(', ')}`).join(' | ')}
        />
      )}
    </div>
  );
};

export default Profile;