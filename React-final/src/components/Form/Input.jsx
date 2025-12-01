import useForm from '../Hooks/useForm';

const Input = ({ id, label, type, error, ...props }) => {
  const { value, onChange } = useForm();

  return (
    <div className="my-4">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        className="p-1 border-purple-400 border-2 rounded-md"
        {...props}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Input;
