
import { useState, useEffect, useMemo } from "react";
import { MealEntry } from "@/types/mealTypes";
import { generateMockMealData } from "./utils/mockMealData";
import { 
  formatDailyChartData, 
  formatWeeklyChartData, 
  DailyChartData, 
  WeeklyChartData 
} from "./utils/formatChartData";

export type MealChartData = DailyChartData[] | WeeklyChartData[];

export const useMealChartData = (petId: string, targetCalories: number, viewMode: "daily" | "weekly") => {
  const [mealData, setMealData] = useState<MealEntry[]>([]);
  
  // Load mock data for demonstration
  useEffect(() => {
    const mockMeals = generateMockMealData(petId, targetCalories);
    setMealData(mockMeals);
  }, [petId, targetCalories]);
  
  // Prepare chart data based on view mode
  const chartData = useMemo(() => {
    if (viewMode === "daily") {
      return formatDailyChartData(mealData, targetCalories);
    } else {
      return formatWeeklyChartData(mealData, targetCalories);
    }
  }, [mealData, viewMode, targetCalories]);

  return { chartData, viewMode };
};
