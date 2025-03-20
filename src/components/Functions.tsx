type ProfLevel = "None" | "Trained" | "Mastered" | "Supreme";

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
export function TotalSkillBonus( target: ProfLevel, bonus: number, globalBonus: number, pericBonus: number): string {
  const Mult = MultExtract(target as ProfLevel);
  const atributevalue = Math.floor((bonus - 10) / 2);
  const FinalAtribute = Math.round((Number(globalBonus) + atributevalue) * Mult) + Number(pericBonus);
  const value = (FinalAtribute >=0 ? `[+${FinalAtribute}]` : `[${FinalAtribute}]` ) ;
  return value;
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
    return Hp - (DmgTaken > 0 ? DmgTaken : 0);
  }
}
