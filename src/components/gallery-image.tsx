"use client";

import { HeartIcon } from "./favourite-button";
import { CldImage } from "./cld-image";
import { SearchResults } from "@/types";
import { ImageMenu } from "./image-menu";

type GalleryImageProps = {
  image: SearchResults;
  removeResource?: (publicId: string) => void;
};

export function GalleryImage({ image, removeResource }: GalleryImageProps) {
  return (
    <div className="relative">
      <CldImage
        src={image.public_id}
        width={400}
        height={400}
        sizes="100vw"
        alt="image from cloudinary"
        className="rounded-md mb-4 w-full"
      />
      <div className="absolute top-4 right-4 flex gap-1 5">
        <HeartIcon
          publicId={image.public_id}
          filled={image.tags.includes("favourite")}
          onClick={() => {
            removeResource?.(image.public_id);
          }}
        />
        <ImageMenu />
      </div>
    </div>
  );
}
