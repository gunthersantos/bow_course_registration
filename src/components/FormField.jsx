// src/components/FormField.jsx
const FormField = ({ label, type = 'text', value, onChange, required = false, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;