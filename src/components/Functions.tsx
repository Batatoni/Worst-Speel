import { ProfLevel } from "./SpecialComponents";

export type Aspect = { name: string, description: string}[];

export type GroupAttribute = {name:string, description:string, IsOpen: boolean}[]

export type AspectAttribute = {
  aspect: Aspect
  attribute: GroupAttribute
}

export type Atributte = { // isso aqui ta uma porra eu 100% vou esquecer de atualizar aqui e vai tudo dar errado e eu nao vou saber o porque
  name: string
  Body: number,
  Mind: number,
  Soul: number,
  Strenght: string,
  Strenghtbonus: number,
  Agility: string,
  Agilitybonus: number,
  Endurance: string,
  Endurancebonus: number,
  Intelligence: string,
  Intelligencebonus: number,
  Knowledge: string,
  Knowledgebonus: number,
  Perception: string,
  Perceptionbonus: number,
  Will: string,
  Willbonus: number,
  Control: string,
  Controlbonus: number,
  Presence: string,
  Presencebonus: number,
  Cores: number,
  Rank: string,
  Dice: string,
  Shield: number | "",
  ShieldUp: boolean,
  Armor: number | "",
  Dmg: number | "",
  DmgTaken: number,
  CalcDmgTaken: number,
  MaxHp: number,
  Hp: number,
  traces: string,
  ideas: string,
  conections: string,
  note: string
  newatribute: string
}

export function MultExtract(target: ProfLevel): number {
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
export function RankExtract(target: string): string {
    switch (target) {
        case "Sleeper": return "1d12";
        case "Awakened": return "1d20";
        case "Ascended": return "3d12";
        case "Transcendent": return "3d20";
        case "Supreme": return "4d24";
        case "Sacred": return "5d20";
        case "Divine": return "6d20";
        default: return "";
}
}
export function TotalSkillBonus( target: ProfLevel, bonus: number, globalBonus: number, pericBonus: number): number {
  const Mult = MultExtract(target as ProfLevel);
  const atributevalue = Math.floor((bonus - 10) / 2);
  const FinalAtribute = Math.round((Number(globalBonus) + atributevalue) * Mult) + Number(pericBonus);
  return FinalAtribute;
}

export function DmgRedCalculation(
  Hp: number,
  Dmg: number,
  Armor: number,
  AttValue: (name: keyof Atributte, value: number | string | boolean) => void,
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
    return Hp - (DmgTaken > 0 ? DmgTaken : 0);
  }
}
