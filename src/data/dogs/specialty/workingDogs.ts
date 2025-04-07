
import { DogStandard } from "../../types/dogTypes";

export const workingDogs: (DogStandard & { isSpecialty: boolean })[] = [
  {
    breed: "Alaskan Malamute",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2700 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Arctic sled dog with higher fat needs",
    nutritionNotes: {
      puppy: "Control growth for joint health. High-quality protein (24-26%) with moderate fat (12-15%).",
      adult: "Higher fat content (14-18%) beneficial, especially in cold weather. Quality protein (24-26%).",
      senior: "Adjust calories as activity decreases. Quality protein (22-24%) for muscle maintenance."
    },
    imageUrl: "https://images.unsplash.com/photo-1602268867417-aefbf6a96db5?q=80",
    isSpecialty: true
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
    notes: "Mountain dog with heavy coat",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, joint health supplements recommended. Moderate protein (23-26%).",
      adult: "Joint health supplements recommended. Moderate protein (23-26%). Watch for bloat - feed smaller meals.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1569809317138-8d5729610d7f?q=80",
    isSpecialty: true
  },
  {
    breed: "Dogue de Bordeaux",
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
    notes: "French mastiff with brachycephalic features",
    nutritionNotes: {
      puppy: "Control growth for joint health. Moderate protein (23-25%) for controlled development.",
      adult: "Special feeding considerations for brachycephalic breed. Moderate protein (22-25%).",
      senior: "Joint support essential. Lower calorie density but maintain protein quality."
    },
    imageUrl: "https://images.unsplash.com/photo-1558349699-f8878747be34?q=80",
    isSpecialty: true
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
    notes: "Water rescue dog with thick coat",
    nutritionNotes: {
      puppy: "Control growth carefully. Balanced omega fatty acids for coat development. Joint support from early age.",
      adult: "Coat health important - balanced omega 3/6 ratio. Moderate protein (22-26%) sufficient for maintenance.",
      senior: "Joint support critical. Lower calorie density but maintain nutrient quality. Consider digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1551730458-5bae38e2ed98?q=80",
    isSpecialty: true
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
    notes: "Draft dog with strong build",
    nutritionNotes: {
      puppy: "Control growth for joint health. Moderate protein (22-25%) for controlled development.",
      adult: "Working dogs may need higher calories. Quality protein (22-25%) maintains muscle.",
      senior: "Joint support essential. Moderate protein (20-23%) with joint supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1550437628-c05fba329b2c?q=80",
    isSpecialty: true
  }
];
