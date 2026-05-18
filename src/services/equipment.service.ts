import { env } from "@/env";
import { cookies } from "next/headers";

const getEquipments = async () => {
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment/`,{
    next:{
      revalidate:10
    }
  });
  const equipmentData = await res.json();
  console.log("equipmentData:", equipmentData);
  return equipmentData;
};

export const equipmentService = {
  getEquipments,
};
