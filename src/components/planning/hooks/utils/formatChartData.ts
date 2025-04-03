
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { MealEntry } from "@/types/mealTypes";

export type DailyChartData = {
  hour: string;
  calories: number;
  target: number;
};

export type WeeklyChartData = {
  date: string;
  fullDate: string;
  calories: number;
  target: number;
  lowerBound: number;
  upperBound: number;
};

export const formatDailyChartData = (mealData: MealEntry[], targetCalories: number): DailyChartData[] => {
  const today = new Date();
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
};

export const formatWeeklyChartData = (mealData: MealEntry[], targetCalories: number): WeeklyChartData[] => {
  const today = new Date();
  const startDay = startOfWeek(today);
  const endDay = endOfWeek(today);
  const dateRange = eachDayOfInterval({ start: startDay, end: endDay });
  
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
};
