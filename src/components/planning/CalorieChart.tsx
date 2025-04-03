
import { useMealChartData, MealChartData } from "./hooks/useMealChartData";
import { DailyCalorieChart } from "./charts/DailyCalorieChart";
import { WeeklyCalorieChart } from "./charts/WeeklyCalorieChart";
import { DailyChartData, WeeklyChartData } from "./hooks/utils/formatChartData";

interface CalorieChartProps {
  petId: string;
  targetCalories: number;
  viewMode: "daily" | "weekly";
}

export const CalorieChart = ({ petId, targetCalories, viewMode }: CalorieChartProps) => {
  const { chartData } = useMealChartData(petId, targetCalories, viewMode);
  
  if (viewMode === "daily") {
    return <DailyCalorieChart 
      chartData={chartData as DailyChartData[]} 
      targetCalories={targetCalories} 
    />;
  }
  
  return <WeeklyCalorieChart 
    chartData={chartData as WeeklyChartData[]} 
    targetCalories={targetCalories} 
  />;
};
