import React, { HTMLInputTypeAttribute } from "react";
import theme from "./Theme";

interface InputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  value?: string | number;
  placeholder?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  className,
  value,
  placeholder,
  onchange,
}) => {
  const change: string = "text-xl w-full";
  className = className
    ? `${theme} ${change} ${className}`
    : `${theme} ${change}`;
  return (
    <input
      id={name}
      type={type}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onchange}
    />
  );
};



export default Input;
