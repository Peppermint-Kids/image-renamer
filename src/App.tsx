import "./App.css";
import { api } from "./assets";
import { Board, DragDropProvider } from "./components";
import ImagesProvider from "./components/ImagesProvider";
import ImagePicker from "./components/InfoForm/ImagePicker";
import InfoForm from "./components/InfoForm/InfoForm";
import { Toaster } from "./shadcn/ui/toaster";
import SelectedImageTable from "./components/SelectedImageTable";

function App() {
  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      <ImagesProvider defaultImages={[]}>
        <DragDropProvider data={api.columns}>
          <ImagePicker />
          <Board />
          <InfoForm />
          <SelectedImageTable />
        </DragDropProvider>
      </ImagesProvider>
      <Toaster />
    </div>
  );
}

export default App;
