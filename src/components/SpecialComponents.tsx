// Date: 03/20/2021
import Input from "./Input";
import Select from "./Select";
import Label from "./Label";

type ProfLevel = "None" | "Trained" | "Mastered" | "Supreme";

interface InputProps {
  id: string;
  value?: string | number;
  AttValue: (name: string, value: number) => void;
}
interface SelectProps {
  name: string;
  bonus: number;
  label: string;
  target: string;
  globalBonus: number;
  AttValue: (name: string, value: number | string) => void;
}

export function InputMainAtributte({ id, value, AttValue }: InputProps) {
  return (
    <Input
      type="number"
      name={id}
      value={value}
      onchange={(e) => AttValue(id, Number(e.target.value))}
    />
  );
}

export function SkillSelect({
  name,
  bonus,
  label,
  target,
  globalBonus,
  AttValue,
}: SelectProps) {
  const Mult = MultExtract(target as ProfLevel);
  const atributevalue = Math.floor((bonus - 10) / 2);
  const FinalAtribute = (atributevalue + globalBonus) * Mult;
  return (
    <div>
      <Label
        value={
          atributevalue > 0
            ? `${label} [+${FinalAtribute}]`
            : `${label} [${FinalAtribute}]`
        }
      />
      <Select
        name={name}
        value={target as ProfLevel}
        onselectchange={(e) =>
          AttValue(label, String(e.target.value) as ProfLevel)
        }
      />
    </div>
  );
}
function MultExtract(target: ProfLevel): number {
  switch (target) {
    case "None":
      return 1;
    case "Trained":
      return 2;
    case "Mastered":
      return 3;
    case "Supreme":
      return 4;
  }
  return 0;
}