import { CldUploadButton } from "@/components/cld-upload-button";
import cloudinary from "cloudinary";
import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { GalleryImage } from "@/components/gallery-image";
import { SearchResults } from "@/types";
import { SearchBar } from "@/sections/gallery/search-bar";

export default async function Gallery({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get the search value
  const searchValue =
    typeof searchParams?.search === "string" ? searchParams.search : undefined;

  // Build the Cloudinary search expression dynamically
  const expression = searchValue
    ? `resource_type:image AND tags=${searchValue}`
    : "resource_type:image";

  // getting all the images so that I can render them in the component
  const images = (await cloudinary.v2.search
    .expression(expression)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(20)
    .execute()) as { resources: SearchResults[] };

  return (
    <section className="space-y-16">
      <div className="sticky z-10 top-17 items-center bg-background/80 backdrop-blur-md py-3 flex justify-between">
        <AppBreadCrumb />
        <SearchBar initialSearch={searchValue} />
        <CldUploadButton />
      </div>
      <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
        {/* <Skeleton className="aspect-9/16 w-full" /> */}
        {images.resources.map((image, index) => (
          <GalleryImage image={image} key={index} />
        ))}
      </div>
    </section>
  );
}
