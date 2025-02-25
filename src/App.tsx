import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";

function App() {
  return (
    <>
      <div className="box-content w-260 h-200 border-4 p-4 rounded-xl border-purple-500/50">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <h1 className="text-purple-300">Spell</h1>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            <p className="text-left">Teste</p>
            <p className="text-left">Teste</p>
            <p className="text-left">Teste</p>
            <Input name="" type="text" />
            <Input name="" type="text" />
            <Input name="" type="text" />         
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Input name="" type="number" />
            <Input name="" type="number" />
            <Input name="" type="number" />
            </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
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
      </div>
    </>
  );
}

export default App;
