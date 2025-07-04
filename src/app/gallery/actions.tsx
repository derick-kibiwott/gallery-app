// app/gallery/actions.ts
"use server";

import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

type Response = {
  status: number;
  message: string;
};

export async function setFavourite(
  publicId: string,
  path: string
): Promise<Response> {
  try {
    await cloudinary.v2.uploader.add_tag("favourite", [publicId]);
    revalidatePath(path); // Revalidate the specified path
    return {
      status: 200,
      message: "Image added to favourites successfully",
    };
  } catch (error) {
    console.error("Error adding favourite:", error);
    return {
      status: 500,
      message: "Failed to add image to favourites",
    };
  }
}

export async function removeFavourite(
  publicId: string,
  path: string
): Promise<Response> {
  try {
    await cloudinary.v2.uploader.remove_tag("favourite", [publicId]);
    revalidatePath(path); // Revalidate the specified path
    return {
      status: 200,
      message: "Image removed from favourites successfully",
    };
  } catch (error) {
    console.error("Error removing favourite:", error);
    return {
      status: 500,
      message: "Failed to remove image from favourites",
    };
  }
}
