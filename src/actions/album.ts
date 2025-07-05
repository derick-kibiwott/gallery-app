"use server";

import cloudinary from "cloudinary";
import { Response, SearchResults } from "@/types";
import { revalidatePath } from "next/cache";

export async function addImageToAlbum(
  image: SearchResults,
  album: string
): Promise<Response> {
  if (!image?.public_id || !album?.trim()) {
    return {
      status: 400,
      message: "Invalid image or album name provided",
    };
  }

  const publicId = image.public_id;

  try {
    // Check if the folder already exists (optional, to avoid unnecessary create_folder calls)
    let folderExists = false;
    try {
      await cloudinary.v2.api.resource(album, {
        resource_type: "image",
      });
      folderExists = true;
    } catch {
      // Folder doesn't exist, so create it
      await cloudinary.v2.api.create_folder(album);
    }

    // Construct the new path for the image
    const imageId = publicId.split("/").pop(); // Extract the image ID without folder
    const newFolderPath = `${album}/${imageId}`;

    // Move the image to the new folder
    const renameResult = await cloudinary.v2.uploader.rename(
      publicId,
      newFolderPath,
      {
        overwrite: true,
      }
    );

    // Verify the image was moved by checking the new public_id
    if (renameResult.public_id !== newFolderPath) {
      throw new Error("Image was not moved to the correct folder");
    }

    // Revalidate relevant paths
    revalidatePath("/gallery");
    revalidatePath("/favourites");

    return {
      status: 200,
      message: `Image successfully added to ${album} album`,
    };
  } catch (error) {
    console.error("Error in addImageToAlbum:", error);
    return {
      status: 400,
      message: `Failed to add image to ${album} album: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
