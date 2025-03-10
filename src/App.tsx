import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Label from "./components/Label";

function App() {
  const [atr, setAttributes] = useState({
    Strenght: 0,
    Agility: 0,
    Endurance: 0,
    Intelligence: 0,
    Knowledge: 0,
    Perception: 0,
    Will: 0,
    Control: 0,
    Presence: 0,
  });

  const AttAtribute = (name: string, value: number) => {
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
            <Input name="" type="number" className="text-center" />
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-8">
            <p className="text-left text-xl">Body</p>
            <p className="text-left text-xl">Mind</p>
            <p className="text-left text-xl">Soul</p>
            <Input name="" type="number" />
            <Input name="" type="number" />
            <Input name="" type="number" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div >
            <Label name="Strengh" value={`Strengh [+${atr.Strenght}]`} />
            <Select name="Strengh" className="w-full" />
            <Label name="Dexteriry" value={`Dexteriry [+${atr.Agility}]`} />
            <Select name="Dexteriry" className="w-full"/>
            <Label name="Endurance" value={`Endurance [+${atr.Endurance}]`} />
            <Select name="Endurance" className="w-full"/>
            </div>
            <div>
            <Label name="Intelligence"  value={`Intelligence [+${atr.Intelligence}]`} />
            <Select name="Intelligence" className="w-full"/>
            <Label name="Knowlodge" value={`Knowlodge [+${atr.Knowledge}]`} />
            <Select name="Knowlodge" className="w-full"/>
            <Label name="Perception" value={`Perception [+${atr.Perception}]`} />
            <Select name="Perception" className="w-full"/>
            </div>
            <div>
            <Label name="Will" value={`Will [+${atr.Will}]`} />
            <Select name="Will" className="w-full"/>
            <Label name="Control" value={`Control [+${atr.Control}]`} />
            <Select name="Control" className="w-full"/>
            <Label name="Presence" value={`Presence [+${atr.Presence}]`} />
            <Select name="Presence" className="w-full"/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div>
            <Label value="Weapon" />
            <Input name="" type="text" className="mb-4" placeholder="Weapon Name" />
            <Input name="" type="text" placeholder="Weapon Damage"/>
            </div>
            <div>
            <Label value="Shield" />
            <Input name="" type="text" className="mb-4" placeholder="Shield Name" />
            <Input name="" type="number" placeholder="Defence Points" />
            </div>
            <div>
            <Label value="Armor" />
            <Input name="" type="text" className="mb-4" placeholder="Armor Name" />
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
        <button onClick={() => AttAtribute("Strenght", atr.Strenght + 1)}>
          {atr.Strenght}
        </button>
      </div>
    </>
  );
}

export default App;
