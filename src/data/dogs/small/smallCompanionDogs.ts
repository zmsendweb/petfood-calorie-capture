
import { DogStandard } from "../../types/dogTypes";

export const smallCompanionDogs: DogStandard[] = [
  {
    breed: "French Bulldog",
    size: "Small",
    dailyCalories: { min: 700, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1100 },
      adult: { min: 700, max: 1000 },
      senior: { min: 550, max: 850 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Prone to obesity, monitor intake carefully",
    nutritionNotes: {
      puppy: "Brachycephalic breed needs small kibble size. Moderate protein (24-26%) for controlled growth. Watch for food allergies early.",
      adult: "Respiratory-friendly kibble shape. Lower fat content (10-14%) to prevent obesity. Joint supplements recommended from early adulthood.",
      senior: "Significant calorie reduction after 7 years. Elevated feeding position helpful. Consider mobility supplements and digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442b31b?q=80"
  },
  {
    breed: "Shih Tzu",
    size: "Small",
    dailyCalories: { min: 400, max: 700 },
    ageSpecificCalories: {
      puppy: { min: 500, max: 800 },
      adult: { min: 400, max: 700 },
      senior: { min: 350, max: 600 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Low exercise needs, watch for overfeeding",
    nutritionNotes: {
      puppy: "Small breed, needs frequent small meals with high-quality protein (26-28%). Monitor for proper weight gain.",
      adult: "Prone to obesity, feed measured portions of low-fat diet. Consider dental health with kibble size.",
      senior: "May need softer food with age, high-quality protein sources (22-24%) for muscle maintenance. Dental care remains a priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?q=80"
  },
  {
    breed: "Bichon Frise",
    size: "Small",
    dailyCalories: { min: 300, max: 500 },
    ageSpecificCalories: {
      puppy: { min: 350, max: 550 },
      adult: { min: 300, max: 500 },
      senior: { min: 250, max: 450 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate activity level, prone to dental issues",
    nutritionNotes: {
      puppy: "Quality protein (24-26%) for proper growth. Consider dental-friendly kibble early. Fatty acids for coat health.",
      adult: "Moderate protein (22-24%) sufficient. Dental health formulas beneficial. Consider supplements for white coat maintenance.",
      senior: "Lower calorie density with protein (20-22%). Monitor dental health closely. Joint supplements may benefit."
    },
    imageUrl: "https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?q=80"
  },
  {
    breed: "Pug",
    size: "Small",
    dailyCalories: { min: 400, max: 600 },
    ageSpecificCalories: {
      puppy: { min: 450, max: 650 },
      adult: { min: 400, max: 600 },
      senior: { min: 350, max: 550 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Brachycephalic breed, prone to obesity",
    nutritionNotes: {
      puppy: "Controlled growth important. Small kibble for brachycephalic anatomy. Monitor weight gain closely.",
      adult: "Very prone to obesity - strict portion control essential. Low-fat (8-12%) formulas beneficial.",
      senior: "Further calorie reduction needed with age. Consider joint supplements and elevated feeding position."
    },
    imageUrl: "https://images.unsplash.com/photo-1553698217-934b000f1f00?q=80"
  }
];
