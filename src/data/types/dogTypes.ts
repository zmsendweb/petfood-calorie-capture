
/**
 * Type definitions for dog breed standards
 */

export interface DogStandard {
  breed: string;
  size: "Small" | "Medium" | "Large";
  dailyCalories: {
    min: number;
    max: number;
  };
  ageSpecificCalories: {
    puppy: {
      min: number;
      max: number;
    };
    adult: {
      min: number;
      max: number;
    };
    senior: {
      min: number;
      max: number;
    };
  };
  mealsPerDay: {
    puppy: number;
    adult: number;
    senior: number;
  };
  notes: string;
  nutritionNotes: {
    puppy: string;
    adult: string;
    senior: string;
  };
  imageUrl: string;
  isSpecialty?: boolean;
}
