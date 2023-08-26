import React, { useContext } from "react";
import { ImageType } from "../assets";

export type ImageFile = { file: File; url: string };

type ImagedContextProps = {
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
};

const ImagesContext = React.createContext<ImagedContextProps | undefined>(
  undefined
);
const ImagesProvider: React.FC<{
  defaultImages: ImageType[];
  children: React.ReactNode;
}> = ({ children, defaultImages }) => {
  const [images, setImages] = React.useState<ImageType[]>(defaultImages);

  React.useEffect(() => {
    console.log(images);
  }, [images]);
  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
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
