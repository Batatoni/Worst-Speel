import React, { } from 'react';
import theme from './Theme';

interface InputProps {
  name: string;
  value?: "None" | "Trained" | "Mastered" | "Supreme";
  className?: string;
}

const Select: React.FC<InputProps> = ({ name, value, className }) => {
  className = className ? `${className} ${theme}` : theme;
  return (
  <select name={name} /* onChange={""} */  className={className} value={value? value : "None"}>
    <option >None</option>
    <option >Trained</option>
    <option >Mastered</option>
    <option >Supreme</option>
    </select>

  );
};

/*
function resolve(core:number, rank: string, name: string, bonus: number): string {
  return "None";
}*/

export default Select;