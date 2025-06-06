
interface InputProps {
  name?: string;
  className?: string;
  value: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label: React.FC<InputProps> = ({ name, className, value, onchange}) => {
  const change: string = "text-left text-lg mt-4";
  className= className? `${className}` : change;
  return <p className={className} id={name} onChange={onchange}>{value}</p>;
};

export default Label;