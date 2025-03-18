import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Label from "./components/Label";
import {
  InputMainAtributte,
  SkillSelect,
  HPBar,
  DmgRedCalculation,
  DmgTakenAlert,
} from "./components/SpecialComponents";

function App() {
  const [visible, setVisible] = useState(false);
  const [atr, setAttributes] = useState({
    Body: 10,
    Mind: 10,
    Soul: 10,
    Strenght: "None",
    Strenghtbonus: 0,
    Agility: "None",
    Agilitybonus: 0,
    Endurance: "None",
    Endurancebonus: 0,
    Intelligence: "None",
    Intelligencebonus: 0,
    Knowledge: "None",
    Knowledgebonus: 0,
    Perception: "None",
    Perceptionbonus: 0,
    Will: "None",
    Willbonus: 0,
    Control: "None",
    Controlbonus: 0,
    Presence: "None",
    Presencebonus: 0,
    Cores: 0,
    Shield: 0,
    ShieldUp: false,
    Armor: 0,
    Dmg: 0,
    DmgTaken: 0,
    CalcDmgTaken: 0,
    MaxHp: 50,
    Hp: 25,
  });



  const AttValue = (name: string, value: number | string | boolean) => {
    setAttributes((prevAtributtes) => ({
      ...prevAtributtes,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="w-280 p-14 bg-white border border-[#623a9b] rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black dark:border-[#623a9b]">
        <div className="mb-4">
          <h1 className="text-purple-300 font-serif opacity-35 ">
            Dream Realm Spell
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            <p className="text-left text-xl col-span-2">Name</p>
            <p className="text-left text-xl">Dice</p>
            <Input name="" type="text" className="col-span-2" />
            <Input name="" type="text" />
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-8">
            <p className="text-left text-xl">Rank</p>
            <p className="text-left text-xl">Fragments</p>
            <p className="text-left text-xl">Cores</p>
            <Input name="" type="text" />
            <Input name="" type="number" />
            <Input
              name=""
              type="number"
              className="text-center"
              value={atr.Cores}
              onchange={(e) => AttValue("Cores", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-8">
            <p className="text-left text-xl">Body</p>
            <p className="text-left text-xl">Mind</p>
            <p className="text-left text-xl">Soul</p>
            <InputMainAtributte
              id="Body"
              value={atr.Body}
              AttValue={AttValue}
            />
            <InputMainAtributte
              id="Mind"
              value={atr.Mind}
              AttValue={AttValue}
            />
            <InputMainAtributte
              id="Soul"
              value={atr.Soul}
              AttValue={AttValue}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div>
              <SkillSelect
                AttValue={AttValue}
                target={atr.Strenght}
                name="strengh"
                label="Strenght"
                bonus={atr.Body}
                globalBonus={atr.Cores}
                pericBonus={atr.Strenghtbonus}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Agility}
                name="dexterity"
                label="Dexterity"
                bonus={atr.Body}
                globalBonus={atr.Cores}
                pericBonus={atr.Agilitybonus}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Endurance}
                name="endurance"
                label="Endurance"
                bonus={atr.Body}
                globalBonus={atr.Cores}
                pericBonus={atr.Endurancebonus}
              />
            </div>
            <div>
              <SkillSelect
                AttValue={AttValue}
                target={atr.Intelligence}
                name="intelligence"
                label="Intelligence"
                bonus={atr.Mind}
                globalBonus={atr.Cores}
                pericBonus={atr.Intelligencebonus}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Knowledge}
                name="knowledge"
                label="Knowledge"
                bonus={atr.Mind}
                globalBonus={atr.Cores}
                pericBonus={atr.Knowledgebonus}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Perception}
                name="perception"
                label="Perception"
                bonus={atr.Mind}
                globalBonus={atr.Cores}
                pericBonus={atr.Perceptionbonus}
              />
            </div>
            <div>
              <SkillSelect
                AttValue={AttValue}
                target={atr.Will}
                name="will"
                label="Will"
                bonus={atr.Soul}
                globalBonus={atr.Cores}
                pericBonus={atr.Willbonus}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Control}
                name="control"
                label="Control"
                bonus={atr.Soul}
                globalBonus={atr.Cores}
                pericBonus={atr.Controlbonus}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Presence}
                name="presence"
                label="Presence"
                bonus={atr.Soul}
                globalBonus={atr.Cores}
                pericBonus={atr.Presencebonus}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div>
              <Label value="Weapon" />
              <Input
                name=""
                type="text"
                className="mb-4"
                placeholder="Weapon Name"
              />
              <Input name="" type="text" placeholder="Weapon Damage" />
            </div>
            <div>
              <Label value="Shield" />
              <Input
                name=""
                type="text"
                className="mb-4"
                placeholder="Shield Name"
              />
              <Input
                name=""
                type="number"
                placeholder="Defence Points"
                value={atr.Shield}
                onchange={(e) => AttValue("Shield", Number(e.target.value))}
              />
            </div>
            <div>
              <Label value="Armor" />
              <Input
                name=""
                type="text"
                className="mb-4"
                placeholder="Armor Name"
              />
              <Input
                name=""
                type="number"
                placeholder="Defence Points"
                value={atr.Armor}
                onchange={(e) => AttValue("Armor", Number(e.target.value))}
              />
            </div>
          </div>
          <HPBar value={atr.Hp} max={atr.MaxHp} />
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div>
              <Label value="Health Points" />
              <Input
                name="Hp"
                type="text"
                value={atr.Hp}
                placeholder="Health Points"
                onchange={(e) => AttValue("Hp", Number(e.target.value))}
              />
            </div>
            <div>
              <Label value="Max Health Points" />
              <Input
                name="MaxHp"
                type="text"
                value={atr.MaxHp}
                placeholder="Max HP"
                onchange={(e) => AttValue("MaxHp", Number(e.target.value))}
              />
            </div>
            <div>
              <Label value="Damage Taken" />
              <Input
                name="Damage Taken"
                type="text"
                value={atr.Dmg}
                onchange={(e) => AttValue("Dmg", Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="grid grid-cols-2 gap-4 col-start-3">
              <button
                className="bg-purple-600 text-white rounded-lg p-2 w-full"
                onClick={() => {
                  const newHp = DmgRedCalculation(
                    atr.Hp,
                    atr.Dmg,
                    atr.Armor,
                    AttValue,
                    atr.ShieldUp? atr.Shield : 0
                  );
                  AttValue("Hp", newHp);
                  setVisible(true);
                }}
              >
                Calculate Damage
              </button>
              <div className="flex items-center mb-2 ml-4">
                <input
                  name="Armor"
                  type="checkbox"
                  className="object-left size-7 mt-2 bg-purple-600"
                  onChange={(e) => AttValue("ShieldUp", e.target.checked)}
                />
                <Label value="Shield Up" className="mb-2 ml-2" />
                <DmgTakenAlert
                  DmgTaken={atr.CalcDmgTaken}
                  visible={visible}
                  setVisible={setVisible}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
