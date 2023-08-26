import { Button } from "../../shadcn/ui/button";
import { Input } from "../../shadcn/ui/input";
import { Label } from "../../shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/ui/select";

const COLOR_ARRAY = [
  { label: "Pink", value: "Pink" },
  { label: "Navy Blue", value: "NavyBlue" },
  { label: "Beige", value: "Beige" },
  { label: "Mauve", value: "Mauve" },
];

const InfoForm: React.FC = () => {
  return (
    <div className="flex gap-4 pb-4">
      <div>
        <Label htmlFor="picture">Style Code</Label>
        <Input />
      </div>
      <div>
        <Label htmlFor="picture">Color</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COLOR_ARRAY.map((color) => (
              <SelectItem value={color.label}>{color.value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="picture">Photo Type</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="G">Gray background</SelectItem>
            <SelectItem value="P">Poster</SelectItem>
            <SelectItem value="R">Raw</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="picture">Photoshoot Type</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="H">Hanger</SelectItem>
            <SelectItem value="M">Model</SelectItem>
            <SelectItem value="T">Table Top</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <Button className="mt-auto absolute bottom-0">Add</Button>
      </div>
    </div>
  );
};

export default InfoForm;
