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

const SelectedImageTable = () => {
  const { renameState, setRenameState, setImages, setStyleParams } =
    useImages();
  const { setColumns } = useDragDrop();
  const [asZip, setAsZip] = React.useState(true);
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
      : downloadImageArray(getImagesFromRenameState(images));
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
      : downloadImageArray(renamedImageArray);
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
      <div>
        <Button className="mb-2 mt-4" onClick={handleExport}>
          Download
        </Button>
        <div className="inline items-center space-x-2 relative ml-2">
          <Checkbox
            className="mt-1 absolute "
            style={{ top: "-2px" }}
            checked={asZip}
            onCheckedChange={(a) => setAsZip(a)}
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
      </div>
    </div>
  );
};
export default SelectedImageTable;
