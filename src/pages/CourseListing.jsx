// src/pages/CourseListing.jsx
import { useContext, useState } from 'react';
import { CourseContext } from '../contexts/CourseContext';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';

const CourseListing = () => {
  const { courses } = useContext(CourseContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Course Listing</h1>
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((c) => <CourseCard key={c.code} course={c} />)}
      </div>
    </div>
  );
};

export default CourseListing;