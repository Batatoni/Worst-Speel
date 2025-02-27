import React, { } from 'react';
import theme from './Theme';

interface InputProps {
  name: string;
  value?: "None" | "Trained" | "Mastered" | "Supreme";
  className?: string;
}

const Select: React.FC<InputProps> = ({ name, value, className }) => {
  className = className + theme ? className : theme;
  return (
  <select name={name} className={className} value={value? value : "None"}>
    <option >None</option>
    <option >Trained</option>
    <option >Mastered</option>
    <option >Supreme</option>
    </select>

  );
};

export default Select;