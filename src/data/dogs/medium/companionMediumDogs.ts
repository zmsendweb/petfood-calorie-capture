
import { DogStandard } from "../../types/dogTypes";

export const companionMediumDogs: DogStandard[] = [
  {
    breed: "Beagle",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Tendency to overeat, portion control important",
    nutritionNotes: {
      puppy: "Moderate growth, needs balanced nutrition with 24-26% protein. Avoid overfeeding to prevent obesity later in life.",
      adult: "Strong food drive, strict portion control needed. Consider puzzle feeders to slow consumption and prevent weight gain.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80"
  },
  {
    breed: "Corgi",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity, monitor portions carefully",
    nutritionNotes: {
      puppy: "Prone to obesity, strict portion control needed. Consider joint health due to body structure.",
      adult: "Prone to obesity, strict portion control needed. Consider joint health due to body structure.",
      senior: "Prone to obesity, strict portion control needed. Consider joint health due to body structure."
    },
    imageUrl: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?q=80"
  },
  {
    breed: "Cocker Spaniel",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 800, max: 1200 },
      senior: { min: 700, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate activity, prone to ear infections",
    nutritionNotes: {
      puppy: "Quality protein (24-26%) for proper development. Omega fatty acids for coat health. Monitor for food allergies early.",
      adult: "Moderate protein (22-25%) with omega supplements for coat. Prone to obesity - monitor portion sizes.",
      senior: "Lower calorie density needed with age. Consider foods with glucosamine for joint health."
    },
    imageUrl: "https://images.unsplash.com/photo-1591769607592-e27c8e8c48f5?q=80"
  }
];
