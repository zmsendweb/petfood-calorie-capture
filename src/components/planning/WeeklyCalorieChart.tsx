
import { useState, useEffect, useMemo } from "react";
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
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
  AreaChart
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  foodName?: string;
  brandName?: string;
  serving?: string;
  timestamp: Date;
  petId?: string;
}

interface WeeklyCalorieChartProps {
  petId: string;
  targetCalories: number;
  viewMode: "daily" | "weekly";
}

export const WeeklyCalorieChart = ({ petId, targetCalories, viewMode }: WeeklyCalorieChartProps) => {
  const [mealData, setMealData] = useState<MealEntry[]>([]);
  
  // Mock data - in a real app, this would come from a meals database
  useEffect(() => {
    // Generate mock data for demonstration
    const today = new Date();
    const mockMeals: MealEntry[] = [];
    
    // Generate data for the last 14 days
    for (let i = 13; i >= 0; i--) {
      const day = subDays(today, i);
      const dailyMealCount = Math.floor(Math.random() * 3) + 1; // 1-3 meals per day
      
      for (let j = 0; j < dailyMealCount; j++) {
        // Randomize calories with some variance around target
        const variance = Math.random() * 0.4 - 0.2; // -20% to +20%
        const adjustedTarget = targetCalories ? targetCalories / dailyMealCount : 300;
        const calories = Math.round(adjustedTarget * (1 + variance));
        
        mockMeals.push({
          id: `meal-${i}-${j}`,
          type: ["breakfast", "lunch", "dinner", "snack"][j % 4],
          calories,
          photo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
          timestamp: day,
          petId
        });
      }
    }
    
    setMealData(mockMeals);
  }, [petId, targetCalories]);
  
  // Prepare chart data based on view mode
  const chartData = useMemo(() => {
    const today = new Date();
    let dateRange: Date[];
    
    if (viewMode === "daily") {
      // For daily view, show hourly breakdown of today
      const todayMeals = mealData.filter(meal => 
        format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
      );
      
      // Return meals grouped by hour
      return Array.from({ length: 24 }).map((_, hour) => {
        const hourlyCalories = todayMeals
          .filter(meal => new Date(meal.timestamp).getHours() === hour)
          .reduce((sum, meal) => sum + meal.calories, 0);
          
        return {
          hour: `${hour}:00`,
          calories: hourlyCalories,
          target: Math.round(targetCalories / 24) // Hourly target (simplified)
        };
      });
    } else {
      // For weekly view, show last 7 days
      const startDay = startOfWeek(today);
      const endDay = endOfWeek(today);
      dateRange = eachDayOfInterval({ start: startDay, end: endDay });
      
      return dateRange.map(date => {
        const dayMeals = mealData.filter(meal => 
          format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
        
        const totalCalories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0);
        
        return {
          date: format(date, 'EEE'),
          fullDate: format(date, 'MMM dd'),
          calories: totalCalories,
          target: targetCalories,
          lowerBound: targetCalories * 0.9, // 10% under target
          upperBound: targetCalories * 1.1  // 10% over target
        };
      });
    }
  }, [mealData, viewMode, targetCalories]);
  
  const chartConfig = {
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
  };

  if (viewMode === "daily") {
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
  }
  
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
