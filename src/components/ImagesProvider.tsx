import React, { useContext } from "react";
import { DialogNonTrigger } from "../shadcn/ui/dialog";

export type ImageFile = { file: File; url: string };

type StylesParams = {
  season: string;
  year: string;
  styleCode: string;
  color: string;
  photoType: string;
  photoshootType: string;
};

export type RenameState = {
  styleParams: StylesParams;
  frontImages: ImageFile[];
  backImages: ImageFile[];
  sideImages: ImageFile[];
  zoomImages: ImageFile[];
  extraImages: ImageFile[];
};

type ImagedContextProps = {
  images: ImageFile[];
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  styleParams: StylesParams;
  setStyleParams: React.Dispatch<React.SetStateAction<StylesParams>>;
  renameState: RenameState[];
  setRenameState: React.Dispatch<React.SetStateAction<RenameState[]>>;
  setSelectedImageURL: React.Dispatch<React.SetStateAction<string | null>>;
};
const ImagesContext = React.createContext<ImagedContextProps | undefined>(
  undefined
);
const ImagesProvider: React.FC<{
  defaultImages: ImageFile[];
  children: React.ReactNode;
}> = ({ children, defaultImages }) => {
  const [images, setImages] = React.useState<ImageFile[]>(defaultImages);
  const [styleParams, setStyleParams] = React.useState<StylesParams>({
    year: "",
    season: "",
    styleCode: "",
    color: "",
    photoshootType: "",
    photoType: "",
  });

  const [renameState, setRenameState] = React.useState<RenameState[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedImageURL, setSelectedImageURL] = React.useState<string | null>(
    null
  );
  const onZoomModalCancel = () => {
    setSelectedImageURL(null);
    setOpen(false);
  };

  React.useEffect(() => {
    if (selectedImageURL) {
      setOpen(true);
    }
  }, [selectedImageURL]);

  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
        styleParams,
        setStyleParams,
        renameState,
        setRenameState,
        setSelectedImageURL,
      }}
    >
      {children}
      <DialogNonTrigger
        open={open}
        content={<img src={selectedImageURL ?? ""} />}
        onCancel={onZoomModalCancel}
      />
    </ImagesContext.Provider>
  );
};
export function useImages() {
  const context = useContext(ImagesContext);
  if (context === undefined) {
    throw new Error("useImages must be used inside ImagesProvider");
  }
  return context;
}

export default ImagesProvider;
