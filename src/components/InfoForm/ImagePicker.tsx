import React from "react";
import { Input } from "../../shadcn/ui/input";
import { Label } from "../../shadcn/ui/label";
import { ImageFile, useImages } from "../ImagesProvider";

const ImagePicker: React.FC = () => {
  const { setImages } = useImages();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const images = e.target.files;
    let a: ImageFile[] = [];
    if (images && images[0]) {
      for (let i = 0; i < images.length; i++) {
        a = [...a, { file: images[i], url: URL.createObjectURL(images[i]) }];
      }

      setImages((prevImages) => {
        return [...prevImages, ...a];
      });
    }
  };
  return (
    <div className="mt-4 mb-4">
      <Label htmlFor="picture">Upload Images</Label>
      <Input
        id="picture"
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImagePicker;
