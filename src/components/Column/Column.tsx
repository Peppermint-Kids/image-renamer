import React from "react";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { ColumnType } from "../../assets/api";
import { useDragDrop } from "../DragDropProvider";
import { Row } from "../Row";
import {
  Container,
  DropshadowContainer,
  RowContainer,
  RowDropshadow,
  Title,
  TitleContainer,
} from "./Column.styled";

type Props = {
  column: ColumnType;
  columnIndex: number;
};

const Column: React.FC<Props> = ({ column, columnIndex }) => {
  const { rowDropshadowProps } = useDragDrop();

  return (
    //  <Draggable draggableId={column.id} index={columnIndex}>
    //    {(provided: DraggableProvided) => (
    <Container>
      <TitleContainer>
        <Title>{column.title}</Title>
      </TitleContainer>
      <Droppable droppableId={column.id} type="image">
        {(prov: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <RowContainer ref={prov.innerRef} {...prov.droppableProps}>
            {column.images.map((image, imageIndex) => (
              <Row key={image?.id} image={image} index={imageIndex} />
            ))}
            {prov.placeholder}
            <DropshadowContainer>
              {snapshot.isDraggingOver && (
                <RowDropshadow
                  marginTop={rowDropshadowProps.marginTop}
                  height={rowDropshadowProps.height}
                />
              )}
            </DropshadowContainer>
          </RowContainer>
        )}
      </Droppable>
    </Container>
    //    )}
    //  </Draggable>
  );
};

export default Column;
