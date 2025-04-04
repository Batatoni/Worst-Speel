import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Label from "./components/Label";
import {
  InputMainAtributte,
  SkillSelect,
  HPBar,
  DmgTakenAlert,
  AtributteList,
  ProfLevel,
  TabChanger,
  AspectAbilits,
  AttributeGroup,
} from "./components/SpecialComponents";
import {
  AspectAttribute,
  DmgRedCalculation,
  RankExtract,
  TotalSkillBonus,
} from "./components/Functions";
import { Atributte } from "./components/Functions";
import theme from "./components/Theme";
import { Dialog, DialogBody } from "@material-tailwind/react";

function App() {
  const [visible, setVisible] = useState(false);
  const [AtListVisible, setAtListVisible] = useState(true);
  const [AtrDialog, setAtrOpen] = useState(false);
  const handleopendialog = () => setAtrOpen((cur) => !cur)
  
//#region Attributes value
  const defaultAttributes: Atributte = {
      name: "",
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
      Rank: "Sleeper",
      Dice: "1d12",
      Shield: 0,
      ShieldUp: false,
      Armor: 0,
      Dmg: 0,
      DmgTaken: 0,
      CalcDmgTaken: 0,
      MaxHp: 25,
      Hp: 25,
      traces: "",
      ideas: "",
      conections: "",
      note: "",
      newatribute: "",
  };

  const [atr, setAttributes] = useState<Atributte>(defaultAttributes);

  const AttValue = (name: keyof Atributte, value: number | string | boolean) => {
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };
//#endregion

//#region Aspect & Attributes value
  const DefaulAspectAttribute: AspectAttribute = {
    aspect: Array(5).fill({name: "", description: ""}),
    attribute: [{name:"teste", description:"teste description", IsOpen: false}

    ]
  }

  const [Aatr, setAaAttributes] = useState<AspectAttribute>(DefaulAspectAttribute);

  const AttArrayValue = (type: keyof AspectAttribute, index: number, name: string, value: number | string | boolean) => {
      
      setAaAttributes(prevatribute => ({
        ...prevatribute,
        [type]: prevatribute[type].map((item, i) =>
         i === index ? {...item, [name]: value} : item)
      }))
    };
  
    const AddArray = (attname:string) =>{
    setAaAttributes(prev => ({
      ...prev,
      attribute: [...prev.attribute, {name: attname, description: "", IsOpen: false}]
    }))
  }

  const RemoveArray = (indexToRemove:number) =>{
    setAaAttributes(prev => ({
      ...prev,
      attribute: [...prev.attribute.slice(0, indexToRemove),
        ...prev.attribute.slice(indexToRemove + 1)
      ]
    }))
  }


//#endregion

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("sheet");
      const savedAA = localStorage.getItem("AAsheet")
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAttributes(parsed);
          } catch (e) {
          console.error("Failed to load character data", e);
        }
      }
      if (savedAA) {
        try{
        const parsed = JSON.parse(savedAA)
        setAaAttributes(parsed);
        }
        catch (e) {
          console.error("Failed to load atribute/aspect data", e)
        }
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    console.log(atr); // para testes remover depois
  }, [atr])

  useEffect(() => {
    console.log(Aatr); // para testes remover depois
  }, [Aatr])

  useEffect(() => {
   const saveData = () => {
      const dataToSave = atr
      const dataToSave2 = Aatr
      localStorage.setItem("sheet", JSON.stringify(dataToSave));
      localStorage.setItem("AAsheet", JSON.stringify(dataToSave2))
    };
    
    const timer = setTimeout(saveData, 500);
    return () => clearTimeout(timer);
  }, [atr, Aatr])

  const TotalEndurace = TotalSkillBonus(
    atr.Endurance as ProfLevel,
    atr.Body,
    atr.Cores,
    atr.Endurancebonus
  );
  const MaxHp = Math.round(
    TotalEndurace > 0 ? 25 * (TotalEndurace * (0.25 + 1)) : 25
  );
  const newHp = MaxHp - atr.MaxHp + atr.Hp;

  useEffect(() => {
    AttValue("Hp", newHp);
    AttValue("MaxHp", MaxHp);
  }, [newHp, MaxHp]);

  return (
    <>
      <div className="w-300 p-14 border-4 border-[#623a9b] rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black dark:border-[#623a9b]">
        <div className="mb-4">
          <h1 className="text-purple-300 font-serif opacity-35 ">
            Dream Realm Spell
          </h1>
        </div>
        <TabChanger />
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            <p className="text-left text-xl col-span-2">Name</p>
            <p className="text-left text-xl">Dice</p>
            <Input name="" type="text" className="col-span-2" value={atr.name} onchange={(e) => AttValue("name", e.target.value)}/>
            <Input name="" type="text" value={atr.Dice} />
          </div>
          <div id="Tela 1 Character">
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-8">
              <p className="text-left text-xl">Rank</p>
              <p className="text-left text-xl">Fragments</p>
              <p className="text-left text-xl">Cores</p>
              <select
                name=""
                className={theme}
                value={atr.Rank}
                onChange={(e) => {
                  AttValue("Rank", e.target.value);
                  AttValue("Dice", RankExtract(e.target.value));
                }}
              >
                <option value="Sleeper">Sleeper</option>
                <option value="Awakened">Awakened</option>
                <option value="Ascended">Ascended</option>
                <option value="Transcendent">Transcendent</option>
                <option value="Supreme">Supreme</option>
                <option value="Sacred">Sacred</option>
                <option value="Divine">Divine</option>
              </select>
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
            <h2 onClick={() => setAtListVisible(true)} className="text-left w-fit hover:cursor-pointer">
              Atributos
            </h2>
            <div className="grid grid-cols-3 gap-4">
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
                  className="mb-4 w-full"
                  placeholder="Weapon Name"
                />
                <Input name="" type="text" placeholder="Weapon Damage" />
              </div>
              <div>
                <Label value="Shield" />
                <Input
                  name=""
                  type="text"
                  className="mb-4 w-full"
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
                  className="mb-4 w-full"
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
            <HPBar value={atr.Hp} max={MaxHp} />
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
                  value={MaxHp}
                  placeholder="Max HP"
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
                <div className="relative group">
                  <button
                    className="bg-purple-600 text-white rounded-lg p-2 w-full hover:bg-purple-700"
                    onClick={() => {
                      const newHp = DmgRedCalculation(
                        atr.Hp,
                        atr.Dmg,
                        atr.Armor,
                        AttValue,
                        atr.ShieldUp ? atr.Shield : 0
                      );
                      AttValue("Hp", newHp);
                      setVisible(true);
                    }}
                  >
                    Calculate Damage
                  </button>
                  <div className="absolute w-90 left-0 bottom-full mb-2 hidden group-hover:block bg-black text-sm rounded-lg p-2 shadow-lg border border-[#623a9b]">
                    <Label
                      value="Damage Reduction Formula"
                      className="text-base font-bold text-purple-500"
                    />
                    <p className="text-left">
                      O dano é calculado baseado na quantidade de armadura total
                      do player, mas quanto maior for o dano em relação a
                      armadura maior a redução e quanto menor for o dano em
                      relação a armadura menor a redução
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2 ml-4">
                  <input
                    name="Armor"
                    type="checkbox"
                    className="object-left size-7 mt-2 bg-purple-600"
                    onChange={(e) => AttValue("ShieldUp", e.target.checked)}
                  />
                  <Label value="Shield Up" className="mb-2 ml-2" />
                </div>
              </div>
            </div>
          </div>
          {/* Fim da Tela1 Character Attributes */}
          <div id="Tela 2 Character" hidden>
            <h2 className="">Personalidade</h2>
            <div className="grid grid-cols-2 text-left mt-10">
              <div>
                <h3 className="mb-3">Aparencia</h3>
                <input className="w-125 h-120" type="image" />
              </div>
              <div>
                <h3 className="mb-3 mt-3">Traços</h3>
                <textarea
                  className="w-full"
                  rows={4}
                  placeholder="..."
                  value={atr.traces}
                  onChange={(e) => AttValue("traces", e.target.value)}
                />
                <h3 className="mb-3 mt-2">Ideais</h3>
                <textarea
                  className="w-full"
                  rows={4}
                  placeholder="..."
                  value={atr.ideas}
                  onChange={(e) => AttValue("ideas", e.target.value)}
                />
                <h3 className="mb-3 mt-2">Conexões</h3>
                <textarea
                  className="w-full"
                  rows={4}
                  placeholder="..."
                  value={atr.conections}
                  onChange={(e) => AttValue("conections", e.target.value)}
                />
              </div>
            </div>
            <h3 className="mb-4">Notas</h3>
            <textarea className="w-full" rows={6} placeholder="..." onChange={(e) => AttValue("note", e.target.value)} />
          </div>
          {/* Fim da Tela2 Character Profile */}
          <div id="Tela 3 Character" hidden>
            <h2>Aspect</h2>
            <div className="flex gap-4">
            <Input type="text" name="Aspect_Name" placeholder="Aspect Name" className="w-90"/>
            <Input type="text" name="Aspect_Rank" placeholder="Aspect Rank" className="w-40"/>
            </div>
              <h3>Aspect Description</h3>
              <textarea className="w-full mb-4" rows={4} placeholder="Aspect Description"/>
              <div>
                <header className="flex justify-between items-center">
                <h2>Attributes</h2> 
                <button className="bg-purple-600 rounded-lg mt-15 h-12 w-25" onClick={() => handleopendialog()}>New</button>
                </header>
                <AttributeGroup atr={Aatr.attribute} RemoveAtribute={RemoveArray} AddAtribute={AttArrayValue}/>

              </div>
              <AspectAbilits atr={Aatr.aspect} func={AttArrayValue}/>   
            <h2 className="mb-2">Flaw</h2>
            <Input type="text" name="Flaw_Name" placeholder="Flaw Name" className="object-left w-46 mb-4 mr-270"/>
            <textarea className="w-full mb-4" rows={4} placeholder="Flaw Description"/>
          </div>
          {/* Fim da Tela 3 Character Aspect */}
          <DmgTakenAlert
            DmgTaken={atr.CalcDmgTaken}
            visible={visible}
            setVisible={setVisible}
          />
          {AtListVisible && (
            <AtributteList atr={atr} setIsVisible={setAtListVisible} />
          )}
        </div>
      </div>
      <Dialog size="xs" open={AtrDialog} handler={handleopendialog} className="">
        <DialogBody className="bg-black text-sm rounded-lg p-2 shadow-lg border-4 border-[#623a9b] w-150"> {/*Acho que esse classname era pra estar no Dialog*/}
          <h2>Adicionar Novo Atributo</h2>
          <Label value="Name"/>
          <Input type="text" placeholder="Attribute Name..." name="Atribute new name" onchange={(e) => AttValue("newatribute", e.target.value)}/>
          <button className="bg-purple-600 text-[15px] text-white mt-4" onClick = {() => {AddArray(atr.newatribute); handleopendialog();}}>Confirm</button>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default App;
