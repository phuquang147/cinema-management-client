import { IconEye, IconEyeOff } from "@tabler/icons";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type TextFieldProps = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError | undefined;
  inputClassName?: string;
  containerClassName?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  name,
  label,
  placeholder = "",
  register,
  error,
  inputClassName,
  containerClassName,
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
        <input
          type={insideType}
          {...register(name)}
          className={`w-full outline-none px-6 py-2 rounded hover:outline hover:outline-primary focus:outline focus:outline-primary transition-all duration-200 ${
            type === "password" && "pr-10"
          } ${inputClassName}`}
          placeholder={placeholder}
        />
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
