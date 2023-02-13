// ==============================================

const Input = ({ label, id, placeholder, type, name, onChange }) => {
  return (
    <div>
      <label for={id} class="block text-sm font-medium text-gray-700">{ label }</label>
      <div class="mt-1">
        <input 
          type={type}
          name={name} 
          id={id} 
          onChange={onChange}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

// ==============================================

export default Input;