"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Link from "next/link";
import {
  Camera,
  Folders,
  Heart,
  Trash,
  Folder,
  ChevronDown,
} from "lucide-react";

const items = [
  { title: "Gallery", url: "/gallery", icon: Camera },
  { title: "Deleted", url: "/deleted", icon: Trash },
  { title: "Favourites", url: "/favourites", icon: Heart },
];

type SidebarItemsRendererProps = {
  folders: { name: string; path: string }[];
};

export function SidebarItemsRenderer({ folders }: SidebarItemsRendererProps) {
  const { open } = useSidebar();

  return (
    <>
      {/* Non-albums menu items */}
      {items.map((item) => {
        const Icon = item.icon;

        return open ? (
          <SidebarMenuButton key={item.title} asChild>
            <Link href={item.url}>
              <Icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        ) : (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <Icon />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="left">
              <span>{item.title}</span>
            </TooltipContent>
          </Tooltip>
        );
      })}

      {/* Albums menu item with submenu */}
      <SidebarMenuItem>
        {/* The main trigger */}
        <Collapsible defaultOpen={true} className="group">
          <CollapsibleTrigger asChild>
            {open ? (
              <SidebarMenuButton className="flex justify-between items-center mb-3">
                <div className="flex gap-1.5 items-center">
                  <Folders className="size-4" />
                  <span>Albums</span>
                </div>
                <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </SidebarMenuButton>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton>
                    <Folders />
                    <span className="sr-only">Albums</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <span>Albums</span>
                </TooltipContent>
              </Tooltip>
            )}
          </CollapsibleTrigger>

          {/* The collapsible nested folders */}
          <CollapsibleContent>
            <SidebarMenuSub className="flex flex-col gap-3">
              {folders.map((folder) => (
                <SidebarMenuSubItem key={folder.path}>
                  <Link
                    href={`/albums/${folder.path}`}
                    className="flex gap-1.5"
                  >
                    <Folder className="w-4 h-4" />
                    <span>{folder.name}</span>
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </>
  );
}
