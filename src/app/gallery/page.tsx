"use client";

import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { Upload } from "lucide-react";

export default function Gallery() {
  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button asChild>
          <CldUploadButton uploadPreset="gallery-app">
            Upload
            <Upload />
          </CldUploadButton>
        </Button>
      </div>
    </section>
  );
}
