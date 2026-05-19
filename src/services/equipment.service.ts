import { env } from "@/env";
import { EquipmentStatus } from "@/types/equipment";

interface SearchParams {
  status?: EquipmentStatus;
  search?: string;
}



const getEquipments = async (searchParams: SearchParams) => {
  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment/`);

  if (searchParams.status !== undefined) {
    url.searchParams.append("status", searchParams.status);
  }

  if (searchParams.search !== undefined && searchParams.search !== "") {
    url.searchParams.append("search", searchParams.search);
  }
  console.log("url:", url.toString());
  const res = await fetch(url.toString(), { cache: "no-store" });

  const equipmentData = await res.json();
  return equipmentData;
};

export const equipmentService = {
  getEquipments,
};
