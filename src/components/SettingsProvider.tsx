import React, { useContext } from "react";

import { DialogNonTrigger } from "../shadcn/ui/dialog";
import { SettingsModalContent } from "./SettingsModal";
import { useToast } from "../shadcn/ui/use-toast";

export type SettingsState = {
  asZip: boolean;
  downloadTuner: number;
};

export type MapRow = {
  fgItemNo: string;
  styleNo: string;
  sapColor: string;
  styleCode: string;
  season: "SS" | "AW";
  year: string;
  approvedColor: string;
};

const DEFAULT_SETTINGS_STATE: SettingsState = {
  asZip: true,
  downloadTuner: 2000,
};

type SettingsContextProps = {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  updateSettings: (field: keyof SettingsState, val: number | boolean) => void;
  setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemNoToStyleMap: Map<string, MapRow> | undefined;
  createMap: (file: File) => void;
};
const SettingsContext = React.createContext<SettingsContextProps | undefined>(
  undefined
);
const SettingsProvider: React.FC<{
  defaultSettings?: SettingsState;
  children: React.ReactNode;
}> = ({ children, defaultSettings = DEFAULT_SETTINGS_STATE }) => {
  const [settings, setSettings] =
    React.useState<SettingsState>(defaultSettings);
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [itemNoToStyleMap, setItemNoToStyleMap] =
    React.useState<Map<string, MapRow>>();

  const { toast } = useToast();

  const updateSettings = (
    field: keyof SettingsState,
    val: number | boolean
  ) => {
    setSettings((prevVal) => {
      return {
        ...prevVal,
        [field]: val,
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const csvFileToArray = (text: any) => {
    const csvRows = text.slice(text.indexOf("\n") + 1).split("\n");
    const map = (csvRows as string[]).reduce(
      (acc: Map<string, MapRow>, i: string) => {
        const values = i.split(",");
        const style: MapRow = {
          fgItemNo: values[0].trim(),
          styleNo: values[1].trim(),
          sapColor: values[2].trim(),
          styleCode: values[3].trim(),
          season: values[4].trim() === "Autumn Winter" ? "AW" : "SS",
          year: values[5].trim(),
          approvedColor: values[6].trim(),
        };
        acc.set(values[0].trim().toUpperCase(), style);
        return acc;
      },
      new Map()
    );
    setItemNoToStyleMap(map);
  };

  const createMap = (file: File) => {
    try {
      const fileReader = new FileReader();
      if (file) {
        fileReader.onload = function (event) {
          const text = event?.target?.result;
          csvFileToArray(text);
        };
        fileReader.readAsText(file);
      }
      toast({
        variant: "default",
        title: "Success!",
        description: "CSV uploaded. Map generated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "CSV upload failed. Error during conversion.",
      });
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        setSettingsModalOpen,
        settings,
        setSettings,
        updateSettings,
        itemNoToStyleMap,
        createMap,
      }}
    >
      {children}
      {/* Settings Modal */}
      <DialogNonTrigger
        open={settingsModalOpen}
        content={<SettingsModalContent />}
        onCancel={() => setSettingsModalOpen(false)}
        title="Settings"
      />
    </SettingsContext.Provider>
  );
};
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return context;
}

export default SettingsProvider;
