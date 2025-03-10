import React, { HTMLInputTypeAttribute } from 'react';
import theme from './Theme';

interface InputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  value?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ name, type, className, value, placeholder}) => {
  const change: string = "text-xl w-full";
  className = className? `${theme} ${change} ${className}`: `${theme} ${change}`;
  return <input name={name} type={type} className={className} value={value} placeholder={placeholder}/>;
};

export default Input;