import { ChangeEvent } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type ComboBoxProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  error?: FieldError | undefined;
  className?: string;
  containerClassName?: string;
  options: { label: string; value: string }[] | string[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
} & (
  | (Partial<Record<"register", UseFormRegister<any>>> &
      Required<Record<"name", string>> &
      Required<Record<"error", FieldError | undefined>>)
  | (Partial<Record<"value", string>> &
      Required<Record<"onChange", (e: ChangeEvent<HTMLSelectElement>) => void>>)
);

const ComboBox: React.FC<ComboBoxProps> = ({
  name = "",
  label,
  placeholder = "",
  register,
  error,
  className,
  containerClassName,
  options,
  value,
  onChange,
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
        className={`w-full outline-none px-6 py-2 rounded border-2 border-gray-200 dark:border-dark-bg-primary hover:border-primary focus:border-primary bg-white dark:bg-dark-bg-primary text-gray-text dark:text-light-text transition-colors duration-200 ${className}`}
        {...register?.(name)}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={typeof option === "string" ? option : option.value}>
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default ComboBox;
