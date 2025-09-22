// src/contexts/CourseContext.jsx
import { createContext, useState } from 'react';
import { initialPrograms, initialCourses } from '../data';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [courses, setCourses] = useState(initialCourses);

  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(courses.map(c => (c.code === updatedCourse.code ? updatedCourse : c)));
  };

  const deleteCourse = (code) => {
    setCourses(courses.filter(c => c.code !== code));
  };

  return (
    <CourseContext.Provider value={{ programs, courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};