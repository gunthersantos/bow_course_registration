// src/components/CourseCard.jsx
const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md mb-4">
      <h2 className="text-xl font-bold">{course.name}</h2>
      <p><strong>Code:</strong> {course.code}</p>
      <p><strong>Term:</strong> {course.term}</p>
      <p><strong>Description:</strong> {course.description}</p>
    </div>
  );
};

export default CourseCard;