
import { useMealChartData } from "./hooks/useMealChartData";
import { DailyCalorieChart } from "./charts/DailyCalorieChart";
import { WeeklyCalorieChart } from "./charts/WeeklyCalorieChart";

interface CalorieChartProps {
  petId: string;
  targetCalories: number;
  viewMode: "daily" | "weekly";
}

export const CalorieChart = ({ petId, targetCalories, viewMode }: CalorieChartProps) => {
  const { chartData } = useMealChartData(petId, targetCalories, viewMode);
  
  if (viewMode === "daily") {
    return <DailyCalorieChart 
      chartData={chartData as Array<{hour: string; calories: number; target: number}>} 
      targetCalories={targetCalories} 
    />;
  }
  
  return <WeeklyCalorieChart 
    chartData={chartData as Array<{date: string; fullDate: string; calories: number; target: number; lowerBound: number; upperBound: number}>} 
    targetCalories={targetCalories} 
  />;
};
