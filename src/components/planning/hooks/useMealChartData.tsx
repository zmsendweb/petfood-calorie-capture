
import { useState, useEffect, useMemo } from "react";
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { MealEntry } from "@/types/mealTypes";

export const useMealChartData = (petId: string, targetCalories: number, viewMode: "daily" | "weekly") => {
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

  return { chartData, viewMode };
};
