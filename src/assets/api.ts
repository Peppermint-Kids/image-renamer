import { v4 } from "uuid";

export type ImageType = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  images: ImageType[];
};

export type ImageBoardType = {
  columns: ColumnType[];
};

export const api: ImageBoardType = {
  columns: [
    {
      id: "image-gallery",
      title: "Image Gallery",
      images: [],
    },
    {
      id: "front-images",
      title: "Front",
      images: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: "back-images",
      title: "Back",
      images: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: "side-images",
      title: "Side",
      images: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: "zoom-images",
      title: "Zoom",
      images: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
    {
      id: "extra-images",
      title: "Extras",
      images: [
        { content: "item1", id: v4() },
        { content: "item2", id: v4() },
        { content: "item3", id: v4() },
      ],
    },
  ],
};
