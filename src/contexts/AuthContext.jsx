// src/contexts/AuthContext.jsx
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([
    { username: 'admin', password: 'admin', role: 'admin' }
  ]);
  const [messages, setMessages] = useState([]);

  const signup = (data) => {
    const newStudent = { ...data, role: 'student', registeredCourses: {} };
    setStudents([...students, newStudent]);
  };

  const login = (username, password) => {
    const foundStudent = students.find(s => s.username === username && s.password === password);
    if (foundStudent) {
      setUser(foundStudent);
      return foundStudent;
    }
    const foundAdmin = admins.find(a => a.username === username && a.password === password);
    if (foundAdmin) {
      setUser(foundAdmin);
      return foundAdmin;
    }
    return null;
  };

  const logout = () => setUser(null);

  const registerCourse = (studentUsername, courseCode, term) => {
    setStudents(students.map(s => {
      if (s.username === studentUsername) {
        if (!s.registeredCourses[term]) s.registeredCourses[term] = [];
        if (!s.registeredCourses[term].includes(courseCode)) {
          s.registeredCourses[term].push(courseCode);
        }
      }
      return s;
    }));
  };

  const sendMessage = (msg) => {
    setMessages([...messages, msg]);
  };

  return (
    <AuthContext.Provider value={{ user, students, signup, login, logout, registerCourse, messages, sendMessage }}>
      {children}
    </AuthContext.Provider>
  );
};