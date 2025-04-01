
import { DogStandard } from "../../types/dogTypes";

export const smallActiveDogs: DogStandard[] = [
  {
    breed: "Dachshund",
    size: "Small",
    dailyCalories: { min: 300, max: 600 },
    ageSpecificCalories: {
      puppy: { min: 400, max: 700 },
      adult: { min: 300, max: 600 },
      senior: { min: 250, max: 500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity, careful portion control needed",
    nutritionNotes: {
      puppy: "Strict portion control needed, consider back health - maintain lean weight. L-carnitine supplementation may benefit.",
      adult: "Prone to obesity, careful portion control needed. Consider back health - maintain lean weight. L-carnitine supplementation may benefit.",
      senior: "Prone to obesity, careful portion control needed. Consider back health - maintain lean weight. L-carnitine supplementation may benefit."
    },
    imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80"
  },
  {
    breed: "Papillon",
    size: "Small",
    dailyCalories: { min: 180, max: 350 },
    ageSpecificCalories: {
      puppy: { min: 220, max: 400 },
      adult: { min: 180, max: 350 },
      senior: { min: 160, max: 300 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 2
    },
    notes: "Active small breed, needs nutrient-dense food",
    nutritionNotes: {
      puppy: "High energy needs despite small size. Quality protein (26-28%) for proper development. Small kibble essential.",
      adult: "Active breed with higher caloric needs than similarly sized dogs. Quality protein (24-26%) maintains energy levels.",
      senior: "Maintain energy with quality protein (22-24%). Monitor dental health carefully with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  }
];
