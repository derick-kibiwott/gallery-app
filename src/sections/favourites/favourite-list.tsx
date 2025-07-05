"use client";

import { SearchResults } from "@/types";
import { GalleryImage } from "@/components/gallery-image";
import { useState, useEffect } from "react";

type FavouriteListProps = {
  resources: SearchResults[];
};

export default function FavouritesList({ resources }: FavouriteListProps) {
  //setting a state in order to update it
  const [initialResources, setInitialResources] = useState(resources);

  useEffect(() => {
    setInitialResources(resources);
  }, [resources]);

  const removeResource = (publicId: string) => {
    setInitialResources((prevResources) =>
      prevResources.filter((image) => image.public_id !== publicId)
    );
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
      {initialResources.map((image, index) => (
        <GalleryImage
          image={image}
          key={index}
          removeResource={removeResource}
        />
      ))}
    </div>
  );
}
