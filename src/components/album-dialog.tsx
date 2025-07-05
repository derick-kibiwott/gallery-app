"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Folders, Loader2 } from "lucide-react";
import { SearchResults } from "@/types";
import { addImageToAlbum } from "@/actions/album";
import { toast } from "sonner";

type AlbumDialogProps = {
  children: React.ReactNode;
  image: SearchResults;
};

export function AlbumDialog({ children, image }: AlbumDialogProps) {
  const [albumName, setAlbumName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!albumName.trim()) return; // Prevent submission if albumName is empty
    setIsLoading(true);
    startTransition(async () => {
      try {
        const response = await addImageToAlbum(image, albumName);
        setIsLoading(false);
        if (response.status === 200) {
          toast.success(response.message);
          setAlbumName(""); // Reset input after success
          setOpenDialog(false); // Close dialog on success
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("An error occurred while adding the image to the album.");
      }
    });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <span onClick={() => setOpenDialog(true)}>{children}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-1.5 items-center">
            <Folders aria-hidden="true" />
            Add to Album
          </DialogTitle>
          <DialogDescription className="text-start">
            Type an album which you want to move this image to.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 mb-4">
            <Label htmlFor="album-name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => setAlbumName(e.target.value)}
              id="album-name"
              value={albumName}
              placeholder="Enter album name"
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!albumName.trim() || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" aria-hidden="true" />
                  Creating Album...
                </>
              ) : (
                <>
                  <Check className="mr-2" aria-hidden="true" />
                  Add to Album
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
