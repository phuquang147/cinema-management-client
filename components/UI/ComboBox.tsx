import { FieldError, UseFormRegister } from "react-hook-form";

type ComboBoxProps = {
  name: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError | undefined;
  className?: string;
  containerClassName?: string;
  options: { label: string; value: string }[];
};

const ComboBox: React.FC<ComboBoxProps> = ({
  name,
  label,
  placeholder = "",
  register,
  error,
  className,
  containerClassName,
  options,
}) => {
  return (
    <div className={`w-full flex flex-col items-start ${containerClassName}`}>
      {label && (
        <label className="text-base font-semibold text-gray-600 mb-2">
          {label}
        </label>
      )}
      <select
        placeholder={placeholder}
        className={`w-full outline-none px-6 py-2 rounded ${className}`}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default ComboBox;
