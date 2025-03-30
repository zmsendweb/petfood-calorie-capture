
import { CatStandard } from "../../types/catTypes";

export const exoticLonghairs: CatStandard[] = [
  {
    breed: "Persian",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Flat face needs special kibble shape. Quality protein (30-34%) for coat health. Monitor respiratory effort during meals.",
    nutritionNotes: {
      kitten: "Small kibble size essential. Moderate protein (34-38%) with omega fatty acids for coat development.",
      adult: "Quality protein (30-34%) with fatty acids for coat maintenance. Consider wet food to aid hydration.",
      senior: "Moderate protein (28-32%), elevated feeding position. Softer food may be needed for dental issues."
    },
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  },
  {
    breed: "Turkish Angora",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Silky coat needs quality protein (32-36%) and omega fatty acids. Monitor weight as activity decreases with age.",
    nutritionNotes: {
      kitten: "High protein (36-40%) with omega-3 for coat development. Monitor growth rate - avoid excessive weight gain.",
      adult: "Quality protein (32-36%) with biotin and zinc for coat health. Consider adding omega supplements.",
      senior: "Maintain muscle mass with quality protein (30-34%). Monitor kidney function and adjust phosphorus as needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?q=80"
  },
  {
    breed: "Balinese",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed needs quality protein (33-38%). Silky coat requires specific nutrients. Watch for food allergies.",
    nutritionNotes: {
      kitten: "High protein (38-42%) supports active development. Hypoallergenic diet may benefit sensitive individuals.",
      adult: "Quality protein (33-38%) maintains muscle tone. Omega supplements enhance coat condition.",
      senior: "Maintain muscle mass with quality protein (30-34%). Monitor for developing food sensitivities."
    },
    imageUrl: "https://images.unsplash.com/photo-1574788200022-583e5e15c762?q=80"
  },
  {
    breed: "Himalayan",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Flat face needs special kibble shape. Quality protein (30-34%) for coat health. Monitor respiratory effort during meals.",
    nutritionNotes: {
      kitten: "Small kibble size essential. Moderate protein (34-38%) with omega fatty acids for coat development.",
      adult: "Quality protein (30-34%) with fatty acids for coat maintenance. Consider wet food to aid hydration.",
      senior: "Moderate protein (28-32%), elevated feeding position. Softer food may be needed for dental issues."
    },
    imageUrl: "https://images.unsplash.com/photo-1570824104453-508955ab713e?q=80"
  }
];
