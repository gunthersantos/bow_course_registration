// src/components/ProgramCard.jsx
const ProgramCard = ({ program }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md mb-4">
      <h2 className="text-xl font-bold">{program.name}</h2>
      <p><strong>Code:</strong> {program.code}</p>
      <p><strong>Term:</strong> {program.term}</p>
      <p><strong>Description:</strong> {program.description}</p>
      <p><strong>Fees:</strong> Domestic ${program.fees.domestic}, International ${program.fees.international}</p>
    </div>
  );
};

export default ProgramCard;