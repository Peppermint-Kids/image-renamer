import { v4 } from "uuid";
import { DataTable } from "../../shadcn/ui/data-table";
import { useDragDrop } from "../DragDropProvider";
import { useImages } from "../ImagesProvider";
import { columns } from "./columns";
import { Button } from "../../shadcn/ui/button";
import {
  DownloadImage,
  downloadImageArray,
  downloadImageArrayAsZip,
} from "../../utils/downloading";
import React from "react";
import { Checkbox } from "../../shadcn/ui/checkbox";
import { ZapIcon } from "lucide-react";
import { getImagesFromRenameState } from "../../utils/renaming";
import { Input } from "../../shadcn/ui/input";

const SelectedImageTable = () => {
  const { renameState, setRenameState, setImages, setStyleParams } =
    useImages();
  const { setColumns } = useDragDrop();
  const [asZip, setAsZip] = React.useState(true);
  const [downloadTuner, setDownloadTuner] = React.useState(2000);
  const removeItem = (idx: number) => {
    setRenameState((prevState) => {
      const [removedState] = prevState.splice(idx, 1);
      setImages((prevImages) => {
        return [
          ...prevImages,
          ...removedState.frontImages,
          ...removedState.backImages,
          ...removedState.sideImages,
          ...removedState.zoomImages,
          ...removedState.extraImages,
        ];
      });
      return [...prevState];
    });
  };
  const editItem = (idx: number) => {
    setRenameState((prevState) => {
      const [removedState] = prevState.splice(idx, 1);
      setStyleParams(removedState.styleParams);
      setColumns((prevColumns) => {
        prevColumns[1].images = removedState.frontImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[2].images = removedState.backImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[3].images = removedState.sideImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[4].images = removedState.zoomImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        prevColumns[5].images = removedState.extraImages.map((i) => {
          return { file: i, id: v4(), angle: "" };
        });
        return [...prevColumns];
      });
      return [...prevState];
    });
  };

  const exportItem = (idx: number, asZip?: boolean) => {
    const images = renameState[idx];
    asZip
      ? downloadImageArrayAsZip(getImagesFromRenameState(images))
      : downloadImageArray(getImagesFromRenameState(images), downloadTuner);
  };

  const handleExport = () => {
    let renamedImageArray: DownloadImage[] = [];
    renameState.forEach((rs) => {
      renamedImageArray = renamedImageArray.concat(
        getImagesFromRenameState(rs)
      );
    });
    asZip
      ? downloadImageArrayAsZip(renamedImageArray)
      : downloadImageArray(renamedImageArray, downloadTuner);
  };
  return (
    <div className=" mx-auto py-6">
      <div>
        <h3 className="mt-2 mb-2">Selected Images</h3>
      </div>
      <DataTable
        columns={columns}
        data={renameState}
        meta={{ removeItem, editItem, exportItem }}
      />
      <div className="flex items-center">
        <Button className="mb-2 mt-4" onClick={handleExport}>
          Download
        </Button>
        <div className="inline items-center space-x-2 relative ml-2 flex-1">
          <Checkbox
            className="mt-1 absolute "
            style={{ top: "0px" }}
            checked={asZip}
            onCheckedChange={(a) => {
              setAsZip(a === "indeterminate" ? true : a);
            }}
          />
          <label
            onClick={() => {
              setAsZip((prev) => !prev);
            }}
            className="ml-16"
            style={{ marginLeft: "20px" }}
          >
            Download as zip. (quick <ZapIcon size={14} className="inline" />)
          </label>
        </div>
        <Input
          type="number"
          id="downloadTuner"
          placeholder="downloadTuner"
          className="w-[200px] inline"
          value={downloadTuner}
          step={100}
          min={300}
          onBlur={(e) => {
            const val = Number(e.target.value);
            setDownloadTuner(val < 1000 ? 1000 : val);
          }}
          onChange={(e) => {
            const val = Number(e.target.value);
            setDownloadTuner(val);
          }}
        />
      </div>
    </div>
  );
};
export default SelectedImageTable;
