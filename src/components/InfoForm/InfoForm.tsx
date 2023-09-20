import { Button } from "../../shadcn/ui/button";
import { Input } from "../../shadcn/ui/input";
import { Label } from "../../shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/ui/select";
import { useImages } from "../ImagesProvider";
import { useDragDrop } from "../DragDropProvider";
import { useToast } from "../../shadcn/ui/use-toast";
import React from "react";

const COLOR_ARRAY = [
  { label: "Beige", value: "Beige" },
  { label: "Black", value: "Black" },
  { label: "Blue", value: "Blue" },
  { label: "Blush", value: "Blush" },
  { label: "Brown", value: "Brown" },
  { label: "Camel", value: "Camel" },
  { label: "Champagne", value: "Champagne" },
  { label: "Copper", value: "Copper" },
  { label: "Coral", value: "Coral" },
  { label: "Cream", value: "Cream" },
  { label: "Dark Green", value: "DarkGreen" },
  { label: "Light Brown", value: "LightBrown" },
  { label: "Fawn", value: "Fawn" },
  { label: "Fuchsia", value: "Fuchsia" },
  { label: "Gold", value: "Gold" },
  { label: "Green", value: "Green" },
  { label: "Grey", value: "Grey" },
  { label: "Indigo", value: "Indigo" },
  { label: "Khaki", value: "Khaki" },
  { label: "Lavender", value: "Lavender" },
  { label: "Lilac", value: "Lilac" },
  { label: "Maroon", value: "Maroon" },
  { label: "Mauve", value: "Mauve" },
  { label: "Multi", value: "Multi" },
  { label: "Mustard", value: "Mustard" },
  { label: "Navy Blue", value: "NavyBlue" },
  { label: "Neon Green", value: "NeonGreen" },
  { label: "Neon Orange", value: "NeonOrange" },
  { label: "Neon Pink", value: "NeonPink" },
  { label: "Off White", value: "OffWhite" },
  { label: "Olive Green", value: "OliveGreen" },
  { label: "Orange", value: "Orange" },
  { label: "Peach", value: "Peach" },
  { label: "Pink", value: "Pink" },
  { label: "Pista", value: "Pista" },
  { label: "Purple", value: "Purple" },
  { label: "Red", value: "Red" },
  { label: "Rust", value: "Rust" },
  { label: "Sea Green", value: "SeaGreen" },
  { label: "Silver", value: "Silver" },
  { label: "Sky Blue", value: "SkyBlue" },
  { label: "Teal Blue", value: "TealBlue" },
  { label: "Turquoise Blue", value: "TurquoiseBlue" },
  { label: "Violet", value: "Violet" },
  { label: "White", value: "White" },
  { label: "Wine", value: "Wine" },
  { label: "Yellow", value: "Yellow" },
];

const EMPTY_COLUMNS = [
  {
    id: "front-images",
    title: "Front",
    images: [],
  },
  {
    id: "back-images",
    title: "Back",
    images: [],
  },
  {
    id: "side-images",
    title: "Side",
    images: [],
  },
  {
    id: "zoom-images",
    title: "Zoom",
    images: [],
  },
  {
    id: "extra-images",
    title: "Extras",
    images: [],
  },
];

const InfoForm: React.FC = () => {
  const { styleParams, setStyleParams, renameState, setRenameState } =
    useImages();
  const { columns, setColumns } = useDragDrop();
  const getImages = (i: number) => columns[i].images.map((i) => i.file);
  const { toast } = useToast();
  const { styleCode, color, photoType, photoshootType } = styleParams;
  const handleFieldChange = (fieldName: string) => (e: any) => {
    let val: string;
    if (typeof e === "string") val = e;
    else val = e.target.value;
    setStyleParams((prevVal) => {
      return { ...prevVal, [fieldName]: val };
    });
  };

  React.useEffect(() => {
    renameState.forEach((rs) => {
      console.log(
        rs.styleParams.styleCode,
        rs.styleParams.color,
        rs.styleParams.photoType,
        rs.styleParams.photoshootType,
        rs.frontImages.length,
        rs.backImages.length,
        rs.sideImages.length,
        rs.zoomImages.length,
        rs.extraImages.length
      );
    });
  }, [renameState]);

  const handleAddClicked = () => {
    if (styleCode && color && photoType && photoshootType) {
      setRenameState((prevState) => [
        ...prevState,
        {
          styleParams,
          frontImages: getImages(1),
          backImages: getImages(2),
          sideImages: getImages(3),
          zoomImages: getImages(4),
          extraImages: getImages(5),
        },
      ]);
      setColumns((prevState) => [
        prevState[0],
        ...EMPTY_COLUMNS.map((i) => {
          i.images = [];
          return i;
        }),
      ]);
      setStyleParams({ styleCode: "", color: "", photoshootType, photoType });
    } else {
      const missingFields = [];
      if (!styleCode) missingFields.push("Style Code");
      if (!color) missingFields.push("Color");
      if (!photoType) missingFields.push("Photo Type");
      if (!photoshootType) missingFields.push("Photoshoot Type");
      toast({
        variant: "destructive",
        title: "All fields are required!",
        description: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? " are" : " is"
        } missing.`,
      });
    }
  };

  return (
    <div className="flex gap-4 pb-4 mt-4">
      <div>
        <Label htmlFor="picture">
          Style Code
          {!styleCode && <p className="text-red-500 inline ml-2">**required</p>}
        </Label>
        <Input value={styleCode} onChange={handleFieldChange("styleCode")} />
      </div>
      <div>
        <Label htmlFor="picture">
          Color
          {!color && <p className="text-red-500 inline ml-2">**required</p>}
        </Label>
        <Select value={color} onValueChange={handleFieldChange("color")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ maxHeight: 300 }}>
            {COLOR_ARRAY.map((color) => (
              <SelectItem value={color.value}>{color.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="picture">
          Photo Type
          {!photoType && <p className="text-red-500 inline ml-2">**required</p>}
        </Label>
        <Select
          value={photoType}
          onValueChange={handleFieldChange("photoType")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="G">Grey/White Background</SelectItem>
            <SelectItem value="P">Poster</SelectItem>
            <SelectItem value="R">Raw</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="picture">
          Photoshoot Type
          {!photoshootType && (
            <p className="text-red-500 inline ml-2">**required</p>
          )}
        </Label>
        <Select
          value={photoshootType}
          onValueChange={handleFieldChange("photoshootType")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="H">Hanger</SelectItem>
            <SelectItem value="M">Model</SelectItem>
            <SelectItem value="T">Table Top</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <Button
          className="mt-auto absolute bottom-0"
          onClick={handleAddClicked}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default InfoForm;
