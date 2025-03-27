
import { useState, useEffect, useMemo } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { format, addDays, addWeeks } from "date-fns";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  Label,
  ReferenceArea
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WeightProgressChartProps {
  pet: PetProfile;
}

export const WeightProgressChart = ({ pet }: WeightProgressChartProps) => {
  const [timeRange, setTimeRange] = useState<"4weeks" | "8weeks" | "12weeks">("8weeks");
  
  // Determine if weight loss or gain is the goal based on the pet's goals
  const isWeightLoss = useMemo(() => {
    const weightGoals = [...(pet.shortTermGoals || []), ...(pet.longTermGoals || [])]
      .filter(goal => 
        goal.toLowerCase().includes("weight") || 
        goal.toLowerCase().includes("lose") || 
        goal.toLowerCase().includes("gain")
      );
      
    return !weightGoals.some(goal => 
      goal.toLowerCase().includes("gain")
    );
  }, [pet.shortTermGoals, pet.longTermGoals]);
  
  // Generate projected weight data
  const weightData = useMemo(() => {
    const startDate = new Date();
    const startWeight = pet.weight;
    const targetWeight = isWeightLoss ? startWeight * 0.85 : startWeight * 1.15; // Target is 15% loss or gain
    
    // Get number of weeks from timeRange
    const weeks = parseInt(timeRange.replace("weeks", ""));
    
    // Calculate the weight change per week (non-linear curve)
    // For weight loss: starts slow, accelerates, then slows down near target
    // For weight gain: similar curve but in the opposite direction
    
    // Generate data points for each week
    return Array.from({ length: weeks + 1 }).map((_, index) => {
      const date = addWeeks(startDate, index);
      
      // Non-linear progress formula
      // For a sigmoid-like curve that's steeper in the middle weeks
      let progressPercentage;
      
      if (index === 0) {
        progressPercentage = 0; // Start at 0%
      } else if (index === weeks) {
        progressPercentage = 1; // End at 100%
      } else {
        // Sigmoid-like function mapped to 0-1 range
        const x = (index / weeks) * 6 - 3; // Map to range -3 to 3 for sigmoid
        progressPercentage = 1 / (1 + Math.exp(-x));
      }
      
      const weightDifference = targetWeight - startWeight;
      const currentWeight = startWeight + (weightDifference * progressPercentage);
      
      // Add some randomness to actual weight to simulate real-world variance
      // But only for past dates (for "actual" weight tracking)
      const isPastDate = date < new Date();
      const randomVariance = isPastDate ? (Math.random() * 0.04 - 0.02) : 0; // ±2%
      const actualWeight = isPastDate ? 
        startWeight + (weightDifference * progressPercentage * 0.8 * (1 + randomVariance)) : 
        null;
      
      return {
        date: format(date, 'MMM dd'),
        projected: parseFloat(currentWeight.toFixed(1)),
        actual: actualWeight ? parseFloat(actualWeight.toFixed(1)) : null,
        week: `Week ${index}`
      };
    });
  }, [pet.weight, isWeightLoss, timeRange]);
  
  const chartConfig = {
    projected: {
      label: 'Projected Weight',
      color: '#8884d8'
    },
    actual: {
      label: 'Actual Weight',
      color: '#82ca9d'
    }
  };
  
  // Calculate current progress percentage
  const progressPercentage = useMemo(() => {
    const actualWeights = weightData.filter(d => d.actual !== null);
    if (actualWeights.length === 0) return 0;
    
    const latestActualWeight = actualWeights[actualWeights.length - 1].actual;
    const startWeight = pet.weight;
    const targetWeight = isWeightLoss ? startWeight * 0.85 : startWeight * 1.15;
    
    const totalChange = Math.abs(targetWeight - startWeight);
    const currentChange = Math.abs(latestActualWeight! - startWeight);
    
    return Math.min(Math.round((currentChange / totalChange) * 100), 100);
  }, [weightData, pet.weight, isWeightLoss]);
  
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
      
      <div className="w-full h-64">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value, index) => index % 2 === 0 ? value : ''}
            />
            <YAxis domain={[
              // Set domain to be 10% below min and 10% above max
              dataMin => Math.floor(dataMin * 0.9),
              dataMax => Math.ceil(dataMax * 1.1)
            ]} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-md shadow border">
                      <p className="font-semibold">{data.date} ({data.week})</p>
                      <p className="text-[#8884d8]">
                        Projected: {data.projected} {pet.weightUnit}
                      </p>
                      {data.actual !== null && (
                        <p className="text-[#82ca9d]">
                          Actual: {data.actual} {pet.weightUnit}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="projected" 
              stroke="#8884d8" 
              strokeDasharray="3 3"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#82ca9d" 
              activeDot={{ r: 8 }}
              strokeWidth={2} 
            />
            
            {/* Add annotation for acceleration period */}
            <ReferenceArea 
              x1={weightData[Math.floor(weightData.length * 0.25)].date} 
              x2={weightData[Math.floor(weightData.length * 0.75)].date} 
              stroke="none"
              fill="#8884d8" 
              fillOpacity={0.1} 
            />
          </LineChart>
        </ChartContainer>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Current Progress:</span>
          <span className="text-sm font-bold">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isWeightLoss ? 
            "Weight loss typically accelerates in the middle of the program as your pet adjusts to their new routine." : 
            "Weight gain is typically faster in the middle weeks as your pet's metabolism adjusts to increased nutrition."}
        </p>
      </div>
    </div>
  );
};
