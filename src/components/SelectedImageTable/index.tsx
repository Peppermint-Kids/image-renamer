import { v4 } from "uuid";
import { DataTable } from "../../shadcn/ui/data-table";
import { useDragDrop } from "../DragDropProvider";
import { useImages } from "../ImagesProvider";
import { columns } from "./columns";
import { Button } from "../../shadcn/ui/button";

const downloadImage = (url: string, fileName: string) => {
  const element = document.createElement("a");
  element.href = url;
  element.download = fileName;

  document.body.appendChild(element);
  element.click();
  element.remove();
};

const SelectedImageTable = () => {
  const { renameState, setRenameState, setImages, setStyleParams } =
    useImages();
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
  return (
    <div className=" mx-auto py-6">
      <div>
        <h3 className="mt-2 mb-2">Selected Images</h3>
      </div>
      <DataTable
        columns={columns}
        data={renameState}
        meta={{ removeItem, editItem }}
      />
      <Button
        className="mb-2 mt-4"
        onClick={() => {
          renameState.forEach((rs) => {
            const { styleCode, color, photoType, photoshootType } =
              rs.styleParams;

            rs.frontImages.forEach((img, idx) => {
              downloadImage(
                img.url,
                `${styleCode}-${color}-${photoType}-${photoshootType}-1F${
                  idx + 1
                }.jpg`
              );
            });

            rs.backImages.forEach((img, idx) => {
              downloadImage(
                img.url,
                `${styleCode}-${color}-${photoType}-${photoshootType}-2B${
                  idx + 1
                }.jpg`
              );
            });

            rs.sideImages.forEach((img, idx) => {
              downloadImage(
                img.url,
                `${styleCode}-${color}-${photoType}-${photoshootType}-3S${
                  idx + 1
                }.jpg`
              );
            });

            rs.zoomImages.forEach((img, idx) => {
              downloadImage(
                img.url,
                `${styleCode}-${color}-${photoType}-${photoshootType}-4Z${
                  idx + 1
                }.jpg`
              );
            });

            rs.extraImages.forEach((img, idx) => {
              downloadImage(
                img.url,
                `${styleCode}-${color}-${photoType}-${photoshootType}-5E${
                  idx + 1
                }.${img.file.name.split(".").pop()}`
              );
            });
          });
        }}
      >
        Export
      </Button>
    </div>
  );
};
export default SelectedImageTable;
