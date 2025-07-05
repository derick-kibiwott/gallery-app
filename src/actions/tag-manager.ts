"use server";

import cloudinary from "cloudinary";
import { Response } from "@/types";

export async function setFavourite(publicId: string): Promise<Response> {
  try {
    await cloudinary.v2.uploader.add_tag("favourite", [publicId]);
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

export async function removeFavourite(publicId: string): Promise<Response> {
  try {
    await cloudinary.v2.uploader.remove_tag("favourite", [publicId]);
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
