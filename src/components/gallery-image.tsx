import { HeartIcon } from "./favourite-button";
import { CldImage } from "./cld-image";
import { SearchResults } from "@/types";

type GalleryImageProps = {
  image: SearchResults;
};

export function GalleryImage({ image }: GalleryImageProps) {
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
      <HeartIcon
        publicId={image.public_id}
        filled={image.tags.includes("favourite")}
      />
    </div>
  );
}
