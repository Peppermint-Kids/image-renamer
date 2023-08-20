import { v4 } from "uuid";

export type TaskType = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type TaskBoardType = {
  columns: ColumnType[];
};

export const api: TaskBoardType = {
  columns: [
    {
      id: v4(),
      title: "Front",
      tasks: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: v4(),
      title: "Back",
      tasks: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: v4(),
      title: "Side",
      tasks: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: v4(),
      title: "Zoom",
      tasks: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: v4(),
      title: "Extras",
      tasks: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
  ],
};
