"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function HardRefresh() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return <></>;
}
