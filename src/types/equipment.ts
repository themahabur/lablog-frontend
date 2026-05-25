export type Equipment = {
  name: string;
  serialNumber: string;
  status: EquipmentStatus;
  location: string;
  metadata: Record<string, string>;
};

export enum EquipmentStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
}
