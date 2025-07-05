import cloudinary from "cloudinary";
import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { SearchResults } from "@/types";
import { HardRefresh } from "@/components/hard-refresh";
import FavouritesList from "@/sections/favourites/favourite-list";

export default async function Favourites() {
  const images = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favourite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(20)
    .execute()) as { resources: SearchResults[] };

  return (
    <section className="space-y-16">
      <HardRefresh />
      <div className="sticky z-10 top-16 items-center bg-background/80 backdrop-blur-md py-3 flex justify-between">
        <h1 className="text-2xl font-bold">
          <AppBreadCrumb />
        </h1>
      </div>
      <FavouritesList resources={images.resources} />
    </section>
  );
}
