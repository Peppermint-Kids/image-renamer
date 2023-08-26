import "./App.css";
import { api } from "./assets";
import { Board, DragDropProvider } from "./components";
import ImagesProvider from "./components/ImagesProvider";
import ImagePicker from "./components/InfoForm/ImagePicker";
import InfoForm from "./components/InfoForm/InfoForm";

function App() {
  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      <ImagesProvider defaultImages={[]}>
        <DragDropProvider data={api.columns}>
          <ImagePicker />
          <InfoForm />
          <Board />
        </DragDropProvider>
      </ImagesProvider>
    </div>
  );
}

export default App;
