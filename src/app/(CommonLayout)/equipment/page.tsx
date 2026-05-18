import EquipmentItem from "@/components/modules/Equipment/EquipmentItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, PackageSearch } from "lucide-react";
import { equipmentService } from "@/services/equipment.service";
import { Equipment } from "@/types/equipment";

const EquipmentPage = async () => {
  const { data: equipmentData, success } =
    await equipmentService.getEquipments();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Use Equipment</h1>
          <p className="text-muted-foreground mt-1">
            Browse all available lab equipment.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment"
            className="pl-11 h-12 rounded-2xl"
          />
        </div>
      </div>

      {/* Equipment Grid */}
      {success && equipmentData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentData.map((equipment: Equipment) => (
            <EquipmentItem key={equipment.id} equipment={equipment} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-3xl bg-muted/30">
          <div className="mb-6 rounded-full bg-background shadow-sm p-6 border">
            <PackageSearch className="h-12 w-12 text-muted-foreground" />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight mb-2">
            No Equipment Found
          </h3>

          <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
            There’s currently no equipment available in the system. Start by
            adding new equipment or check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;
