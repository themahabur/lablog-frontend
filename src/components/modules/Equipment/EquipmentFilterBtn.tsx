"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const EquipmentFilterBtn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "all";

  const updateFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={status} onValueChange={updateFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter Equipment" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Equipment</SelectItem>
        <SelectItem value="AVAILABLE">Available</SelectItem>
        <SelectItem value="IN_USE">In Use</SelectItem>
        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
      </SelectContent>
    </Select>
  );
};