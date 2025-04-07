
import { DogStandard } from "../../types/dogTypes";

export const activeMediumDogs: DogStandard[] = [
  {
    breed: "Portuguese Water Dog",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1700 },
      adult: { min: 1000, max: 1400 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working water breed, high energy",
    nutritionNotes: {
      puppy: "Higher protein (26-30%) needed for working breed development. DHA for brain development.",
      adult: "Active working breed, may need more calories during working periods. Quality protein (25-28%) essential.",
      senior: "Maintain muscle mass with adequate protein (23-26%). Joint supplements beneficial as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1550430238-001c438c2025?q=80"
  },
  {
    breed: "Nova Scotia Duck Tolling Retriever",
    size: "Medium",
    dailyCalories: { min: 950, max: 1350 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1500 },
      adult: { min: 950, max: 1350 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Sporting retriever, high endurance",
    nutritionNotes: {
      puppy: "Support joint development with proper calcium/phosphorus ratio. Quality protein (25-28%) needed.",
      adult: "Higher calories during hunting/working season. Quality protein (24-26%) with fatty acids for coat health.",
      senior: "Joint support supplements beneficial. Moderate protein (22-24%) to maintain muscle mass."
    },
    imageUrl: "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80"
  },
  {
    breed: "Belgian Malinois",
    size: "Medium",
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
    notes: "Working breed, extremely high energy",
    nutritionNotes: {
      puppy: "High protein needs (28-32%) for intense physical development. Controlled growth for joint health.",
      adult: "Working breed with high energy requirements. Higher protein (26-30%) needed for muscle maintenance.",
      senior: "Maintain muscle mass with continued quality protein (24-28%). Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1602268867417-aefbf6a96db5?q=80"
  },
  {
    breed: "Kelpie",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 800, max: 1300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Australian herding breed, high endurance",
    nutritionNotes: {
      puppy: "Support steady growth. Higher protein (26-30%) for muscle development. Avoid rapid weight gain.",
      adult: "Extreme energy demands during work. Adjust calories seasonally. Quality protein (25-28%) essential.",
      senior: "Maintain muscle mass as activity decreases. Moderate protein (23-26%) with joint support."
    },
    imageUrl: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?q=80"
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
    notes: "Athletic hunting breed, high exercise needs",
    nutritionNotes: {
      puppy: "Athletic development requires quality protein (26-30%). Monitor growth rate for joint health.",
      adult: "Higher calories during hunting season. Quality protein (24-26%) with essential fatty acids.",
      senior: "Maintain muscle mass with continued protein quality (22-25%). Support joint health as activity changes."
    },
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80"
  },
  {
    breed: "Airedale Terrier",
    size: "Medium",
    dailyCalories: { min: 1100, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1300, max: 1700 },
      adult: { min: 1100, max: 1500 },
      senior: { min: 900, max: 1300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working terrier, needs quality nutrition",
    nutritionNotes: {
      puppy: "Support muscular development with quality protein (25-28%). Monitor growth for joint health.",
      adult: "Coat health important - balanced fatty acids. Moderate protein (24-26%) for muscle maintenance.",
      senior: "Maintain muscle mass with continued protein quality (22-24%). Support joint health as activity changes."
    },
    imageUrl: "https://images.unsplash.com/photo-1598976796336-62e532303c3d?q=80"
  }
];
