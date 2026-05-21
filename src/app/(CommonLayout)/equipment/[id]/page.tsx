import { equipmentService } from "@/services/equipment.service";
import { Equipment } from "@/types/equipment";
import { notFound } from "next/navigation";

type UsageLog = {
  id: string;
  userId: string;
  equipmentId: string;
  startTime: string | Date;
  endTime: string | Date | null;
  purpose: string;
  notes?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
};


export async function generateStaticParams(){
  const {data:equipments}=await equipmentService.getEquipments()

  return equipments?.map((equipment: Equipment) => ({ id: equipment.id })).splice(0, 3);
}


export default async function EquipmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const {data :equipment} = await equipmentService.getEquipmentById(id);

  console.log("Fetched equipment:", equipment);

  if (!equipment) {
    return notFound();
  }

  const statusColor =
    equipment.status === "AVAILABLE"
      ? "text-green-600 bg-green-100"
      : equipment.status === "IN_USE"
        ? "text-yellow-600 bg-yellow-100"
        : "text-red-600 bg-red-100";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
          <p className="text-gray-500">Serial: {equipment.serialNumber}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {equipment.status}
        </span>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Location</h2>
          <p>{equipment.location}</p>
        </div>

        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Created At</h2>
          <p>{new Date(equipment.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Metadata */}
      {equipment.metadata && (
        <div className="p-4 border rounded-xl">
          <h2 className="font-semibold mb-2">Metadata</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded-lg overflow-auto">
            {JSON.stringify(equipment.metadata, null, 2)}
          </pre>
        </div>
      )}

      {/* Usage Logs */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Usage History</h2>

        {equipment.usageLogs.length === 0 ? (
          <p className="text-gray-500">No usage history found.</p>
        ) : (
          <div className="space-y-3">
            {equipment.usageLogs.map((log: UsageLog) => (
              <div
                key={log.id}
                className="p-4 border rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-medium">{log.user.name}</p>
                  <p className="text-sm text-gray-500">{log.purpose}</p>
                </div>

                <div className="text-right text-sm text-gray-500">
                  <p>{new Date(log.startTime).toLocaleString()}</p>
                  <p>
                    {log.endTime
                      ? new Date(log.endTime).toLocaleString()
                      : "Ongoing"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
