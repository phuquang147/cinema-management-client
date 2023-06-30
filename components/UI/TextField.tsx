import { IconEye, IconEyeOff } from "@tabler/icons";
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type TextFieldProps = {
  type?: HTMLInputTypeAttribute;
  name?: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  error?: FieldError | undefined;
  inputClassName?: string;
  containerClassName?: string;
  multiple?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & (
  | (Partial<Record<"register", UseFormRegister<any>>> &
      Required<Record<"name", string>> &
      Required<Record<"error", FieldError | undefined>>)
  | (Partial<Record<"value", string>> &
      Required<Record<"onChange", (e: ChangeEvent<HTMLInputElement>) => void>>)
);

const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  name = "",
  label,
  placeholder = "",
  register,
  error,
  inputClassName,
  containerClassName,
  multiple = false,
  value = "",
  onChange,
}) => {
  const [insideType, setInsideType] = useState<HTMLInputTypeAttribute>("text");

  useEffect(() => {
    setInsideType(type);
  }, [type]);

  const handleToggleTextVisibility = () => {
    setInsideType((prevType) => {
      if (prevType === "text") return "password";
      return "text";
    });
  };

  return (
    <div className={`w-full flex flex-col items-start ${containerClassName}`}>
      {label && (
        <label className="text-base font-semibold text-gray-600 mb-2">
          {label}
        </label>
      )}
      <div className="w-full relative">
        {multiple ? (
          <textarea
            {...register?.(name)}
            className={`w-full outline-none px-6 py-2 rounded border-2 border-b-gray-200 dark:border-dark-bg-primary hover:border-primary focus:border-primary transition-colors duration-200 bg-white dark:bg-dark-bg-primary text-gray-text dark:text-light-text ${
              type === "password" && "pr-10"
            } ${inputClassName}`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={insideType}
            {...register?.(name)}
            // value={value}
            // onChange={onChange}
            className={`w-full outline-none px-6 py-2 rounded border-2 border-b-gray-200 dark:border-dark-bg-primary hover:border-primary focus:border-primary transition-colors duration-200 bg-white dark:bg-dark-bg-primary text-gray-text dark:text-light-text ${
              type === "password" && "pr-10"
            } ${inputClassName}`}
            placeholder={placeholder}
            multiple
          />
        )}
        {type === "password" && (
          <button
            onClick={handleToggleTextVisibility}
            className="absolute h-full w-10 text-white top-0 right-0 flex justify-center items-center"
          >
            {insideType === "password" ? <IconEye /> : <IconEyeOff />}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextField;
