import React, { useContext, useState } from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { ColumnType } from "../assets";
import { useImages } from "./ImagesProvider";

type DragDropProps = (
  source: DraggableLocation,
  destination: DraggableLocation
) => void;

type DragDropContextProps = {
  handleNewColumn: (newName: string) => void;
  handleRemoveImage: (rowIndex: number, colIndex: number) => void;
  handleDeleteColumn: (colIndex: number) => void;
  handleDragEnd: (result: DropResult) => void;
  handleDragStart: (event: any) => void;
  handleDragUpdate: (event: any) => void;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
};

const DragDropContext = React.createContext<DragDropContextProps | undefined>(
  undefined
);

const DragDropProvider: React.FC<{
  data: ColumnType[];
  children: React.ReactNode;
}> = ({ children, data }) => {
  const [columns, setColumns] = useState<ColumnType[]>(data);
  const { images, setImages } = useImages();

  React.useEffect(() => {
    if (images && images.length) {
      setColumns((prevColumns) => {
        const galleryColumn = prevColumns.find(
          (col) => col.id === "image-gallery"
        );
        if (galleryColumn) {
          galleryColumn.images = [
            ...images.map((i) => {
              return {
                id: v4(),
                file: i,
                angle: "",
              };
            }),
          ];
        }
        console.log("sdfkjn", prevColumns);
        return [...prevColumns];
      });
    }
  }, [images]);

  // handling movement of row in the same column
  // [[],[]],[]
  const moveRowSameColumn: DragDropProps = (source, destination) => {
    // moving images in same column
    setColumns((prev) => {
      const updated = [...prev];
      // isolate the row of the column we want to adjust
      const [{ images }] = updated.filter(
        ({ id }) => id === source.droppableId
      );
      // remove the source item
      const [removed] = images.splice(source.index, 1);
      // insert the source item at the new colIndex
      images.splice(destination.index, 0, removed);
      return updated;
    });
  };

  // handling movement of row between columns
  const moveRowDifferentColumn: DragDropProps = (source, destination) => {
    // moving images between columns
    setColumns((prev) => {
      // filter out which column is the source and which is the destination
      const updated = [...prev];
      const [sourceColumn] = updated.filter(
        ({ id }) => id === source.droppableId
      );
      const [destinationColumn] = updated.filter(
        ({ id }) => id === destination.droppableId
      );

      // extract the images from the columnn
      const sourceRow = sourceColumn.images;
      const destinationRow = destinationColumn.images;

      // remove the source item
      const [removed] = sourceRow.splice(source.index, 1);

      setImages((prevImages) => {
        return prevImages.filter((i) => i !== removed.file);
      });

      // insert the source item at the new colIndex
      destinationRow.splice(destination.index, 0, removed);

      return updated;
    });
  };

  // determining if its diff col or same col for row movement
  const handleRowMove: DragDropProps = (source, destination) => {
    // droppableId is in reference to what column it is so if they are the same,
    // then both droppableId's are the same,
    // if its diff columns then they not the same
    // btw since columns are dynamically instantiated, the droppableId i used is uuid

    if (source.droppableId !== destination.droppableId) {
      moveRowDifferentColumn(source, destination);
    } else {
      moveRowSameColumn(source, destination);
    }
  };

  // move columns
  const handleColumnMove: DragDropProps = (source, destination) =>
    // rememeber that source and dest are just { draggableId, index }
    // moving columns (:
    setColumns((prev) => {
      const updated = [...prev];
      // remove source column
      const [removed] = updated.splice(source.index, 1);
      // insert source column at new destination
      updated.splice(destination.index, 0, removed);
      return updated;
    });

  const handleDragUpdate = () => {};

  const handleDragStart = () => {};

  const handleDragEnd = (result: DropResult) => {
    // if there is no destination, theres nothing to manipulate so lets
    // nope out of there REAL quick
    if (!result.destination) return;
    // we only care about source and destination so lets just grab those
    const { source, destination } = result;
    // if our droppableId is all-columns that means that we are
    // dragging columns around because remember we did not have to
    // dynamically instantiate our top level droppable so we hard coded
    // the id
    if (source.droppableId === "all-columns") {
      // we go this function to handle the column movement
      handleColumnMove(source, destination);
    } else {
      // else its a row move so we go here
      handleRowMove(source, destination);
    }
  };

  const handleDeleteColumn = (colIndex: number) =>
    setColumns((prev) => {
      const updated = [...prev];
      updated.filter((_data, rowIndex) => rowIndex !== colIndex);
      return updated;
    });

  const handleRemoveImage = (rowIndex: number, colIndex: number) => {
    setColumns((prev) => {
      const updated = [...prev];
      updated[colIndex].images.splice(rowIndex, 1);
      return updated;
    });
  };

  const handleNewColumn = (newName: string) => {
    setColumns((prev) => {
      const updated = [...prev];
      return [
        ...updated,
        {
          id: v4(),
          title: newName,
          images: [],
        },
      ];
    });
  };

  return (
    <DragDropContext.Provider
      value={{
        handleNewColumn,
        handleRemoveImage,
        handleDeleteColumn,
        handleDragEnd,
        handleDragStart,
        handleDragUpdate,
        columns,
        setColumns,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used inside DragDropProvider");
  }

  return context;
}

export default DragDropProvider;
