// Date: 03/20/2021
import Input from "./Input";
import Select from "./Select";
import Label from "./Label";
import { useEffect } from "react";
import { TotalSkillBonus,  } from "./Functions";

type ProfLevel = "None" | "Trained" | "Mastered" | "Supreme"; // isso aqui é meio inutil mas f@$#-se

//#region interfaces que definem os types de uma cacetada de coisas

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

interface AtrProps {
  atr: {
    Strenght: string;
    Strenghtbonus: number;
    Endurance: string;
    Endurancebonus: number;
    Agility: string;
    Agilitybonus: number;
    Intelligence: string;
    Intelligencebonus: number;
    Perception: string;
    Perceptionbonus: number;
    Knowledge: string;
    Knowledgebonus: number;
    Will: string;
    Willbonus: number;
    Control: string;
    Controlbonus: number
    Presence: string;
    Presencebonus: number;
    Cores: number;
    Body: number;
    Mind: number;
    Soul: number;
  };
}
//#endregion

// Não sei porque raios eu fiz esse inputmainatributte ele nao tem necessidade nenhuma
// podia ter feito ele direto no App.tsx mas seila, na minha cabeça fazia sentido
export function InputMainAtributte({ id, value, AttValue }: InputProps) {
  return (
    <Input
      type="number"
      name={id}
      value={value}
      className="text-center"
      onchange={(e) => AttValue(id, Number(e.target.value))}
    />
  );
}

//#region AtributeSelect (É o select com o label que mostra o valor da pericia)
export function SkillSelect({
  name,
  bonus,
  label,
  target,
  globalBonus,
  pericBonus,
  AttValue,
}: SelectProps) {
  const FinalAtribute = TotalSkillBonus(target as ProfLevel, bonus, globalBonus, pericBonus);
  
  useEffect(() => {
    if (name === "endurance") {
      AttValue("TotalEndurace", FinalAtribute);
    }
  }, [FinalAtribute, name, AttValue]);

  return (
    <div>
      <Label
        value={`${label} ${FinalAtribute}`}
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
//#endregion

//#region HpBar (Auto explicativo se voce nao sabe oque é isso ai voce tem um problema)
export function HPBar({ value, max }: { value: number; max: number }) {
  const percent = (value / max) * 100;
  return (
    <div className="mt-8">
      <Label className="text-xl" value={`Health Points: ${value}/${max}`} />
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-800">
        <div
          className="bg-purple-600 h-4 rounded-full leading-none text-lg font-medium text-center text-purple-250"
          style={{ width: `${percent}%` }}
        >{`${percent}%`}</div>
      </div>
    </div>
  );
}
//#endregion

//tem que arrumar a logica do botao de fechar do dmgtakenalert poderia ter sido bem mais simples do que essa bomba ai que eu fiz copiar do atributteslist
//#region DmgTakenNotification (O alerta que aparece no canto inferior esquerdo da tela a utilidade dele é mostrar o dano que o jogador tomou)
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
      className={`fixed bottom-4 left-4 bg-black p-4 border-2 border-[#623a9b] 
        rounded-lg shadow-lg max-w-xs flex items-center justify-between ${visible ? "" : "hidden"}`}
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
//#endregion

//#region AtributteList (A lista de atributos que aparece no canto superior esquerdo da tela muito foda ele)
export function AtributteList({atr} : AtrProps) {

  const handleClose = () => {
    const list = document.getElementById("atributtes_list");
    list?.style.setProperty("display", "none");
  };

  useEffect(() => {
    const lista = document.getElementById("atributtes_list")!;
    let isDragging = false;
    let offsetX: number, offsetY: number;

    // Certifique-se de que o elemento tem `position: fixed` e valores iniciais para `left` e `top`
    lista.style.position = "fixed";
    lista.style.left = "20px";
    lista.style.top = "200px";

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "BUTTON") return; // Prevent dragging when clicking the close button
      isDragging = true;
      offsetX = e.clientX - lista.getBoundingClientRect().left;
      offsetY = e.clientY - lista.getBoundingClientRect().top;
      lista.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        lista.style.left = `${e.clientX - offsetX}px`;
        lista.style.top = `${e.clientY - offsetY}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      lista.style.cursor = "grab";
    };

    lista.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      lista.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      id="atributtes_list"
      className={`ring-1 ring-purple-500/50 rounded-lg w-90 bg-black fixed`}
    >
      <header className="text-3xl flex border-b border-purple-500/50 w-90 justify-between items-center">
        <h6 className="text-left ml-5">Atributos</h6>
        <button id="BUTN" onClick={handleClose}>&times;</button>
      </header>
      <ul className="text-left ml-5 text-2x1 list-disc list-inside">
        <li>{`Strenght ${TotalSkillBonus(atr.Strenght as ProfLevel, atr.Body, atr.Cores, atr.Strenghtbonus)}`}</li>
        <li>{`Agility ${TotalSkillBonus(atr.Agility as ProfLevel, atr.Body, atr.Cores, atr.Agilitybonus)}`}</li>
        <li>{`Endurance ${TotalSkillBonus(atr.Endurance as ProfLevel, atr.Body, atr.Cores, atr.Endurancebonus)}`}</li>
        <li>{`Intelligence ${TotalSkillBonus(atr.Intelligence as ProfLevel, atr.Mind, atr.Cores, atr.Intelligencebonus)}`}</li>
        <li>{`Knowledge ${TotalSkillBonus(atr.Knowledge as ProfLevel, atr.Mind, atr.Cores, atr.Knowledgebonus)}`}</li>
        <li>{`Perception ${TotalSkillBonus(atr.Perception as ProfLevel, atr.Mind, atr.Cores, atr.Perceptionbonus)}`}</li>
        <li>{`Will ${TotalSkillBonus(atr.Will as ProfLevel, atr.Soul, atr.Cores, atr.Willbonus)}`}</li>
        <li>{`Control ${TotalSkillBonus(atr.Control as ProfLevel, atr.Soul, atr.Cores, atr.Controlbonus)}`}</li>
        <li>{`Presence ${TotalSkillBonus(atr.Presence as ProfLevel, atr.Soul, atr.Cores, atr.Presencebonus)}`}</li>
      </ul>
    </div>
  );
}
//#endregion