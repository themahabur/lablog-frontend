"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddEquipmentButton = () => {
  const handleAddEquipment = () => {
    console.log("Add Equipment");
  };

  return (
    <Button onClick={handleAddEquipment}>
      <Plus className="mr-2 h-4 w-4" />
      Add Equipment
    </Button>
  );
};

export default AddEquipmentButton;