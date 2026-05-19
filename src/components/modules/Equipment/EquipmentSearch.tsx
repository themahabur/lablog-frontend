"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const EquipmentSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="relative max-w-lg">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

      <Input
        placeholder="Search equipment"
        className="pl-11 h-12 rounded-2xl"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default EquipmentSearch;