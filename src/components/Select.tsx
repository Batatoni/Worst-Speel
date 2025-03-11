import React from "react";
import theme from "./Theme";

interface InputProps {
  name: string;
  value?: "None" | "Trained" | "Mastered" | "Supreme";
  className?: string;
  onselectchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<InputProps> = ({
  name,
  value,
  className,
  onselectchange,
}) => {
  className = className ? `${className} ${theme} w-full` : `${theme} w-full`;
  return (
    <select
      name={name}
      onChange={onselectchange}
      className={className}
      value={value}
    >
      <option value="None">None</option>
      <option value="Trained">Trained</option>
      <option value="Mastered">Mastered</option>
      <option value="Supreme">Supreme</option>
    </select>
  );
};

/*
function resolve(core:number, rank: string, name: string, bonus: number): string {
  return "None";
}*/

export default Select;
