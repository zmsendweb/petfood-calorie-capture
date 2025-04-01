
import { DogStandard } from "../../types/dogTypes";

export const specialtyMediumDogs: DogStandard[] = [
  {
    breed: "Basset Hound",
    size: "Medium",
    dailyCalories: { min: 800, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1500 },
      adult: { min: 800, max: 1400 },
      senior: { min: 700, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Low energy, prone to obesity",
    nutritionNotes: {
      puppy: "Controlled growth important for joint health. Moderate protein (22-25%) prevents excessive growth.",
      adult: "Prone to obesity - strict portion control essential. Consider L-carnitine supplementation.",
      senior: "Further calorie reduction needed with age. Joint supplements highly beneficial. Monitor weight closely."
    },
    imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80"
  },
  {
    breed: "Chow Chow",
    size: "Medium",
    dailyCalories: { min: 900, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 1000, max: 1400 },
      adult: { min: 900, max: 1300 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Dense coat, needs nutritional support",
    nutritionNotes: {
      puppy: "Controlled growth important. Moderate protein (23-25%) with omega fatty acids for coat development.",
      adult: "Quality protein (22-25%) with biotin and zinc for coat health. Monitor for food sensitivities.",
      senior: "Continued coat support with moderate protein (20-22%). Joint supplements beneficial after 7 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80"
  }
];
