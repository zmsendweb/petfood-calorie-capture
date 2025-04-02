
import { useState } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { WeightChart } from "./WeightChart";
import { ProgressIndicator } from "../indicators/ProgressIndicator";
import { useWeightData } from "../hooks/useWeightData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WeightProgressChartProps {
  pet: PetProfile;
}

export const WeightProgressChart = ({ pet }: WeightProgressChartProps) => {
  const [timeRange, setTimeRange] = useState<"4weeks" | "8weeks" | "12weeks">("8weeks");
  
  const { weightData, isWeightLoss, progressPercentage } = useWeightData(pet, timeRange);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className="text-lg font-medium">
          {isWeightLoss ? "Weight Loss" : "Weight Gain"} Projection
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Timeframe:</span>
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4weeks">4 weeks</SelectItem>
              <SelectItem value="8weeks">8 weeks</SelectItem>
              <SelectItem value="12weeks">12 weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <WeightChart 
        weightData={weightData} 
        pet={pet} 
      />
      
      <ProgressIndicator 
        progressPercentage={progressPercentage} 
        isWeightLoss={isWeightLoss} 
      />
    </div>
  );
};
