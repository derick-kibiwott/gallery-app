"use client";

import { Heart } from "lucide-react"; // Assuming you're using lucide-react for icons
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { setFavourite, removeFavourite } from "@/actions/tag-manager";
import { toast } from "sonner";

type HeartIconProps = {
  className?: string;
  publicId: string;
  filled: boolean;
  onClick?: () => void;
};

export function HeartIcon({
  className,
  publicId,
  filled,
  onClick,
}: HeartIconProps) {
  const [isLiked, setIsLiked] = useState(filled);
  const [transition, startTransition] = useTransition();

  const handleClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    if (newIsLiked) {
      startTransition(async () => {
        const response = await setFavourite(publicId);
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
        const response = await removeFavourite(publicId);
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
        "cursor-pointer",
        `${isLiked ? "fill-red-500 text-red-500" : "fill-none text-gray-200"}`,
        `${isLiked && "animate-pulse-once"}`,
        className
      )}
      onClick={() => {
        handleClick();
        if (onClick) {
          onClick();
        }
      }}
    />
  );
}
