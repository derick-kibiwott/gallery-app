"use client";

import { CldImage as CloudinaryImage, CldImageProps } from "next-cloudinary";

export function CldImage(props: CldImageProps) {
  return <CloudinaryImage {...props} />;
}
