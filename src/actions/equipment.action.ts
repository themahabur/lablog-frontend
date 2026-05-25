"use server";
import { equipmentService } from "@/services/equipment.service";
import { Equipment } from "@/types/equipment";
import { updateTag } from "next/cache";

export const createEquipment = async (payload: Equipment) => {
  const data = await equipmentService.createEquipment(payload);
  if (data.success) {
    updateTag("equipments");
  }
  return data;
};
