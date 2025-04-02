
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DailyCalorieChartProps {
  chartData: Array<{
    hour: string;
    calories: number;
    target: number;
  }>;
  targetCalories: number;
}

export const DailyCalorieChart = ({ chartData, targetCalories }: DailyCalorieChartProps) => {
  const chartConfig = useMemo(() => ({
    calories: {
      label: 'Calories',
      color: '#8884d8'
    },
    target: {
      label: 'Target',
      color: '#82ca9d'
    }
  }), []);

  return (
    <div className="w-full h-72">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            tickFormatter={(value) => value.split(':')[0]}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ReferenceLine y={targetCalories / 24} stroke="#82ca9d" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="calories" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ChartContainer>
      <div className="text-center text-sm text-gray-500 mt-2">
        Today's calorie intake by hour
      </div>
    </div>
  );
};
