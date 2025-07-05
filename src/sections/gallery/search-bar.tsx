import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SearchBar() {
  return (
    <form>
      <div className="flex items-center gap-3 mb-4">
        <Label htmlFor="album-name" className="text-right">
          Album
        </Label>
        <Input id="album-name" placeholder="Enter album name" />
      </div>
      <Button type="button">Search</Button>
    </form>
  );
}
