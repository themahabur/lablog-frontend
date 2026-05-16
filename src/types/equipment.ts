export type Equipment = {
  id: string;
  name: string;
  serialNumber: string;
  status: "AVAILABLE" | "IN_USE" | "MAINTENANCE";
  location: string;
  metadata: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
};
