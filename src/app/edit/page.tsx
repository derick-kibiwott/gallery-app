"use client";

import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { CldImage } from "@/components/cld-image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPage() {
  const searchParams = useSearchParams();
  const publicId = searchParams.get("publicId");

  const [transformation, setTransformation] = useState<
    undefined | "generative-fill" | "blur" | "grayscale" | "pixelate"
  >(undefined);

  const [isPending, startTransition] = useTransition();
  const [imageLoading, setImageLoading] = useState(false);

  if (!publicId) {
    return <div className="p-4">No image selected.</div>;
  }

  return (
    <div className="space-y-10">
      <div className="sticky z-10 top-16 items-center bg-background/80 backdrop-blur-md py-3 flex justify-between">
        <AppBreadCrumb />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap">
        {(
          [
            { key: "generative-fill", label: "Generative Fill" },
            { key: "blur", label: "Blur Image" },
            { key: "grayscale", label: "Gray Scale" },
            { key: "pixelate", label: "Pixelate" },
          ] as const
        ).map(({ key, label }) => (
          <Button
            key={key}
            variant={transformation === key ? "default" : "secondary"}
            onClick={() =>
              startTransition(() => {
                setTransformation(key);
                setImageLoading(true);
              })
            }
            disabled={isPending}
          >
            {isPending && transformation === key ? "Generating..." : label}
          </Button>
        ))}

        <Button
          variant={"destructive"}
          onClick={() =>
            startTransition(() => {
              setTransformation(undefined);
            })
          }
          disabled={isPending}
        >
          {isPending && transformation === undefined
            ? "Clearing..."
            : "Clear All"}
        </Button>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Original Image */}
        <CldImage
          src={publicId}
          width={400}
          height={400}
          alt={`Original image ${publicId}`}
          className="rounded-md"
        />

        {/* Transformed Image */}
        {transformation && (
          <div className="relative w-[400px] h-[400px]">
            {imageLoading && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
            )}
            <CldImage
              src={publicId}
              width={400}
              height={400}
              alt={`Transformed image ${publicId}`}
              className={`rounded-md ${imageLoading ? "invisible" : "visible"}`}
              crop={transformation === "generative-fill" ? "pad" : undefined}
              fillBackground={transformation === "generative-fill"}
              blur={transformation === "blur" ? "1200" : undefined}
              grayscale={transformation === "grayscale" ? true : undefined}
              pixelate={transformation === "pixelate" ? true : undefined}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
