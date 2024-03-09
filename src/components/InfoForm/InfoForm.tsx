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
import { ImageFile, useImages } from "../ImagesProvider";
import { useDragDrop } from "../DragDropProvider";
import { useToast } from "../../shadcn/ui/use-toast";
import React from "react";
import { useSettings } from "../SettingsProvider";
import { DialogHeader } from "../../shadcn/ui/dialog";

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

const EMPTY_STYLE = {
  styleCode: "",
  color: "",
  photoshootType: "",
  photoType: "",
  year: "",
  season: "",
};

const InfoForm: React.FC = () => {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    React.useState<boolean>(false);
  const { itemNoToStyleMap, itemMasterMap } = useSettings();
  const [barcode, setBarcode] = React.useState<string>("");
  const { styleParams, setStyleParams, setRenameState } = useImages();
  const { columns, setColumns } = useDragDrop();
  const frontImages = columns[1].images;
  const getImages = (i: number) => columns[i].images.map((i) => i.file);
  const { toast } = useToast();
  const { styleCode, color, photoType, photoshootType, season, year } =
    styleParams;
  const handleFieldChange = (fieldName: string) => (e: any) => {
    let val: string;
    if (typeof e === "string") val = e;
    else val = e.target.value;
    setStyleParams((prevVal) => {
      return { ...prevVal, [fieldName]: val };
    });
  };

  const handleBarcodeChange = (e: any) => {
    const data = itemMasterMap?.get(e.target.value);
    data && setStyleParams((prev) => ({ ...prev, ...data }));
    data && setBarcode("");
  };

  React.useEffect(() => {
    if (frontImages?.[0]) {
      const fileName = frontImages[0]?.file?.file?.name?.toUpperCase();
      const fg_idx = fileName?.indexOf("FG");
      if (fileName && fg_idx >= 0 && itemNoToStyleMap) {
        const itemNumber = fileName.slice(fg_idx, fg_idx + 7);
        const style = itemNoToStyleMap.get(itemNumber);
        if (style)
          setStyleParams((prev) => {
            return {
              ...prev,
              year: style.year + "",
              color: style.approvedColor.split(" ").join(""),
              season: style.season,
              styleCode: style.styleCode,
            };
          });
        else {
          setStyleParams(EMPTY_STYLE);
        }
      }
    } else {
      setStyleParams(EMPTY_STYLE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(frontImages)]);

  const addStyle = () => {
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
    setStyleParams({
      styleCode: "",
      color: "",
      year: "",
      photoType: "",
      photoshootType: "",
      season: "",
    });
  };

  const checkFileNames = (fileName: string) => {
    let files: ImageFile[] = [];
    files = files.concat(getImages(1));
    files = files.concat(getImages(2));
    files = files.concat(getImages(3));
    files = files.concat(getImages(4));
    files = files.concat(getImages(5));

    return files.every(
      (file) => file?.file?.name?.toLocaleUpperCase().includes(fileName)
    );
  };

  const handleAddClicked = () => {
    const missingFields = [];
    if (!season) missingFields.push("Season");
    if (!year) missingFields.push("Year");
    if (!styleCode) missingFields.push("Style Code");
    if (!color) missingFields.push("Color");
    if (!photoType) missingFields.push("Photo Type");
    if (!photoshootType) missingFields.push("Photoshoot Type");

    if (!missingFields.length) {
      const fileName = frontImages[0]?.file?.file?.name?.toUpperCase();
      const fg_idx = fileName?.indexOf("FG");
      const itemNumber = fileName?.slice(fg_idx, fg_idx + 7);

      if (
        !fileName ||
        (fg_idx >= 0 &&
          itemNoToStyleMap?.has(itemNumber) &&
          checkFileNames(itemNumber)) ||
        fg_idx < 0
      ) {
        addStyle();
      } else {
        setConfirmationModalOpen(true);
      }
    } else {
      toast({
        variant: "destructive",
        title: "All fields are required!",
        description: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? " are" : " is"
        } missing.`,
      });
    }
  };

  // const closeModal = (e) => {
  //   setConfirmationModalOpen(false);
  // };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex gap-4 mt-4">
        <div>
          <Label htmlFor="season">Scan barcode</Label>
          <Input
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value);
            }}
            onBlur={handleBarcodeChange}
          />
        </div>
      </div>
      <div className="flex gap-4 pb-4 mt-4">
        <div>
          <Label htmlFor="season">
            Season
            {!season && <p className="text-red-500 inline ml-2">**required</p>}
          </Label>
          <Select value={season} onValueChange={handleFieldChange("season")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SS">Spring Summer</SelectItem>
              <SelectItem value="AW">Autumn Winter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="year">
            Year
            {!year && <p className="text-red-500 inline ml-2">**required</p>}
          </Label>
          <Select value={year} onValueChange={handleFieldChange("year")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
              <SelectItem value="2018">2018</SelectItem>
              <SelectItem value="2017">2017</SelectItem>
              <SelectItem value="2016">2016</SelectItem>
              <SelectItem value="2015">2015</SelectItem>
              <SelectItem value="2014">2014</SelectItem>
              <SelectItem value="2013">2013</SelectItem>
              <SelectItem value="2012">2012</SelectItem>
              <SelectItem value="2011">2011</SelectItem>
              <SelectItem value="2010">2010</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 pb-4 ">
        <div>
          <Label htmlFor="styleCode">
            Style Code
            {!styleCode && (
              <p className="text-red-500 inline ml-2">**required</p>
            )}
          </Label>
          <Input value={styleCode} onChange={handleFieldChange("styleCode")} />
        </div>
        <div>
          <Label htmlFor="color">
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
          <Label htmlFor="photoType">
            Photo Type
            {!photoType && (
              <p className="text-red-500 inline ml-2">**required</p>
            )}
          </Label>
          <Select
            value={photoType}
            onValueChange={handleFieldChange("photoType")}
          >
            <SelectTrigger className="w-[220px]">
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
          <Label htmlFor="photoshootType">
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
      {confirmationModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            background: "#ffffffcc",
          }}
        >
          <div
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
            style={{}}
            onClick={() => {
              setConfirmationModalOpen(false);
            }}
          >
            <h2
              id="radix-:r95:"
              className="text-lg font-semibold leading-none tracking-tight"
            >
              Add style?
            </h2>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <DialogHeader>
                Some of file names doesn't have item number same as the first
                file. Do you still want to add the style?
              </DialogHeader>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                onClick={() => {
                  addStyle();
                  setConfirmationModalOpen(false);
                }}
              >
                Add style
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => setConfirmationModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoForm;
