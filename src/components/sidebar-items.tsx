import cloudinary from "cloudinary";
import { FoldersProps } from "@/types";
import { SidebarItemsRenderer } from "./sidebar-items-renderer";

export async function SidebarItems() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as FoldersProps;

  return <SidebarItemsRenderer folders={folders} />;
}
