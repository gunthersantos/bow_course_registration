// src/components/TermDropdown.jsx
const TermDropdown = ({ value, onChange }) => {
  const terms = ['Winter', 'Summer', 'Fall'];

  return (
    <select
      value={value}
      onChange={onChange}
      className="border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {terms.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
};

export default TermDropdown;