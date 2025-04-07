
export type CatSize = "Small" | "Medium" | "Large" | "Exotic" | "Rare";

export interface CatStandard {
  breed: string;
  size: CatSize;
  dailyCalories: {
    min: number;
    max: number;
  };
  ageSpecificCalories: {
    kitten: { min: number; max: number };
    adult: { min: number; max: number };
    senior: { min: number; max: number };
  };
  mealsPerDay: number;
  mealsByAge: {
    kitten: number;
    adult: number;
    senior: number;
  };
  notes: string;
  nutritionNotes: {
    kitten: string;
    adult: string;
    senior: string;
  };
  imageUrl: string;
  source?: string; // Make source optional
  isExotic?: boolean;
  isRare?: boolean;
}
