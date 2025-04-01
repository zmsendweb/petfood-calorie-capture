
import { DogStandard } from "../../types/dogTypes";

export const guardLargeDogs: DogStandard[] = [
  {
    breed: "German Shepherd",
    size: "Large",
    dailyCalories: { min: 1700, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2400 },
      senior: { min: 1400, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed, needs protein-rich diet",
    nutritionNotes: {
      puppy: "Calcium-phosphorus ratio critical (1.2:1). Moderate growth formula with 22-24% protein. Monitor growth rate to prevent joint issues.",
      adult: "Higher protein (26-28%) for muscle maintenance. Consider multiple smaller meals to prevent bloat. DHA supplementation beneficial.",
      senior: "Joint support essential after 7 years. Moderate protein (24%) and lower phosphorus levels for kidney health. Antioxidants for cognitive support."
    },
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80"
  },
  {
    breed: "Rottweiler",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 2800 },
      adult: { min: 1800, max: 2500 },
      senior: { min: 1500, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Requires high protein diet, prone to weight gain if inactive",
    nutritionNotes: {
      puppy: "Controlled growth is essential, feed large breed puppy formula with moderate protein (22-24%) and balanced calcium-phosphorus ratio.",
      adult: "Requires high protein diet (26-28%) for muscle maintenance. Consider multiple smaller meals to prevent bloat.",
      senior: "Joint support essential after 7 years, moderate protein (24%) and lower phosphorus levels for kidney health. Antioxidants for cognitive support."
    },
    imageUrl: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?q=80"
  },
  {
    breed: "Doberman Pinscher",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed, needs balanced protein and fat",
    nutritionNotes: {
      puppy: "High protein needs (25-30%), consider taurine supplementation for heart health. Watch for food allergies.",
      adult: "Athletic breed, needs balanced protein and fat (25-30%), consider taurine supplementation for heart health. Watch for food allergies.",
      senior: "Athletic breed, needs balanced protein and fat (25-30%), consider taurine supplementation for heart health. Watch for food allergies."
    },
    imageUrl: "https://images.unsplash.com/photo-1595792463990-93d4dec2dfc8?q=80"
  }
];
