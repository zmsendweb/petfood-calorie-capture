
import { DogStandard } from "../../types/dogTypes";

export const workingLargeDogs: DogStandard[] = [
  {
    breed: "Great Dane",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    ageSpecificCalories: {
      puppy: { min: 2200, max: 3200 },
      adult: { min: 2000, max: 3000 },
      senior: { min: 1700, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Multiple smaller meals recommended to prevent bloat",
    nutritionNotes: {
      puppy: "Critical to prevent rapid growth in puppies, feed large breed puppy formula with moderate protein (23-26%) and controlled calcium intake.",
      adult: "Moderate protein (23-26%) recommended, feed elevated to prevent bloat. Monitor calcium levels for proper muscle function.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80"
  },
  {
    breed: "Saint Bernard",
    size: "Large",
    dailyCalories: { min: 1800, max: 2800 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 3000 },
      adult: { min: 1800, max: 2800 },
      senior: { min: 1500, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Watch for rapid growth in puppies",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, moderate protein (23-25%). Risk of bloat - avoid exercise after meals. Joint health supplements recommended.",
      adult: "Moderate protein (23-25%), risk of bloat - avoid exercise after meals. Joint health supplements recommended.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1592754888953-4cc99c0b4d3f?q=80"
  }
];
