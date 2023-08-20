import "./App.css";
import { api } from "./assets";
import { Board, DragDropProvider } from "./components";
import InfoForm from "./components/InfoForm";

function App() {
  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      <InfoForm />
      <DragDropProvider data={api.columns}>
        <Board />
      </DragDropProvider>
    </div>
  );
}

export default App;
