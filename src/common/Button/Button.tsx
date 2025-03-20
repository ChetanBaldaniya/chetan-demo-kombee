import React, { ReactNode } from "react";

interface ButtonProps {
  label?: string;
  className?: string;
  children?:  ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className,
  children 
}) => {
  return (
    <button
      type={type}
      className={`${className}  text-[#0275A8] font-semibold py-2 px-2 w-auto rounded-md `}
      onClick={onClick}
    >
     { label ? label  : children}
    </button>
  );
};

export default Button;
