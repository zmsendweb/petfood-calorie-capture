
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
  },
  {
    breed: "Irish Wolfhound",
    size: "Large",
    dailyCalories: { min: 1800, max: 2600 },
    ageSpecificCalories: {
      puppy: { min: 2200, max: 3000 },
      adult: { min: 1800, max: 2600 },
      senior: { min: 1500, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Giant breed with heart health concerns",
    nutritionNotes: {
      puppy: "Extremely slow growth essential. Large breed puppy formula with controlled calcium (0.8-1.2%). Monitor weight gain carefully.",
      adult: "Consider heart-supporting nutrients (taurine, L-carnitine). Moderate protein (22-26%) with quality sources.",
      senior: "Heart and joint support increasingly important. Lower calorie density but maintain protein quality."
    },
    imageUrl: "https://images.unsplash.com/photo-1562221440-aba53eccb820?q=80"
  },
  {
    breed: "Newfoundland",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2800 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Water-resistant coat needs nutritional support",
    nutritionNotes: {
      puppy: "Control growth carefully. Balanced omega fatty acids for coat development. Joint support from early age.",
      adult: "Coat health important - balanced omega 3/6 ratio. Moderate protein (22-26%) sufficient for maintenance.",
      senior: "Joint support critical. Lower calorie density but maintain nutrient quality. Consider digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1569809317138-8d5729610d7f?q=80"
  },
  {
    breed: "Leonberger",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 2900 },
      adult: { min: 1700, max: 2500 },
      senior: { min: 1400, max: 2100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working breed with thick double coat",
    nutritionNotes: {
      puppy: "Control growth rate carefully. Balanced nutrition with joint-supporting nutrients. Monitor weight gain.",
      adult: "Coat health important - balanced omega fatty acids. Moderate protein (22-26%) with quality sources.",
      senior: "Joint support essential. Lower calorie density but maintain protein quality. Consider digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80"
  }
]
