import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { ColumnType } from "../../assets/api";
import { Row } from "../Row";
import { RowContainer } from "./ImageGallery.styled";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card";

type Props = {
  column: ColumnType;
};

const ImageGallery: React.FC<Props> = ({ column }) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Image Gallery</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Droppable droppableId={column.id} type="image">
          {(prov: DroppableProvided) => (
            <RowContainer ref={prov.innerRef} {...prov.droppableProps}>
              {column.images.map(
                (image, imageIndex) =>
                  image && (
                    <Row key={image.id} image={image} index={imageIndex} />
                  )
              )}
            </RowContainer>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
