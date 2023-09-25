import { ColumnDef } from "@tanstack/react-table";
import { RenameState } from "../ImagesProvider";

import {
  MoreHorizontal,
  Trash,
  Edit,
  Download,
  FolderDown,
} from "lucide-react";

import { Button } from "../../shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shadcn/ui/dropdown";

export const columns: ColumnDef<RenameState>[] = [
  {
    id: "styleCode",
    accessorFn: (row) => row.styleParams.styleCode,
    header: "Style Code",
  },
  {
    id: "color",
    accessorFn: (row) => row.styleParams.color,
    header: "Color",
  },
  {
    id: "photoType",
    accessorFn: (row) => row.styleParams.photoType,
    header: "Photo Type",
  },
  {
    id: "photoshootType",
    accessorFn: (row) => row.styleParams.photoshootType,
    header: "Photoshoot Type",
  },
  {
    id: "frontImages",
    accessorFn: (row) => row.frontImages.length,
    header: "Front Images",
  },
  {
    id: "backImages",
    accessorFn: (row) => row.backImages.length,
    header: "Back Images",
  },
  {
    id: "sideImages",
    accessorFn: (row) => row.sideImages.length,
    header: "Side Images",
  },
  {
    id: "zoomImages",
    accessorFn: (row) => row.zoomImages.length,
    header: "Zoom Images",
  },
  {
    id: "extrasImages",
    accessorFn: (row) => row.extraImages.length,
    header: "Extras Images",
  },

  {
    id: "actions",
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                (
                  table.options.meta as unknown as {
                    editItem: (idx: number) => void;
                  }
                )?.editItem(row.index);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                (
                  table.options.meta as unknown as {
                    exportItem: (idx: number) => void;
                  }
                )?.exportItem(row.index);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                (
                  table.options.meta as unknown as {
                    exportItem: (idx: number, asZip?: boolean) => void;
                  }
                )?.exportItem(row.index, true);
              }}
            >
              <FolderDown className="h-4 w-4 mr-2" />
              Download as .zip
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                (
                  table.options.meta as unknown as {
                    removeItem: (idx: number) => void;
                  }
                ).removeItem(row.index);
              }}
            >
              <Trash className="h-4 w-4 mr-2" color="red" />
              <p className="text-red-600">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
