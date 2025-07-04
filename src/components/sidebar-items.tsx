"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Album, Camera, Heart, Trash } from "lucide-react";

const items = [
  { title: "Gallery", url: "/gallery", icon: Camera },
  { title: "Albums", url: "/albums", icon: Album },
  { title: "Deleted", url: "/deleted", icon: Trash },
  { title: "Favourites", url: "/favourites", icon: Heart },
];

export function SidebarItems() {
  const { open } = useSidebar();

  return (
    <>
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
    </>
  );
}
