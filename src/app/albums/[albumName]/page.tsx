import cloudinary from "cloudinary";
import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { GalleryImage } from "@/components/gallery-image";
import { SearchResults } from "@/types";

export default async function Gallery({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const images = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(20)
    .execute()) as { resources: SearchResults[] };

  return (
    <section className="space-y-16">
      <div className="sticky z-10 top-16 items-center bg-background/80 backdrop-blur-md py-3 flex justify-between">
        <AppBreadCrumb />
      </div>
      <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
        {images.resources.map((image, index) => (
          <GalleryImage image={image} key={index} />
        ))}
      </div>
    </section>
  );
}
