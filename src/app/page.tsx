"use client";

import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";

type UploadResult = {
  event?: string;
  info: {
    public_id: string;
  };
};

export default function Home() {
  const [images, setImages] = useState<string[]>(["vnazdy4y41zxwq1ahbjx"]);

  return (
    <div className="w-full px-10 min-h-screen flex justify-center items-center flex-col gap-20">
      <Button asChild>
        <CldUploadButton
          onSuccess={(result: UploadResult) => {
            const publicId = result?.info?.public_id;
            setImages((prev) => [...prev, publicId]);
          }}
          uploadPreset="gallery-app"
        />
      </Button>
      {images.map((image, index) => (
        <CldImage
          key={index}
          width="800"
          height="600"
          src={image}
          overlays={[
            {
              text: {
                color: "black",
                fontFamily: "Source Sans Pro",
                fontSize: 120,
                fontWeight: "bold",
                text: "QuickPrimeTech",
              },
            },
          ]}
          sizes="100vw"
          alt="Description of my image"
        />
      ))}
    </div>
  );
}
