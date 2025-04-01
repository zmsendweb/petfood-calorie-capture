
import { DogStandard } from "../../types/dogTypes";

export const rareWorkingDogs: DogStandard[] = [
  {
    breed: "Thai Ridgeback",
    size: "Medium",
    dailyCalories: { min: 780, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1500 },
      adult: { min: 780, max: 1300 },
      senior: { min: 650, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Primitive breed with efficient metabolism. Quality protein (26-30%) with moderate fat (12-16%). Monitor for food sensitivities.",
    nutritionNotes: {
      puppy: "Monitor growth carefully. Avoid excess calcium/phosphorus. Multiple small meals recommended until 6 months.",
      adult: "Often does well on limited ingredient diets. Monitor for skin sensitivities that may relate to diet.",
      senior: "Maintain muscle mass with quality protein (25-28%). Monitor weight closely as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80"
  },
  {
    breed: "Lagotto Romagnolo",
    size: "Small",
    dailyCalories: { min: 550, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 650, max: 1050 },
      adult: { min: 550, max: 900 },
      senior: { min: 450, max: 750 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Italian truffle hunting breed. Moderate protein (24-28%) with cognitive supportive nutrients. Water-resistant coat benefits from omega fatty acids.",
    nutritionNotes: {
      puppy: "Support cognitive development. DHA and EPA important for brain development. Multiple small meals until 6 months.",
      adult: "Working dogs may need higher calories during hunting season. Omega fatty acids for coat health. Moderate protein content.",
      senior: "Brain support nutrients increasingly important. Moderate protein (24-26%) for muscle maintenance. Monitor dental health."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08dcf9738661?q=80"
  },
  {
    breed: "Xoloitzcuintli",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1300 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Ancient Mexican hairless breed. Higher caloric needs due to heat regulation. Quality protein (26-30%) with skin-supporting nutrients.",
    nutritionNotes: {
      puppy: "Support skin development. Higher protein (28-32%) with omega fatty acids for skin health. Multiple small meals until 6 months.",
      adult: "Skin health paramount. Quality protein with omega-3 and omega-6 balance. May need higher calories in cold weather.",
      senior: "Maintain skin health with continued omega fatty acids. Moderate protein (25-28%) for muscle maintenance."
    },
    imageUrl: "https://images.unsplash.com/photo-1582456891052-f704012c0ffc?q=80"
  }
];
