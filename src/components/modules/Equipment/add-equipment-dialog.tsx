"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { useState } from "react";
import { createEquipment } from "@/actions/equipment.action";
import { Equipment, EquipmentStatus } from "@/types/equipment";
import { toast } from "sonner";

const AddEquipmentDialog = () => {
  const [customMeta, setCustomMeta] = useState([{ key: "", value: "" }]);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    status: "",
    location: "",
    notes: "",
  });

  const addCustomField = () => {
    setCustomMeta((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateCustomField = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updated = [...customMeta];
    updated[index][field] = value;
    setCustomMeta(updated);

    // merge into object
    const extra: Record<string, string> = {};

    updated.forEach((item) => {
      if (item.key) extra[item.key] = item.value;
    });

    setMetadata({ ...metadata, ...extra });
  };

  const removeCustomField = (index: number) => {
    const updated = customMeta.filter((_, i) => i !== index);
    setCustomMeta(updated);

    const extra: Record<string, string> = {};

    updated.forEach((item) => {
      if (item.key) extra[item.key] = item.value;
    });

    setMetadata(extra);
  };

  const handleSubmit = async () => {
    const toastid=toast.loading("Creating equipment...");
    setLoading(true);
    const finalPayload: Equipment = {
      name: formData.name,
      serialNumber: formData.serialNumber,
      status: formData.status as EquipmentStatus,
      location: formData.location,

      metadata: {
        brand: metadata.brand || "",
        model: metadata.model || "",
        ram: metadata.ram || "",
        storage: metadata.storage || "",
        purchaseDate: metadata.purchaseDate || "",
        ...Object.fromEntries(
          customMeta.filter((i) => i.key).map((i) => [i.key, i.value]),
        ),
      },
    };

    const res = await createEquipment(finalPayload);

    if (res.success) {
      toast.success("Equipment Created Successfully", {id: toastid});
      setOpen(false);
    }

    if (res.error) {
      toast.error(res.error.message, {id: toastid});
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-2xl">Add New Equipment</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 no-scrollbar">
          <form className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Basic Information</h2>

                <p className="text-sm text-muted-foreground">
                  Enter equipment basic details
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Equipment Name</Label>

                  <Input
                    id="name"
                    placeholder="Dell XPS 15"
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>

                  <Input
                    id="serialNumber"
                    placeholder="DX15-2026-002"
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        serialNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>

                  <Select
                    onValueChange={(value) =>
                      setFormData((p) => ({ ...p, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>

                      <SelectItem value="IN_USE">IN_USE</SelectItem>

                      <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>

                  <Input
                    id="location"
                    placeholder="Chittagong Branch"
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, location: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="rounded-xl border p-5">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Metadata</h2>

                <p className="text-sm text-muted-foreground">
                  Additional equipment details
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>

                  <Input
                    id="brand"
                    placeholder="Dell"
                    value={metadata.brand || ""}
                    onChange={(e) =>
                      setMetadata((p) => ({ ...p, brand: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>

                  <Input
                    id="model"
                    placeholder="XPS 15"
                    value={metadata.model || ""}
                    onChange={(e) =>
                      setMetadata((p) => ({ ...p, model: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ram">RAM</Label>

                  <Input
                    id="ram"
                    placeholder="32GB"
                    value={metadata.ram || ""}
                    onChange={(e) =>
                      setMetadata((p) => ({ ...p, ram: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage</Label>

                  <Input
                    id="storage"
                    placeholder="1TB SSD"
                    value={metadata.storage || ""}
                    onChange={(e) =>
                      setMetadata((p) => ({ ...p, storage: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>

                  <Input
                    id="purchaseDate"
                    type="date"
                    value={metadata.purchaseDate || ""}
                    onChange={(e) =>
                      setMetadata((p) => ({
                        ...p,
                        purchaseDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <h3 className="text-sm font-semibold">Custom Fields</h3>

                  <Button
                    type="button"
                    size="sm"
                    className="w-full"
                    onClick={addCustomField}
                  >
                    + Add custom field
                  </Button>
                </div>
                <div className="space-y-3 md:col-span-2">
                  {customMeta.map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3">
                      <Input
                        placeholder="Key (e.g. warranty)"
                        className="col-span-2"
                        value={item.key}
                        onChange={(e) =>
                          updateCustomField(index, "key", e.target.value)
                        }
                      />

                      <Input
                        placeholder="Value"
                        className="col-span-2"
                        value={item.value}
                        onChange={(e) =>
                          updateCustomField(index, "value", e.target.value)
                        }
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeCustomField(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>

              <Textarea
                id="notes"
                placeholder="Write anything about this equipment..."
                className="min-h-[120px]"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, notes: e.target.value }))
                }
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-background px-6 py-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            Add Equipment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentDialog;
