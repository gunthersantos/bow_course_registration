// src/components/Navbar.jsx
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex space-x-6 container mx-auto">
        <li><Link to="/">Home</Link></li>
        {!user && <li><Link to="/signup">Signup</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        {user && <li><Link to="/profile">Profile</Link></li>}
        {user?.role === 'student' && <li><Link to="/student/dashboard">Dashboard</Link></li>}
        {user?.role === 'admin' && <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>}
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user && <li><button onClick={logout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;