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
import { getImagesFromRenameState } from "../../utils/renaming";
import { useSettings } from "../SettingsProvider";

const SelectedImageTable = () => {
  const { renameState, setRenameState, setImages, setStyleParams } =
    useImages();
  const { settings } = useSettings();
  const { setColumns } = useDragDrop();

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
      : downloadImageArray(
          getImagesFromRenameState(images),
          settings.downloadTuner
        );
  };

  const handleExport = () => {
    let renamedImageArray: DownloadImage[] = [];
    renameState.forEach((rs) => {
      renamedImageArray = renamedImageArray.concat(
        getImagesFromRenameState(rs)
      );
    });
    settings.asZip
      ? downloadImageArrayAsZip(renamedImageArray)
      : downloadImageArray(renamedImageArray, settings.downloadTuner);
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
      </div>
    </div>
  );
};
export default SelectedImageTable;
