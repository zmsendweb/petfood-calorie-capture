
import { DogStandard } from "../../types/dogTypes";

export const sportingDogs: DogStandard[] = [
  {
    breed: "Golden Retriever",
    size: "Large",
    dailyCalories: { min: 1300, max: 1700 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 1900 },
      adult: { min: 1300, max: 1700 },
      senior: { min: 1100, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity, monitor weight closely",
    nutritionNotes: {
      puppy: "Large breed puppy formula recommended until 12-15 months. Moderate protein (22-24%) and balanced minerals for proper growth.",
      adult: "Moderate protein (22-24%) sufficient. Monitor portion sizes carefully as breed is prone to obesity.",
      senior: "Lower calorie density with maintained protein (20-22%). Joint supplements beneficial after 7 years. Cancer prevention nutrients advised."
    },
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80"
  },
  {
    breed: "Labrador Retriever",
    size: "Large",
    dailyCalories: { min: 1400, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2000 },
      adult: { min: 1400, max: 1800 },
      senior: { min: 1200, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Very food motivated, strict portion control needed",
    nutritionNotes: {
      puppy: "Large breed puppy formula recommended until 12-15 months. Moderate protein (22-24%) and controlled calcium (1.0-1.2%).",
      adult: "Strong tendency toward obesity - strict portion control essential. Moderate protein (22-24%) sufficient.",
      senior: "Lower calorie density with maintained protein (20-22%). Joint supplements beneficial after 7 years. L-carnitine may help metabolism."
    },
    imageUrl: "https://images.unsplash.com/photo-1579213838757-c25c8997eb9a?q=80"
  },
  {
    breed: "English Springer Spaniel",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1600 },
      adult: { min: 1000, max: 1400 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active field dogs may need significantly more calories",
    nutritionNotes: {
      puppy: "Balanced growth formula with moderate protein (24-26%). Monitor for proper weight gain and development.",
      adult: "Field working dogs may need 20-40% more calories during hunting season. Adjust based on activity level.",
      senior: "Joint support beneficial. Moderate protein (22-24%) with attention to ear and skin health which can decline with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1610041518868-a3c6631972b4?q=80"
  },
  {
    breed: "German Shorthaired Pointer",
    size: "Large",
    dailyCalories: { min: 1300, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2000 },
      adult: { min: 1300, max: 1800 },
      senior: { min: 1100, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy hunting dog, adjust calories with activity",
    nutritionNotes: {
      puppy: "Focus on steady growth. Moderate protein (24-26%) to support muscle development without excessive growth rate.",
      adult: "Working dogs may need 30-50% more calories during hunting season. Higher protein (26-30%) beneficial for working dogs.",
      senior: "Maintain muscle with adequate protein (24-26%). Lower calories with decreased activity. Joint support important."
    },
    imageUrl: "https://images.unsplash.com/photo-1529944618548-a8aca7941813?q=80"
  },
  {
    breed: "Vizsla",
    size: "Medium",
    dailyCalories: { min: 1200, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1400, max: 1800 },
      adult: { min: 1200, max: 1600 },
      senior: { min: 1000, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy level, rarely overweight",
    nutritionNotes: {
      puppy: "Balanced growth with moderate protein (24-26%). Multiple meals until 6 months to support energy needs.",
      adult: "Often needs more calories than similarly sized breeds due to high activity. Higher protein (24-28%) beneficial.",
      senior: "Maintain muscle with adequate protein (22-24%). Senior formulas with joint support typically beneficial after 8 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1591946599868-6c7d208a8545?q=80"
  },
  {
    breed: "Irish Setter",
    size: "Large",
    dailyCalories: { min: 1400, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2000 },
      adult: { min: 1400, max: 1800 },
      senior: { min: 1200, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Deep-chested breed, bloat risk",
    nutritionNotes: {
      puppy: "Large breed puppy formula recommended. Moderate protein (22-24%) and controlled calcium for proper bone development.",
      adult: "Elevated feeding position and multiple meals recommended to reduce bloat risk. Consider adding probiotics.",
      senior: "Lower calorie density with maintained protein (20-22%). Joint support beneficial. Monitor ear health."
    },
    imageUrl: "https://images.unsplash.com/photo-1636484231025-845c6dca8fb6?q=80"
  },
  {
    breed: "Weimaraner",
    size: "Large",
    dailyCalories: { min: 1500, max: 1900 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2100 },
      adult: { min: 1500, max: 1900 },
      senior: { min: 1300, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Very active breed, bloat risk",
    nutritionNotes: {
      puppy: "Controlled growth essential. Large breed puppy formula with moderate protein (22-24%) and balanced minerals.",
      adult: "Deep-chested breed - elevated feeding and multiple smaller meals advised. High quality protein (24-28%) for active lifestyle.",
      senior: "Joint support essential after 7-8 years. Maintain muscle with adequate protein (22-24%) while reducing calories."
    },
    imageUrl: "https://images.unsplash.com/photo-1575068334092-37f7a8a4c49f?q=80"
  },
  {
    breed: "Brittany",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1700 },
      adult: { min: 1000, max: 1500 },
      senior: { min: 800, max: 1300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Extremely high energy hunting dog",
    nutritionNotes: {
      puppy: "Balanced growth with moderate protein (24-26%). Monitor for proper development without excessive weight gain.",
      adult: "Working dogs need significantly more calories (30-40%) during hunting season. Higher protein (26-30%) beneficial for working dogs.",
      senior: "Maintain muscle with adequate protein (22-26%). Senior care typically begins around 8-9 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1566703709349-a8cc01bdad6a?q=80"
  },
  {
    breed: "English Cocker Spaniel",
    size: "Medium",
    dailyCalories: { min: 900, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1500 },
      adult: { min: 900, max: 1300 },
      senior: { min: 750, max: 1100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity and ear issues",
    nutritionNotes: {
      puppy: "Balanced growth with moderate protein (24-26%). Monitor ears for infection which can relate to food allergies.",
      adult: "Prone to weight gain - strict portion control needed. Moderate protein (22-24%) sufficient. Monitor ear health.",
      senior: "Lower calorie density needed as activity decreases. Omega fatty acids beneficial for coat and skin health in aging dogs."
    },
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80"
  },
  {
    breed: "Chesapeake Bay Retriever",
    size: "Large",
    dailyCalories: { min: 1400, max: 1900 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2100 },
      adult: { min: 1400, max: 1900 },
      senior: { min: 1200, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Water retriever with waterproof coat needing nutritional support",
    nutritionNotes: {
      puppy: "Large breed puppy formula until 12-15 months. Omega fatty acids important for coat development.",
      adult: "Working dogs need significantly more calories during hunting season. Higher protein (24-28%) with omega fatty acids for coat maintenance.",
      senior: "Joint support critical for water working breed. Maintain coat health with continued omega fatty acid supplementation."
    },
    imageUrl: "https://images.unsplash.com/photo-1525146021182-1cd2ee2912f3?q=80"
  }
];