export type Equipment = {
  id: string;
  name: string;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  metadata: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
};



export enum EquipmentStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
}