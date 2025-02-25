import React, { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  name: string;
  type: HTMLInputTypeAttribute;
}

const Input: React.FC<InputProps> = ({ name, type }) => {
  return <input name={name} type={type} className="ring-1 ring-purple-500/50" />;
};

export default Input;