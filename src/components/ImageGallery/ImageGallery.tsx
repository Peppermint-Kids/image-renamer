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
} from "./ImageGallery.styled";

type Props = {
  column: ColumnType;
  columnIndex: number;
};

const ImageGallery: React.FC<Props> = ({ column, columnIndex }) => {
  const { rowDropshadowProps } = useDragDrop();

  return (
    <Container>
      <Droppable droppableId={column.id} type="image">
        {(prov: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <RowContainer ref={prov.innerRef} {...prov.droppableProps}>
            {column.images.map((image, imageIndex) => (
              <Row key={image.id} image={image} index={imageIndex} />
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
  );
};

export default ImageGallery;
