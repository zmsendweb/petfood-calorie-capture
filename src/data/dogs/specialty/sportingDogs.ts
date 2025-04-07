
import { DogStandard } from "../../types/dogTypes";

export const sportingDogs: (DogStandard & { isSpecialty: boolean })[] = [
  {
    breed: "Pointer",
    size: "Medium",
    dailyCalories: { min: 1100, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1300, max: 1800 },
      adult: { min: 1100, max: 1600 },
      senior: { min: 900, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hunting dog with high exercise needs",
    nutritionNotes: {
      puppy: "Support joint development with proper calcium/phosphorus ratio. Quality protein (25-28%) needed.",
      adult: "Higher calories during hunting season. Quality protein (24-26%) with fatty acids for endurance.",
      senior: "Joint support supplements beneficial. Moderate protein (22-24%) to maintain muscle mass."
    },
    imageUrl: "https://images.unsplash.com/photo-1617895153857-82fe79adfcd4?q=80",
    isSpecialty: true
  },
  {
    breed: "Weimaraner",
    size: "Large",
    dailyCalories: { min: 1300, max: 1900 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2200 },
      adult: { min: 1300, max: 1900 },
      senior: { min: 1100, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic hunting breed, high energy",
    nutritionNotes: {
      puppy: "Controlled growth essential for joint health. Quality protein (24-26%) for muscle development.",
      adult: "Active breed needs quality protein (24-26%) and higher calories during hunting season.",
      senior: "Joint support increasingly important. Moderate protein (22-24%) to maintain muscle mass."
    },
    imageUrl: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80",
    isSpecialty: true
  },
  {
    breed: "English Setter",
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
    notes: "Bird dog with moderate energy needs",
    nutritionNotes: {
      puppy: "Support feathered coat development. Quality protein (24-26%) with balanced fatty acids.",
      adult: "Adjust calories based on hunting activity. Omega fatty acids beneficial for coat health.",
      senior: "Joint support increasingly important. Moderate protein (22-24%) to maintain muscle mass."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08dcf9738661?q=80",
    isSpecialty: true
  },
  {
    breed: "Irish Setter",
    size: "Large",
    dailyCalories: { min: 1200, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1400, max: 2000 },
      adult: { min: 1200, max: 1800 },
      senior: { min: 1000, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Energetic bird dog with beautiful coat",
    nutritionNotes: {
      puppy: "Support coat development with omega fatty acids. Control growth for joint health.",
      adult: "High energy breed, quality protein (24-26%) for muscle maintenance. Support coat health.",
      senior: "Joint support increasingly important. Maintain coat health with continued omega supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80",
    isSpecialty: true
  },
  {
    breed: "Gordon Setter",
    size: "Large",
    dailyCalories: { min: 1100, max: 1700 },
    ageSpecificCalories: {
      puppy: { min: 1300, max: 1900 },
      adult: { min: 1100, max: 1700 },
      senior: { min: 900, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Scottish gundog with moderate energy",
    nutritionNotes: {
      puppy: "Support coat development with omega fatty acids. Control growth for joint health.",
      adult: "Adjust calories based on hunting activity. Quality protein (22-24%) maintains muscle.",
      senior: "Joint support increasingly important. Maintain coat health with continued omega supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80",
    isSpecialty: true
  }
];
