"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  initialSearch,
}: {
  initialSearch: string | undefined;
}) {
  const [tagName, setTagName] = useState(initialSearch ?? "");
  const router = useRouter();
  //   function for submitting the form and searching the tagname
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex items-center gap-3"
    >
      <Label
        htmlFor="tag-name"
        className="text-right whitespace-nowrap sr-only"
      >
        Search Image
      </Label>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id="tag-name"
          placeholder="Search your tags here..."
          className="pl-10"
          value={tagName}
          onChange={(e) => setTagName(e.currentTarget.value)}
        />
      </div>

      <Button type="submit" variant={"secondary"}>
        Search
      </Button>
    </form>
  );
}
