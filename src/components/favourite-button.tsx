"use client";

import { Heart } from "lucide-react"; // Assuming you're using lucide-react for icons
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { setFavourite, removeFavourite } from "@/app/gallery/actions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

type HeartIconProps = {
  className?: string;
  publicId: string;
  filled?: boolean;
};

export function HeartIcon({
  className,
  publicId,
  filled = false,
}: HeartIconProps) {
  const path = usePathname();
  const [isLiked, setIsLiked] = useState(filled);
  const [transition, startTransition] = useTransition();

  const handleClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    if (newIsLiked) {
      startTransition(async () => {
        const response = await setFavourite(publicId, path);
        if (response.status === 200) {
          toast.success(response.message);
        } else {
          // Revert state on error
          setIsLiked(false);
          toast.error(response.message);
        }
      });
    } else {
      startTransition(async () => {
        const response = await removeFavourite(publicId, path);
        if (response.status === 200) {
          toast.success(response.message);
        } else {
          // Revert state on error
          setIsLiked(false);
          toast.error(response.message);
        }
      });
    }
  };

  return (
    <Heart
      className={cn(
        `
          absolute top-4 right-4 cursor-pointer
          ${isLiked ? "fill-red-500 text-red-500" : "fill-none text-gray-200"}
          ${isLiked && "animate-pulse-once"}
        `,
        className
      )}
      onClick={handleClick}
    />
  );
}
