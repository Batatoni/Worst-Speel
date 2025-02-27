import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";

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
    setAttributes(prevAtributtes => ({
      ...prevAtributtes,
      [name]: value
    }))
  }
  return (
    <>
      <div className="box-content w-260 h-300 border-4 p-4 rounded-xl border-purple-500/50">
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
            <Input name="" type="text" />
            <Input name="" type="text" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <p className="text-left text-xl">Body</p>
            <p className="text-left text-xl">Mind</p>
            <p className="text-left text-xl">Soul</p>
            <Input name="" type="number" />
            <Input name="" type="number" />
            <Input name="" type="number" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Input name="" type="text" value={`Strengh [+${atr.Strenght}]`}/>
            <Input name="" type="text" value={`Dexteriry [+${atr.Agility}]`}/>
            <Input name="" type="text" value={`Endurance [+${atr.Endurance}]`}/>
            <Input name="" type="text" value={`Intelligence [+${atr.Intelligence}]`}/>
            <Input name="" type="text" value={`Knowlodge [+${atr.Knowledge}]`}/>
            <Input name="" type="text" value={`Perception [+${atr.Perception}]`}/>
            <Input name="" type="text" value={`Will [+${atr.Will}]`}/>
            <Input name="" type="text" value={`Control [+${atr.Control}]`}/>
            <Input name="" type="text" value={`Presence [+${atr.Presence}]`}/>
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
            <Select name="select" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Input name="" type="text" />
            <Input name="" type="text" />
            <Input name="" type="text" />
            <Input name="" type="number" />
            <Input name="" type="number" />
            <Input name="" type="number" />
          </div>
          
        </div>
        <button onClick={() => AttAtribute("Strenght", atr.Strenght + 1)} >{atr.Strenght}</button> 
      </div>
    </>
  );
}

export default App;
