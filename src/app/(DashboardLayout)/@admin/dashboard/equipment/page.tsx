import AddEquipmentButton from "@/components/modules/Equipment/add-equipment-button";
import AddEquipmentDialog from "@/components/modules/Equipment/add-equipment-dialog";
import EquipmentTable from "@/components/modules/Equipment/equipment-table";
import { equipmentService } from "@/services/equipment.service";

const EquipmentPage = async () => {
  const { data: equipments } = await equipmentService.getEquipments();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Equipment List</h1>

          <p className="text-sm text-muted-foreground">Manage all equipments</p>
        </div>

        <AddEquipmentDialog />
      </div>

      <EquipmentTable equipments={equipments} />
    </div>
  );
};

export default EquipmentPage;
