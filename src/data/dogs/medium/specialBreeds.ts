
import { DogStandard } from "../../types/dogTypes";

export const specialBreeds: DogStandard[] = [
  {
    breed: "Poodle (Standard)",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1500 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Highly active, needs balanced nutrition",
    nutritionNotes: {
      puppy: "Rapid growth phase, needs high-quality protein (25-28%) and balanced calcium-phosphorus ratio. Monitor for proper weight gain.",
      adult: "Active breed, needs balanced nutrition with moderate protein (23-26%). Consider coat maintenance needs with omega fatty acids.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor dental health and adjust food texture if needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80"
  },
  {
    breed: "Bulldog",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 800, max: 1200 },
      senior: { min: 650, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to weight gain, monitor carefully",
    nutritionNotes: {
      puppy: "Brachycephalic breed, needs small kibble size and elevated feeding position. Moderate protein (24-26%) for controlled growth.",
      adult: "Respiratory-friendly kibble shape, lower fat content (10-14%) to prevent obesity. Joint supplements recommended from early adulthood.",
      senior: "Significant calorie reduction after 7 years, elevated feeding position helpful. Consider mobility supplements and digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1521907236370-15e7b9f7e13a?q=80"
  }
];
