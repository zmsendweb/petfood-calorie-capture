
import { DogStandard } from "../../types/dogTypes";

export const workingMediumDogs: DogStandard[] = [
  {
    breed: "Border Collie",
    size: "Medium",
    dailyCalories: { min: 900, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1600 },
      adult: { min: 900, max: 1400 },
      senior: { min: 750, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Very active breed, may need more calories if working",
    nutritionNotes: {
      puppy: "High energy breed, needs quality protein (25-28%) and balanced nutrition for proper growth.",
      adult: "Adjust calories based on herding/working activity. Consider cognitive support supplements for active minds.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80"
  },
  {
    breed: "Australian Shepherd",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 850, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed, adjust based on activity level",
    nutritionNotes: {
      puppy: "High protein needs (25-30%) for working dogs, adjust based on herding activity. Consider joint supplements.",
      adult: "Adjust based on herding activity, consider joint supplements. Monitor weight closely.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80"
  },
  {
    breed: "Shetland Sheepdog",
    size: "Medium",
    dailyCalories: { min: 600, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 700, max: 1100 },
      adult: { min: 600, max: 1000 },
      senior: { min: 500, max: 800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed with moderate caloric needs",
    nutritionNotes: {
      puppy: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition.",
      adult: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition.",
      senior: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition."
    },
    imageUrl: "https://images.unsplash.com/photo-1589210043112-f9be45206827?q=80"
  }
];
