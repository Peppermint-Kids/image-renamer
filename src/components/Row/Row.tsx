import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { ImageType } from "../../assets";
import { AspectRatio } from "../../shadcn/ui/aspect-ratio";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  width: 100%;
  max-height: 133px;
  border: 1px solid;
  overflow: hidden;
`;

const ImageDisplay = styled.img`
  object-fit: contain;
  width: 100px;
  height: 100%;
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
          <AspectRatio ratio={3 / 4}>
            <ImageDisplay src={image.file.url} />
          </AspectRatio>
        </Container>
      )}
    </Draggable>
  );

export default Row;
