"use client";

import { Button } from "@/components/ui/button";
import {
  CldUploadButton as CloudinaryUploadButton,
  CldUploadButtonProps,
} from "next-cloudinary";
import { Upload } from "lucide-react";

export function CldUploadButton(props: CldUploadButtonProps) {
  return (
    <Button asChild>
      <CloudinaryUploadButton uploadPreset="gallery-app">
        <Upload />
        Upload
      </CloudinaryUploadButton>
    </Button>
  );
}
