import React, { useContext } from "react";

export type ImageFile = { file: File; url: string };

type StylesParams = {
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
    styleCode: "",
    color: "",
    photoshootType: "",
    photoType: "",
  });

  const [renameState, setRenameState] = React.useState<RenameState[]>([]);

  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
        styleParams,
        setStyleParams,
        renameState,
        setRenameState,
      }}
    >
      {children}
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
