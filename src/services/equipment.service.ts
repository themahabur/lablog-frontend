import { env } from "@/env";
import { Equipment, EquipmentStatus } from "@/types/equipment";
import { cookies } from "next/headers";

interface SearchParams {
  status?: EquipmentStatus;
  search?: string;
}

const getEquipments = async (searchParams?: SearchParams) => {
  const url = new URL(`${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment/`);

  if (searchParams?.status !== undefined) {
    url.searchParams.append("status", searchParams.status);
  }

  if (searchParams?.search !== undefined && searchParams.search !== "") {
    url.searchParams.append("search", searchParams.search);
  }

  const res = await fetch(url.toString(), {
    next: {
      tags: ["equipments"],
    },
    cache: "no-store",
  });

  const equipmentData = await res.json();
  return equipmentData;
};

const getEquipmentById = async (id: string) => {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment/${id}`,
    );

    const equipmentData = await res.json();

    return equipmentData;
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    return null;
  }
};

const createEquipment = async (Payload: Equipment) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_API}/api/v1/equipment`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        method: "POST",
        body: JSON.stringify(Payload),
      },
    );

    const equipmentData = await res.json();
    return { success: true, data: equipmentData, error: null };
  } catch (error) {
    console.error("Error creating equipment:", error);
    return {
      success: false,
      data: null,
      error: { message: "Error creating equipment" },
    };
  }
};

export const equipmentService = {
  getEquipments,
  getEquipmentById,
  createEquipment,
};
