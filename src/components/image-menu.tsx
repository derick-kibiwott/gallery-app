import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisVertical, Folders } from "lucide-react";
import { AlbumDialog } from "./album-dialog";
import { SearchResults } from "@/types";
import Link from "next/link";

export function ImageMenu({ image }: { image: SearchResults }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex gap-1.5" asChild>
          <AlbumDialog image={image}>
            <Folders />
            Add to Album
          </AlbumDialog>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1.5" asChild>
          <Link href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}>
            <Edit /> Edit
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
