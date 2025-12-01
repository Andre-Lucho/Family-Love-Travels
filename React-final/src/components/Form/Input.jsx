import useForm from '../../Hooks/useForm';

const Input = ({ id, label, type, error, ...props }) => {
  const { value, onChange } = useForm();

  return (
    <div className="my-4">
      <label htmlFor={id} className="">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="
        p-2 bg-purple-400 border-purple-400 border-2 rounded-md transition-all duration-200 hover:outline-0 hover:border-[#a42cff] hover:bg-purple-300 hover:shadow-[0_0_0_2px_#e9d4ff,0_0_0_2px_#b9a5cd] focus:outline-0 focus:border-[#a42cff] focus:bg-purple-300 focus:shadow-[0_0_0_2px_#e9d4ff,0_0_0_2px_#b9a5cd]"
        {...props}
      />
      {error && <p className="text-red-500 text-[.8rem] my-1">{error}</p>}
    </div>
  );
};

export default Input;
