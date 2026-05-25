"use client";

import { Equipment } from "@/types/equipment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface Props {
  equipments: Equipment[];
}

const EquipmentTable = ({ equipments }: Props) => {
  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  const handleUpdate = (id: string) => {
    console.log("Update:", id);
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {equipments.map((equipment: Equipment) => (
            <TableRow key={equipment.id}>
              <TableCell className="font-medium">
                {equipment.name}
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdate(equipment.id)}
                >
                  Update
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(equipment.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EquipmentTable;