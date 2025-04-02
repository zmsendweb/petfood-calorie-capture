
import { useMealChartData } from "./hooks/useMealChartData";
import { DailyCalorieChart } from "./charts/DailyCalorieChart";
import { WeeklyCalorieChart as WeeklyCalorieView } from "./charts/WeeklyCalorieChart";

interface CalorieChartProps {
  petId: string;
  targetCalories: number;
  viewMode: "daily" | "weekly";
}

export const CalorieChart = ({ petId, targetCalories, viewMode }: CalorieChartProps) => {
  const { chartData } = useMealChartData(petId, targetCalories, viewMode);
  
  if (viewMode === "daily") {
    return <DailyCalorieChart chartData={chartData} targetCalories={targetCalories} />;
  }
  
  return <WeeklyCalorieView chartData={chartData} targetCalories={targetCalories} />;
};
