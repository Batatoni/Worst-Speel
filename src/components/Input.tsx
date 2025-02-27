import React, { HTMLInputTypeAttribute } from 'react';
import theme from './Theme';

interface InputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({ name, type, className, value}) => {
  className = className + theme ? className : theme;
  return <input name={name} type={type} className={className} value={value} />;
};

export default Input;