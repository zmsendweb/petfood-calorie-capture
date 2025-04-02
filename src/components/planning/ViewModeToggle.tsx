
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "daily" | "weekly";
  setViewMode: (mode: "daily" | "weekly") => void;
}

export const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-2">View Mode</label>
      <div className="flex gap-2">
        <Button 
          variant={viewMode === "daily" ? "default" : "outline"} 
          onClick={() => setViewMode("daily")}
          className="flex-1"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Daily
        </Button>
        <Button 
          variant={viewMode === "weekly" ? "default" : "outline"} 
          onClick={() => setViewMode("weekly")}
          className="flex-1"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Weekly
        </Button>
      </div>
    </div>
  );
};
