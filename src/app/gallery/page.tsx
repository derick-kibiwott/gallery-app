import { CldUploadButton } from "@/components/cld-upload-button";
import { CldImage } from "@/components/cld-image";
import cloudinary from "cloudinary";

type SearchResults = {
  public_id: string;
};

export default async function Gallery() {
  const images = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute()) as { resources: SearchResults[] };

  return (
    <section className="space-y-16">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <CldUploadButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.resources.map((image: SearchResults, index: number) => (
          <CldImage
            key={index}
            src={image.public_id}
            width={400}
            height={400}
            sizes={"100vw"}
            alt="image from cloudinary"
            className="rounded-md"
          />
        ))}
      </div>
    </section>
  );
}
