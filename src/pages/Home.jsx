// src/pages/Home.jsx
import { useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import ProgramCard from '../components/ProgramCard';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const { programs, courses } = useContext(CourseContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Programs and Courses</h1>
      <h2 className="text-xl font-bold mb-2">Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((p) => <ProgramCard key={p.code} program={p} />)}
      </div>
      <h2 className="text-xl font-bold mb-2 mt-6">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => <CourseCard key={c.code} course={c} />)}
      </div>
    </div>
  );
};

export default Home;