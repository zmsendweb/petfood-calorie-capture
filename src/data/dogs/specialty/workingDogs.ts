
import { DogStandard } from "../../types/dogTypes";

export const workingDogs: DogStandard[] = [
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
    notes: "Working breed with moderate energy needs, prone to joint issues",
    nutritionNotes: {
      puppy: "Controlled growth essential. Large breed puppy formula with moderate protein (22-24%) and controlled calcium (1.0-1.2%).",
      adult: "Moderate protein (24-26%) with joint supporting nutrients. Watch for obesity which can worsen joint conditions.",
      senior: "Lower calorie density with maintained protein levels (22-24%). Glucosamine/chondroitin and omega-3 supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1568572933382-74d440642117?q=80"
  },
  {
    breed: "Siberian Husky",
    size: "Medium",
    dailyCalories: { min: 1100, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1300, max: 2000 },
      adult: { min: 1100, max: 1800 },
      senior: { min: 900, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy working dog, seasonal calorie needs fluctuate",
    nutritionNotes: {
      puppy: "Moderate protein (24-26%) with higher fat content (14-18%) for energy demands. Monitor growth for even development.",
      adult: "Higher fat content (14-18%) beneficial, especially in colder months or during high activity periods. Increased calories during winter.",
      senior: "Maintain protein levels (22-24%) while moderating fat content based on activity level. Joint supplements beneficial after 7 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1565116129643-8258e232e057?q=80"
  },
  {
    breed: "Alaskan Malamute",
    size: "Large",
    dailyCalories: { min: 1500, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2600 },
      adult: { min: 1500, max: 2400 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Cold-weather working dog with seasonal metabolic changes",
    nutritionNotes: {
      puppy: "Moderate growth rate ideal. Large breed puppy formula with controlled calcium. Higher fat (14-18%) for energy demands.",
      adult: "Significant seasonal calorie fluctuations - up to 30% more calories needed in winter working conditions. Higher fat beneficial.",
      senior: "Joint support critical. Maintain higher protein levels (22-25%) with moderate fat content adjusted for activity level."
    },
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80"
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
    notes: "Large water rescue breed, prone to joint issues and bloat",
    nutritionNotes: {
      puppy: "Very slow growth ideal. Large breed puppy formula with moderate protein (22-24%) and strict calcium control (0.8-1.2%).",
      adult: "Moderate protein (22-24%) with quality sources. Elevated feeding position and multiple meals to reduce bloat risk.",
      senior: "Joint support essential. Lower calorie density while maintaining moderate protein (20-22%). Glucosamine/chondroitin beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1583512603880-910a8cb8d226?q=80"
  },
  {
    breed: "Greater Swiss Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1700, max: 2600 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2800 },
      adult: { min: 1700, max: 2600 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Draft working dog, careful growth management needed",
    nutritionNotes: {
      puppy: "Controlled growth essential. Large breed puppy formula with moderate protein (22-24%) and balanced minerals for proper bone development.",
      adult: "Moderate protein (22-24%) with joint-supporting nutrients. Monitor weight carefully as breed is prone to obesity.",
      senior: "Joint support crucial. Lower calories with maintained protein levels (20-22%). Consider digestive enzymes as seniors often develop issues."
    },
    imageUrl: "https://images.unsplash.com/photo-1602884343824-1345a798ae05?q=80"
  },
  {
    breed: "Saint Bernard",
    size: "Large",
    dailyCalories: { min: 1900, max: 3000 },
    ageSpecificCalories: {
      puppy: { min: 2100, max: 3200 },
      adult: { min: 1900, max: 3000 },
      senior: { min: 1600, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Giant breed, extremely careful growth management needed",
    nutritionNotes: {
      puppy: "Critical to prevent rapid growth. Large breed puppy formula with controlled protein (20-22%) and strict calcium limitation (0.8-1.0%).",
      adult: "Moderate protein (20-22%) sufficient. Elevated feeding position and multiple smaller meals to prevent bloat.",
      senior: "Significant joint support needed. Lower calories while maintaining sufficient protein (18-20%). Glucosamine/chondroitin essential."
    },
    imageUrl: "https://images.unsplash.com/photo-1575833947876-a8f469c595f9?q=80"
  },
  {
    breed: "Leonberger",
    size: "Large",
    dailyCalories: { min: 1800, max: 2900 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 3100 },
      adult: { min: 1800, max: 2900 },
      senior: { min: 1500, max: 2400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large working dog with thick coat requiring nutritional support",
    nutritionNotes: {
      puppy: "Slow steady growth essential. Large breed puppy formula with moderate protein (22-24%) and controlled calcium (0.8-1.2%).",
      adult: "Moderate protein (22-24%) with omega fatty acids for coat health. Elevated feeding to prevent bloat.",
      senior: "Joint support crucial. Moderate protein (20-22%) with additional coat-supporting nutrients. Consider digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1561495766-c83348bb7644?q=80"
  },
  {
    breed: "Dogue de Bordeaux",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2500 },
      senior: { min: 1400, max: 2100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Brachycephalic breed with shorter lifespan, early senior care",
    nutritionNotes: {
      puppy: "Controlled growth essential. Large breed puppy formula with moderate protein (22-24%) and controlled calcium (0.8-1.2%).",
      adult: "Heart-supportive nutrients beneficial from early adulthood. Moderate protein (22-24%). Consider elevated feeding position.",
      senior: "Senior care often begins earlier (5-6 years). Heart and joint support crucial. Moderate protein (20-22%) with taurine supplementation."
    },
    imageUrl: "https://images.unsplash.com/photo-1608096299210-db7e38487075?q=80"
  },
  {
    breed: "Tibetan Mastiff",
    size: "Large",
    dailyCalories: { min: 1600, max: 2800 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 3000 },
      adult: { min: 1600, max: 2800 },
      senior: { min: 1300, max: 2300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 1,
      senior: 1
    },
    notes: "Ancient guardian breed with seasonal metabolic changes",
    nutritionNotes: {
      puppy: "Slow steady growth essential. Moderate protein (22-24%) with controlled minerals. Monitor for proper development.",
      adult: "Significant seasonal metabolic changes - appetite may decrease substantially in warmer months. Single large meal daily often preferred.",
      senior: "Joint support important. Moderate protein (20-22%) while monitoring seasonal appetite changes. Adjust feeding schedule as needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1553536645-e73811706c9a?q=80"
  },
  {
    breed: "Cane Corso",
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
    notes: "Working guardian breed, careful growth management needed",
    nutritionNotes: {
      puppy: "Controlled growth essential. Large breed puppy formula with moderate protein (22-24%) and careful calcium balance (0.8-1.2%).",
      adult: "Moderate protein (24-26%) for muscle maintenance. Consider elevated feeding position and multiple smaller meals.",
      senior: "Joint support critical. Moderate protein (22-24%) with glucosamine/chondroitin supplementation. Senior care may begin at 7 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1638461822526-35bb66ef562b?q=80"
  }
];