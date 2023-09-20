import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { ImageType } from "../../assets";
import { AspectRatio } from "../../shadcn/ui/aspect-ratio";
import { useImages } from "../ImagesProvider";
import { Cross2Icon } from "@radix-ui/react-icons";

const Container = styled.div`
  position: relative;
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

const DeteleIconContainer = styled.div`
  padding: 1px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

type Props = {
  image: ImageType;
  index: number;
  columnId?: string;
};

const Row: React.FC<Props> = ({ image, index, columnId }) => {
  console.log("🚀 ~ file: Row.tsx:31 ~ index:", index);
  const { setSelectedImageURL } = useImages();
  return (
    image && (
      <Draggable draggableId={image.id} index={index}>
        {(provided: DraggableProvided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {columnId === "image-gallery" && (
              <DeteleIconContainer
                onClick={() => {
                  console.log(columnId);
                }}
              >
                <Cross2Icon width={16} />
              </DeteleIconContainer>
            )}
            <AspectRatio
              ratio={3 / 4}
              onClick={() => {
                setSelectedImageURL(image.file.url);
              }}
            >
              <ImageDisplay src={image.file.url} />
            </AspectRatio>
          </Container>
        )}
      </Draggable>
    )
  );
};

export default Row;
