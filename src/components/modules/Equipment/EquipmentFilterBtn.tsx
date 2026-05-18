"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const EquipmentFilterBtn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAvailable = searchParams.get("isAvailable") || "all";

  const updateFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("isAvailable");
    } else {
      params.set("isAvailable", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={isAvailable} onValueChange={updateFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter Equipment" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Equipment</SelectItem>
        <SelectItem value="true">Available Only</SelectItem>
      </SelectContent>
    </Select>
  );
};