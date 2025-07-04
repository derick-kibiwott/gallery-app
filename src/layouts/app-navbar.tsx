import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="sticky w-full top-0 border-b bg-background/80 backdrop-blur-md">
      <div className="flex py-4 items-center px-4 container mx-auto">
        <span className="flex gap-1.5 items-center">
          <SidebarTrigger />
          Gallery App
        </span>
        <div className="flex ml-auto items-center space-x-4">
          <Avatar className="size-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
