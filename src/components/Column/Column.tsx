import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { ColumnType } from "../../assets/api";
import { Row } from "../Row";
import { RowContainer } from "./Column.styled";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card";

type Props = {
  column: ColumnType;
  columnIndex: number;
};

const Column: React.FC<Props> = ({ column }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <Droppable droppableId={column.id} type="image">
          {(prov: DroppableProvided) => (
            <RowContainer ref={prov.innerRef} {...prov.droppableProps}>
              {column.images.map((image, imageIndex) => (
                <Row key={image?.id} image={image} index={imageIndex} />
              ))}
            </RowContainer>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default Column;
