import { DogStandard } from "../../types/dogTypes";

export const workingDogs: DogStandard[] = [
  {
    breed: "Akita",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to food allergies, watch ingredients carefully",
    nutritionNotes: {
      puppy: "Slow growth essential for joint health. Large breed puppy formula with moderate protein (22-24%) recommended.",
      adult: "Watch for food sensitivities. Limited ingredient diets may benefit. Moderate protein (24-26%) from novel sources.",
      senior: "Joint supplements essential. Moderate protein (22-24%) maintains muscle mass. Monitor for allergies throughout life."
    },
    imageUrl: "https://images.unsplash.com/photo-1544131263-24437a4f181e?q=80"
  },
  {
    breed: "Portuguese Water Dog",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 900, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working water dog, needs coat support",
    nutritionNotes: {
      puppy: "Moderate growth rate important. Quality protein (24-26%) supports proper development. Omega fatty acids for coat.",
      adult: "Working water dog needs quality nutrition. Higher fat (14-16%) supports waterproof coat. Quality protein (24-26%) maintains energy.",
      senior: "Moderate protein (22-24%) maintains muscle mass. Coat support remains important. Joint supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1550953581-a75aa86fec90?q=80"
  },
  {
    breed: "Newfoundland",
    size: "Large",
    dailyCalories: { min: 1800, max: 2800 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 3000 },
      adult: { min: 1800, max: 2800 },
      senior: { min: 1500, max: 2300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Giant working breed, prone to joint issues",
    nutritionNotes: {
      puppy: "Very slow growth crucial. Giant breed puppy formula with carefully controlled calcium (0.8-1.0%). Monitor growth rate closely.",
      adult: "Risk of bloat - elevated feeding position and multiple meals recommended. Moderate protein (22-26%) maintains muscle.",
      senior: "Joint support essential. Moderate protein (20-24%) prevents muscle loss. Significant calorie reduction with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1521128591876-b4ace034003a?q=80"
  },
  {
    breed: "Greater Swiss Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1800, max: 2600 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 2800 },
      adult: { min: 1800, max: 2600 },
      senior: { min: 1500, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working breed with heavy bone structure",
    nutritionNotes: {
      puppy: "Slow growth essential for joint health. Large breed puppy formula with controlled calcium (1.0-1.2%) recommended.",
      adult: "Working breed needs quality nutrition. Moderate protein (24-26%) maintains muscle mass. Joint supplements beneficial.",
      senior: "Joint support essential. Moderate protein (22-24%) prevents muscle loss. Significant calorie reduction with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442b31b?q=80"
  },
  {
    breed: "Alaskan Malamute",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working sled dog, seasonal energy variations",
    nutritionNotes: {
      puppy: "Controlled growth important for joint development. Moderate protein (24-26%) prevents excessive growth rate.",
      adult: "Higher fat (16-20%) beneficial in cold weather/working conditions. Adjust calories seasonally. Higher protein (26-30%) for working dogs.",
      senior: "Moderate protein (22-26%) maintains muscle mass. Reduce calories if activity decreases. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1620408432326-70e5e5bb9a0e?q=80"
  }
];
