
import { DogStandard } from "../../types/dogTypes";

export const sportingLargeDogs: DogStandard[] = [
  {
    breed: "Siberian Husky",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2200 },
      adult: { min: 1400, max: 2000 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy needs, especially in cold weather",
    nutritionNotes: {
      puppy: "Rapid growth, needs high-quality protein (25-28%) and balanced calcium-phosphorus ratio. Monitor for proper weight gain.",
      adult: "High energy needs, especially in cold weather. Adjust food intake based on activity level. Consider joint supplements for active dogs.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80"
  },
  {
    breed: "Boxer",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2400 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed, needs protein-rich diet",
    nutritionNotes: {
      puppy: "High protein requirements (25-30%), consider heart health supplements. Watch for food sensitivities.",
      adult: "Athletic breed, needs protein-rich diet (25-30%), consider heart health supplements. Watch for food sensitivities.",
      senior: "Athletic breed, needs protein-rich diet (25-30%), consider heart health supplements. Watch for food sensitivities."
    },
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80"
  }
];
