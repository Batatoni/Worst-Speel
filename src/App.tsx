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
} from "./components/SpecialComponents";
import {
  DmgRedCalculation,
  RankExtract,
  TotalSkillBonus,
} from "./components/Functions";
import { Atributte } from "./components/Functions";
import theme from "./components/Theme";

function App() {
  const [visible, setVisible] = useState(false);
  const [AtListVisible, setAtListVisible] = useState(true);
  
  /* Não curti muito esse initialAtr tentar mudar ele depois sei la ele me parece bem bugavel */

  const initialAtr = () => {
    const fichasalva = localStorage.getItem("sheet");
    return fichasalva ? JSON.parse(fichasalva) as Atributte : {
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
    };
  };

  const [atr, setAttributes] = useState(initialAtr);

  const AttValue = (name: string, value: number | string | boolean) => {
    setAttributes((prevAtributtes) => ({
      ...prevAtributtes,
      [name]: value,
    }));
  };

  useEffect(() => {
      const fichasalva = localStorage.getItem("sheet");
      console.log("Recuperando do localStorage:", fichasalva);
      if (fichasalva) {
        const dados = JSON.parse(fichasalva);
        setAttributes(dados);
      }
  }, []);

  useEffect(() => {
    console.log("Salvando no localStorage:", atr);
    localStorage.setItem("sheet", JSON.stringify(atr))
  }, [atr])

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
      <div className="w-280 p-14 bg-white border-4 border-[#623a9b] rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black dark:border-[#623a9b]">
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
            <h2 className="text-left justify-between">
              Atributos
              <button  onClick={() => setAtListVisible(true)} />
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
            <div className="flex">
            <Input type="text" name="Aspect_Name" placeholder="Aspect Name"/>
            <Input type="text" name="Aspect_Rank" placeholder="Aspect Rank"/>
            </div>
              <h3>Aspect Description</h3>
              <textarea className="w-full" rows={4} placeholder="Aspect Description"/>
              <h3>Aspect Abilitys</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input type="Text" name="AspAbilitName1" className="w-40" placeholder="Ability Name"/>
                <Label value="-Dormant-" className="font-bold" />
              </div>
              <textarea className="w-full" rows={4} placeholder="Ability Description"/>
            
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
    </>
  );
}

export default App;
