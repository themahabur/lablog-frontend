import EquipmentItem from "@/components/modules/Equipment/EquipmentItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { equipmentService } from "@/services/equipment.service";
import { Equipment } from "@/types/equipment";

const EquipmentPage = async () => {
  const {data: equipmentData} = await equipmentService.getEquipments();

  console.log("equipmentData", equipmentData);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Equipment Management</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search equipment..." className="pl-10 rounded-xl" />
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentData ? equipmentData.map((equipment: Equipment) => (
          <EquipmentItem key={equipment.id} equipment={equipment} />
        )) : (<p>No equipment found.</p>)}
      </div>
    </div>
  );
};

export default EquipmentPage;
