import { env } from "@/env";
import { cookies } from "next/headers";

const getEquipments = async () => {
  // Simulate fetching equipment data from an API
   const cookieStore = await cookies();
  
      const  res= await fetch(`${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment/`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
  const equipmentData = res.json();
  return equipmentData;
};

export const equipmentService = {
  getEquipments,
};
