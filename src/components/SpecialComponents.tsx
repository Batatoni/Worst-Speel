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
  pericBonus: number;
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
  pericBonus,
  AttValue,
}: SelectProps) {
  const Mult = MultExtract(target as ProfLevel);
  const atributevalue = Math.floor((bonus - 10) / 2);
  const FinalAtribute = Math.round((Number(globalBonus) + atributevalue) * Mult) + Number(pericBonus);
  return (
    <div>
      <Label
        value={
          FinalAtribute >= 0
            ? `${label} [+${FinalAtribute}]`
            : `${label} [${FinalAtribute}]`
        }
      />
      <div className="grid grid-cols-5 gap-4">
        <Select
          name={name}
          value={target as ProfLevel}
          className="col-span-4"
          onselectchange={(e) => AttValue(label, String(e.target.value) as ProfLevel)}
        />
        <Input
          type="number"
          name={label}
          className="col-span-1 no-arrows"
          value={pericBonus}
          onchange={(e) => AttValue(`${label}bonus`, e.target.value)}
        />
      </div>
    </div>
  );
}

export function HPBar({ value, max }: { value: number; max: number }) {
  const percent = (value / max) * 100;
  return (
    <div className="mt-8">
      <Label value={`Health Points: ${value}/${max}`} />
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-800">
        <div
          className="bg-purple-600 h-4 rounded-full leading-none text-lg font-medium text-center text-purple-250"
          style={{ width: `${percent}%` }}
        >{`${percent}%`}</div>
      </div>
    </div>
  );
}

function MultExtract(target: ProfLevel): number {
  switch (target) {
    case "None":
      return 1;
    case "Trained":
      return 1.5;
    case "Mastered":
      return 2;
    case "Supreme":
      return 3;
    default:
      return 1;
  }
}

export function DmgRedCalculation(
  Hp: number,
  Dmg: number,
  Armor: number,
  AttValue: (name: string, value: number) => void,
  Shield?: number
): number {
  const totalarmor = Armor + (Shield ? Shield : 0);
  let DmgTaken;
  if (Dmg / 2 <= totalarmor && Dmg != 0) {
    DmgTaken = Dmg * (Dmg / (totalarmor * 3));
    DmgTaken = Math.round(DmgTaken);
    AttValue("CalcDmgTaken", DmgTaken);
    return Hp - DmgTaken;
  } else {
    DmgTaken = Dmg - totalarmor;
    AttValue("CalcDmgTaken", DmgTaken);
    return Hp - (DmgTaken>0? DmgTaken : 0);
  }
}

export function DmgTakenAlert({
  DmgTaken,
  visible,
  setVisible,
}: {
  DmgTaken: number;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div
      className={`fixed bottom-4 left-4 bg-black p-4 border-2 border-[#623a9b] rounded-lg shadow-lg max-w-xs flex items-center justify-between ${
        visible ? "" : "hidden"
      }`}
    >
      <p className="text-lp">
        You Received <strong className="text-purple-600">{DmgTaken}</strong>{" "}
        points of damage
      </p>
      <button
        onClick={handleClose}
        className="text-purple-500 hover:text-purple-700 ml-4"
      >
        &times;
      </button>
    </div>
  );
}

export default DmgTakenAlert;
