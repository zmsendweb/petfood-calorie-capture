
import { DogStandard } from "../../types/dogTypes";

export const rareSportingDogs: DogStandard[] = [
  {
    breed: "Boykin Spaniel",
    size: "Medium",
    dailyCalories: { min: 750, max: 1150 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1300 },
      adult: { min: 750, max: 1150 },
      senior: { min: 650, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "American water retriever with moderate energy needs",
    nutritionNotes: {
      puppy: "Support lean muscle development. Moderate protein (25-28%) with adequate fat for energy.",
      adult: "Working retrievers need quality protein (24-26%) with fatty acids for coat and joint health.",
      senior: "Maintain muscle mass with continued protein quality (22-24%). Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "Field Spaniel",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1350 },
      adult: { min: 800, max: 1200 },
      senior: { min: 700, max: 1050 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Rare sporting dog with silky coat",
    nutritionNotes: {
      puppy: "Support coat development with omega fatty acids. Quality protein (24-26%) for proper growth.",
      adult: "Working retrievers need quality protein (22-25%) with fatty acids for coat and joint health.",
      senior: "Lower calorie needs with age. Quality protein (20-22%) with joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80"
  },
  {
    breed: "Bracco Italiano",
    size: "Large",
    dailyCalories: { min: 1400, max: 1900 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2100 },
      adult: { min: 1400, max: 1900 },
      senior: { min: 1200, max: 1700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Italian pointer with strong hunting instincts",
    nutritionNotes: {
      puppy: "Control growth for joint health. Moderate protein (23-26%) with balanced calcium/phosphorus.",
      adult: "Working pointers need quality protein (22-25%) with adequate energy for field work.",
      senior: "Joint support increasingly important. Moderate protein (20-22%) with glucosamine/chondroitin."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08dcf9738661?q=80"
  },
  {
    breed: "Spinone Italiano",
    size: "Large",
    dailyCalories: { min: 1500, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2200 },
      adult: { min: 1500, max: 2000 },
      senior: { min: 1300, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Wire-coated Italian pointer with moderate energy",
    nutritionNotes: {
      puppy: "Control growth for joint health. Moderate protein (23-26%) with balanced calcium/phosphorus.",
      adult: "Working pointers need quality protein (22-25%) with adequate energy for field work.",
      senior: "Joint support increasingly important. Moderate protein (20-22%) with glucosamine/chondroitin."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08dcf9738661?q=80"
  },
  {
    breed: "Sussex Spaniel",
    size: "Medium",
    dailyCalories: { min: 850, max: 1250 },
    ageSpecificCalories: {
      puppy: { min: 950, max: 1400 },
      adult: { min: 850, max: 1250 },
      senior: { min: 750, max: 1100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Rare British sporting breed, moderate energy",
    nutritionNotes: {
      puppy: "Support steady growth. Moderate protein (24-26%) for muscle development.",
      adult: "Working spaniels need quality protein (22-25%) with adequate energy for field work.",
      senior: "Joint support increasingly important. Moderate protein (20-22%) with lower calories as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80"
  }
];
