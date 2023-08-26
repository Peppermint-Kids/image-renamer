import React from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { useDragDrop } from "../DragDropProvider";
import { Container } from "./Board.styled";
import ImageGallery from "../ImageGallery/ImageGallery";

const Board: React.FC = () => {
  const { handleDragEnd, handleDragStart, handleDragUpdate, columns } =
    useDragDrop();

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ImageGallery key={columns[0].id} column={columns[0]} />
            </div>
            <Container
              id="image-board"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.slice(1).map((column, columnIndex) => (
                <Column
                  key={column.id}
                  column={column}
                  columnIndex={columnIndex + 1}
                />
              ))}
              {provided.placeholder}
            </Container>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
