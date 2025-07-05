import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import cloudinary from "cloudinary";
import Link from "next/link";
import { FoldersProps } from "@/types";

export default async function AlbumPage() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as FoldersProps;

  return (
    <div className="space-y-10">
      <div className="sticky z-10 top-16 items-center bg-background/80 backdrop-blur-md py-3 flex justify-between">
        <AppBreadCrumb />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {folders.map(({ name }, index) => (
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            key={index}
          >
            <CardHeader>
              <Skeleton className="w-full aspect-video" />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold truncate">
                {name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                View the {name} folder to see all your photos and memories
              </p>
            </CardContent>
            <CardFooter className="space-x-2">
              <Button asChild>
                <Link href={`/albums/${name}`}>View Album</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href={`/albums/details/${name}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
