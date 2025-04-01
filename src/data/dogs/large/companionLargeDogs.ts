
import { DogStandard } from "../../types/dogTypes";

export const companionLargeDogs: DogStandard[] = [
  {
    breed: "Labrador Retriever",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed, adjust based on activity level",
    nutritionNotes: {
      puppy: "Controlled growth is essential. Puppies need 22-24% protein and 8-12% fat. Feed puppy-specific large breed formula to prevent orthopedic issues.",
      adult: "Active adults need 22-26% protein. Consider joint supplements for active lifestyle. Monitor body condition score to prevent obesity.",
      senior: "Reduced calories needed after 7 years. Lower fat (10-12%) and moderate protein (22-24%) with glucosamine/chondroitin for joints."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80"
  },
  {
    breed: "Golden Retriever",
    size: "Large",
    dailyCalories: { min: 1300, max: 2100 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2400 },
      adult: { min: 1300, max: 2100 },
      senior: { min: 1100, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Adjust based on age and activity",
    nutritionNotes: {
      puppy: "Controlled growth essential with large breed puppy formula. Moderate protein (22-24%) and balanced calcium-phosphorus ratio.",
      adult: "Prone to food allergies - watch for skin issues. Omega-3 fatty acids beneficial (EPA/DHA). Moderate protein (22-24%) sufficient.",
      senior: "Cancer-preventative antioxidants recommended after 7 years. Glucosamine/chondroitin for joints. Lower calorie density to prevent weight gain."
    },
    imageUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80"
  },
  {
    breed: "Bernese Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2500 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large breed, careful feeding during growth",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, joint health supplements recommended. Moderate protein (23-26%).",
      adult: "Joint health supplements recommended. Moderate protein (23-26%). Watch for bloat - feed smaller meals.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1582828470841-f822d98dc4b1?q=80"
  }
];
