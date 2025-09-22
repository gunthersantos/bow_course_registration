// src/components/InfoBlock.jsx
const InfoBlock = ({ title, content }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default InfoBlock;