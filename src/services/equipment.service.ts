import { env } from "@/env";

interface SearchParams {
  isAvailable?: boolean;
  search?: string;
}

const getEquipments = async (searchParams: SearchParams) => {
  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment/`);

  // console.log("searchParams:", searchParams);


if (searchParams.isAvailable !== undefined) {
    url.searchParams.append("is_available", searchParams.isAvailable.toString());
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
