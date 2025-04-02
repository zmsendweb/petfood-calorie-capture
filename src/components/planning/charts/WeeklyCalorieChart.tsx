
import { useMemo } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ReferenceLine, 
  Line 
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

interface WeeklyCalorieChartProps {
  chartData: Array<{
    date: string;
    fullDate: string;
    calories: number;
    target: number;
    lowerBound: number;
    upperBound: number;
  }>;
  targetCalories: number;
}

export const WeeklyCalorieChart = ({ chartData, targetCalories }: WeeklyCalorieChartProps) => {
  const chartConfig = useMemo(() => ({
    calories: {
      label: 'Calories',
      color: '#8884d8'
    },
    target: {
      label: 'Target',
      color: '#82ca9d'
    },
    lowerBound: {
      label: 'Min Range',
      color: '#ffc658'
    },
    upperBound: {
      label: 'Max Range',
      color: '#ff8042'
    }
  }), []);

  return (
    <div className="w-full h-72">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value, index) => value}
          />
          <YAxis />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-md shadow border">
                    <p className="font-semibold">{data.fullDate}</p>
                    <p className="text-[#8884d8]">Calories: {data.calories}</p>
                    <p className="text-[#82ca9d]">Target: {data.target}</p>
                    <p className="text-gray-500 text-xs">
                      {data.calories > data.upperBound 
                        ? 'Above recommended range' 
                        : data.calories < data.lowerBound 
                          ? 'Below recommended range' 
                          : 'Within recommended range'}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine y={targetCalories} stroke="#82ca9d" strokeDasharray="3 3" />
          <Area 
            type="monotone" 
            dataKey="lowerBound" 
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.1}
          />
          <Area 
            type="monotone" 
            dataKey="upperBound" 
            stackId="1"
            stroke="#ff8042"
            fill="#ff8042"
            fillOpacity={0.1} 
          />
          <Line 
            type="monotone" 
            dataKey="calories" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </AreaChart>
      </ChartContainer>
      <div className="text-center text-sm text-gray-500 mt-2">
        Weekly calorie intake with recommended range (shaded)
      </div>
    </div>
  );
};
