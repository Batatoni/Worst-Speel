
interface InputProps {
  name?: string;
  className?: string;
  value: string;
}

const Label: React.FC<InputProps> = ({ name, className, value}) => {
  const change: string = "text-left text-xl mt-4";
  className= className? `${className} ${change}` : change;
  return <p className={className} id={name} >{value}</p>;
};

export default Label;