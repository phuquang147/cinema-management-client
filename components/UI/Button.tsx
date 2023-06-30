import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "contained" | "icon" | "outlined";
  children?: ReactNode | undefined;
  to?: string;
  onClick?: () => void;
  isBlock?: boolean;
  disabled?: boolean;
  className?: string;
  outlinedClassName?: string;
  href?: string;
  target?: string;
  width?: string;
};

const general = "disabled:cursor-not-allowed transition-colors duration-200";

const text = "text-base font-bold font-public-sans";

const padding = {
  primary: "py-3 px-8",
  contained: "py-3 px-8",
  icon: "py-2 px-2",
  outlined: "py-[3px] px-[3px]",
};

const color = {
  primary: "text-white",
  contained: "text-white",
  icon: "text-primary text-2xl",
  outlined: "text-primary",
};

const backgroundColors = {
  primary:
    "bg-gradient-to-r from-light-pink to-light-red shadow-red hover:brightness-110 transition-all duration-200 active:shadow-none",
  contained: "bg-primary",
  icon: "bg-transparent",
  outlined:
    "bg-gradient-to-r from-light-pink to-light-red shadow-red hover:brightness-110 transition-all duration-200 active:shadow-none",
};

const border = {
  primary: "outline-none rounded",
  contained:
    "outline-none rounded focus:ring-1 focus:ring-primary ring-offset-2",
  icon: "border-primary text-primary hover:bg-primary hover:text-white outline-none rounded-full border-[1px] focus:ring-1 focus:ring-primary ring-offset-2",
  outlined: "outline-none rounded",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  to,
  onClick,
  className = "",
  outlinedClassName = "",
  disabled = false,
  href,
  target,
  isBlock = false,
  width,
}) => {
  const disabledStyle = disabled
    ? "opacity-50 cursor-not-allowed"
    : "transition ease-in-out duration-300 hover:cursor-pointer";

  let baseClasses = [
    general,
    text,
    border[variant],
    backgroundColors[variant],
    color[variant],
    padding[variant],
    disabledStyle,
  ];

  if (className) {
    baseClasses = [...baseClasses, ...className.split(" ")];
  }
  if (isBlock) {
    baseClasses = [...baseClasses, "block w-full"];
  }
  if (!!width) {
    baseClasses = [...baseClasses, width];
  }

  if (to) {
    return (
      <Link
        href={to}
        target={target}
        onClick={onClick}
        className={baseClasses.join(" ")}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        onClick={onClick}
        className={baseClasses.join(" ")}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses.join(" ")}
      disabled={disabled}
    >
      {variant === "outlined" ? (
        <div
          className={`py-[9px] px-[29px] bg-white dark:bg-dark-bg-primary rounded-sm ${outlinedClassName}`}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
