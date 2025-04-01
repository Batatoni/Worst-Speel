import Input from "./Input";
import Select from "./Select";
import Label from "./Label";
import { useEffect, useState } from "react";
import { Aspect, AspectAttribute, Atributte, GroupAttribute, TotalSkillBonus } from "./Functions";
import { Chip } from "@material-tailwind/react";

export type ProfLevel = "None" | "Trained" | "Mastered" | "Supreme"; // isso aqui é meio inutil mas f@$#-se

//#region interfaces que definem os types de uma cacetada de coisas

interface InputProps {
  id: string;
  value?: string | number;
  AttValue: (name: keyof Atributte, value: number | string | boolean) => void;
}

interface SelectProps {
  name: string;
  bonus: number;
  label: string;
  target: string;
  globalBonus: number;
  AttValue: (name: keyof Atributte, value: number | string | boolean) => void;
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
    Controlbonus: number;
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
      onchange={(e) => AttValue(id as keyof Atributte, Number(e.target.value))}
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
  const FinalAtribute = TotalSkillBonus(
    target as ProfLevel,
    bonus,
    globalBonus,
    pericBonus
  );

  return (
    <div>
      <Label
        value={`${label} ${
          FinalAtribute >= 0 ? `[+${FinalAtribute}]` : `[${FinalAtribute}]`
        } `}
      />
      <div className="grid grid-cols-5 gap-4">
        <Select
          name={name}
          value={target as ProfLevel}
          className="col-span-4"
          onselectchange={(e) =>
            AttValue(label as keyof Atributte, String(e.target.value) as ProfLevel)
          }
        />
        <Input
          type="number"
          name={label}
          className="col-span-1 no-arrows"
          value={pericBonus}
          onchange={(e) => AttValue(`${label}bonus` as keyof Atributte, e.target.value)}
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
        rounded-lg shadow-lg max-w-xs flex items-center justify-between ${
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
//#endregion

//#region AtributteList (A lista de atributos que aparece no canto superior esquerdo da tela muito foda ela
export function AtributteList({
  atr,
  setIsVisible,
}: AtrProps & { setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [position, setPosition] = useState({ x: 20, y: 200 });

  const handleClose = () => {
    setIsVisible(false);
  };

  const attributes = [
    { name: "Strenght", profLevel: atr.Strenght, base: atr.Body, bonus: atr.Strenghtbonus },
    { name: "Agility", profLevel: atr.Agility, base: atr.Body, bonus: atr.Agilitybonus },
    { name: "Endurance", profLevel: atr.Endurance, base: atr.Body, bonus: atr.Endurancebonus },
    { name: "Intelligence", profLevel: atr.Intelligence, base: atr.Mind, bonus: atr.Intelligencebonus },
    { name: "Knowledge", profLevel: atr.Knowledge, base: atr.Mind, bonus: atr.Knowledgebonus },
    { name: "Perception", profLevel: atr.Perception, base: atr.Mind, bonus: atr.Perceptionbonus },
    { name: "Will", profLevel: atr.Will, base: atr.Soul, bonus: atr.Willbonus },
    { name: "Control", profLevel: atr.Control, base: atr.Soul, bonus: atr.Controlbonus },
    { name: "Presence", profLevel: atr.Presence, base: atr.Soul, bonus: atr.Presencebonus },
  ];

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
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY,
        });
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
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      className={`ring-2 ring-purple-500/50 rounded-lg w-90 bg-black fixed`}
    >
      <header className="text-3xl flex border-b-2 border-purple-500/50 w-90 justify-between items-center">
        <h6 className="text-left ml-5">Atributos</h6>
        <button id="BUTN" onClick={handleClose}>
          &times;
        </button>
      </header>
      <ul className="text-left ml-5 text-2x1 list-disc list-inside">
      {attributes.map((attr) => {
          const totalBonus = TotalSkillBonus(
            attr.profLevel as ProfLevel,
            attr.base,
            atr.Cores,
            attr.bonus
          );
          return (
            <AttributeItem
              key={attr.name}              
              name={attr.name}
              value={`[${totalBonus >= 0 ? "+" : ""}${totalBonus}]`}
            />
          );
        })}
      </ul>
    </div>
  );
}
//#endregion

//#region AttributeItem (Os itens que sao listados no AttributeList, tentei deixar o atributelist menos escaralhado mas ainda ta uma porra)

function AttributeItem({ name, value }: { name: string; value: string }) {
  return (
    <li className="text-[22px]">
      {name} <strong className="text-purple-600">{value}</strong>
    </li>
  );
}
//#endregion

//#region TabChanger (O script e o body da tabela de botoes utilizada para trocar a tela da ficha para profile, itens, aspect, etc...)
export function TabChanger() {

  const handletabattribute = (target: number) => {

    const target2 = document.getElementById(`Tela ${target} Character`);

    for(let i = 0; i <= 3; i++) {
      const Hided = document.getElementById(`Tela ${i} Character`)
      Hided?.setAttribute("hidden", "")
    }

    target2?.removeAttribute("hidden");
  }
    

  return (
    <div className="mb-4 border-b border-purple-500/50">
      <ul
        className="flex flex-wrap -mb-px text-sm text-[24px] opacity-60 text-center"
        id="default-styled-tab"
        role="tablist"
      >
        <li className="me-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 rounded-t-lg hover:border-purple-500"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            onClick={() => handletabattribute(1)}
          >
            Attributes
          </button>
        </li> 
        <li className="me-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 rounded-t-lg "
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
            onClick={() => handletabattribute(2)}
          >
            Character
          </button>
          </li>
          <li className="me-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 rounded-t-lg "
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
            onClick={() => handletabattribute(3)}
          >
            Aspect
          </button>
        </li>
        <li className="me-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 rounded-t-lg "
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
            onClick={() => handletabattribute(4)}
          >
            Memorys
          </button>
        </li>
      </ul>
    </div>
  );
}
//#endregion
 
//#region Aspect Ability

export function AspectAbilits({atr, func}: {atr: Aspect, func:(type: keyof AspectAttribute, index: number, name: string, value: number | string) => void})
{
  const [enabledranks, setEnabledRanks] = useState<string[]>(["Dormant"]);

const ranks = ["Dormant", "Awakened", "Ascended", "Transcended", "Supreme"]; 

  const handleaddrank = () => {
    setEnabledRanks((prev) => {
      const nextRank = ranks[prev.length]
      if(nextRank){
        return[...prev, nextRank];
      }
      return ["Dormant"];
    })
  }

  let i = -1;
  return(
    <>
    <div style={{marginLeft: "-35px"}} className="flex border-b-4 border-[#623a9b] w-300 shadow-sm sm:p-6 md:p-8 justify-between">
    <h2 className="mb-4">Aspect Abilitys</h2>
    <button 
    className="bg-purple-600 mt-9 h-15 text-white w-30 rounded-lg p-2 hover:bg-purple-700"
    onClick={handleaddrank}
    >Add</button>
    </div>
    {atr.map(() => { 
      i++
      const fixI = i;
      return(
      <div key={fixI} style={{marginLeft: '-35px'}} className="relative group border-b-4 w-300 border-[#623a9b] shadow-sm sm:p-6 md:p-8" hidden={!enabledranks.includes(ranks[fixI])}>{/* Tem que mudar para seila adicionar um button Add que libera a visao das demais abilidades */}
        <div className="flex gap-4 items-center mb-3 mt-5">
          <Input type="Text" name={`AbilitName_0${fixI}`} className="w-50" placeholder="Ability Name" value={atr[fixI].name} onchange={(e) => func("aspect", fixI, "name", e.target.value)}/>
          <Label value={`Rank [ ${ranks[fixI]} ]`} className="font-bold text-[25px]"/>
        </div>
        <textarea className="w-full" rows={3} placeholder="Ability Description" value={atr[fixI].description} onChange={(e) => func("aspect", fixI, "description", e.target.value)}/>
      </div>
      )
})
}  
    </>
  )
}

//#endregion

//#region AttributeGroup
export function AttributeGroup({atr, func}: {atr: GroupAttribute, func:(type: keyof AspectAttribute, index: number, name: string, value: number | string | boolean) => void})
{
  
  return(
    <div>
    {atr.map((attr, index) => {

    return(
  <div className="relative group inline-block">
    <div className="cursor-pointer" onClick={()=> func("attribute", index, "IsOpen", !attr.IsOpen)}>
    <Chip value={attr.name} className="bg-purple-600 text-bold p-2 mr-4"/>
    </div>
    {attr.IsOpen! && (<div className="absolute left-1/2 bottom-full mb-2 block bg-black text-sm rounded-lg p-2 shadow-lg border border-[#623a9b] transform -translate-x-1/2 w-70">
      <textarea rows={3} className="w-64" value={attr.description} onChange={(e) => func("attribute", index, "description", e.target.value)} placeholder="Attribute Description"/>
    </div>)}
  </div>)
  })
  }
  </div >
  );
}
//#endregion