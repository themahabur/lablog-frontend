import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Cpu, CalendarPlus } from "lucide-react";
import { Equipment } from "@/types/equipment";

const statusVariant = {
  AVAILABLE: "default",
  IN_USE: "secondary",
  MAINTENANCE: "destructive",
} as const;

export default function EquipmentItem({
  equipment,
}: {
  equipment: Equipment;
}) {
  // const handleBook = () => {
  //   console.log("Booking equipment:", equipment.id);
  //   // later: open modal / call API
  // };

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg">{equipment.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Serial: {equipment.serialNumber}
          </p>
        </div>

        <Badge variant={statusVariant[equipment.status]}>
          {equipment.status.replace("_", " ")}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{equipment.location}</span>
        </div>

        {equipment.metadata && (
          <div>
            <div className="flex items-center gap-2 mb-2 font-medium">
              <Cpu className="w-4 h-4" />
              Details
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(equipment.metadata).map(([key, value]) => (
                <div key={key} className="bg-muted rounded-lg px-3 py-2">
                  <span className="font-medium capitalize">{key}:</span>{" "}
                  {String(value)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Button */}
        <Button
          className="w-full rounded-xl mt-2"
          disabled={equipment.status !== "AVAILABLE"}
          // onClick={handleBook}
        >
          <CalendarPlus className="w-4 h-4 mr-2" />
          {equipment.status === "AVAILABLE"
            ? "Book Equipment"
            : "Not Available"}
        </Button>
      </CardContent>
    </Card>
  );
}