import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Label from "./components/Label";
import {
  InputMainAtributte,
  SkillSelect,
} from "./components/SpecialComponents";

function App() {
  const [atr, setAttributes] = useState({
    Body: 10,
    Mind: 10,
    Soul: 10,
    Strenght: "None",
    Agility: "None",
    Endurance: "None",
    Intelligence: "None",
    Knowledge: "None",
    Perception: "None",
    Will: "None",
    Control: "None",
    Presence: "None",
    Cores: 0,
  });

  const AttValue = (name: string, value: number | string) => {
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
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Agility}
                name="dexterity"
                label="Dexterity"
                bonus={atr.Body}
                globalBonus={atr.Cores}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Endurance}
                name="endurance"
                label="Endurance"
                bonus={atr.Body}
                globalBonus={atr.Cores}
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
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Knowledge}
                name="knowledge"
                label="Knowledge"
                bonus={atr.Mind}
                globalBonus={atr.Cores}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Perception}
                name="perception"
                label="Perception"
                bonus={atr.Mind}
                globalBonus={atr.Cores}
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
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Control}
                name="control"
                label="Control"
                bonus={atr.Soul}
                globalBonus={atr.Cores}
              />
              <SkillSelect
                AttValue={AttValue}
                target={atr.Presence}
                name="presence"
                label="Presence"
                bonus={atr.Soul}
                globalBonus={atr.Cores}
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
              <Input name="" type="number" placeholder="Defence Points" />
            </div>
            <div>
              <Label value="Armor" />
              <Input
                name=""
                type="text"
                className="mb-4"
                placeholder="Armor Name"
              />
              <Input name="" type="number" placeholder="Defence Points" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-8">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
