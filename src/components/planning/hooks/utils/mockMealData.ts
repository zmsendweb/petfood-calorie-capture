
import { subDays } from "date-fns";
import { MealEntry } from "@/types/mealTypes";

export const generateMockMealData = (petId: string, targetCalories: number): MealEntry[] => {
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
  
  return mockMeals;
};
