import React, { } from 'react';

interface InputProps {
  name: string;
}

const Select: React.FC<InputProps> = ({ name }) => {
  return (
  <select name={name} className="ring-1 ring-purple-500/50">
    <option >None</option>
    <option >Trained</option>
    <option >Mastered</option>
    <option >Supreme</option>
    </select>

  );
};

export default Select;