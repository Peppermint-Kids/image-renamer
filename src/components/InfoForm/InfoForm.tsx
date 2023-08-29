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
  { label: "Pink", value: "Pink" },
  { label: "Navy Blue", value: "NavyBlue" },
  { label: "Beige", value: "Beige" },
  { label: "Mauve", value: "Mauve" },
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
    <div className="flex gap-4 pb-4">
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
          <SelectContent>
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
            <SelectItem value="G">Gray background</SelectItem>
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
