import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { ImageType } from "../../assets";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  height: 50px;
  border: 1px solid;
`;

type Props = {
  image: ImageType;
  index: number;
};

const Row: React.FC<Props> = ({ image, index }) =>
  image && (
    <Draggable draggableId={image.id} index={index}>
      {(provided: DraggableProvided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {image.content}
        </Container>
      )}
    </Draggable>
  );

export default Row;
