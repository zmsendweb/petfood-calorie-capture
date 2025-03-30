
import { DogStandard } from "../dogStandards";

export const mediumDogs: DogStandard[] = [
  {
    breed: "Poodle (Standard)",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1500 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Highly active, needs balanced nutrition",
    nutritionNotes: {
      puppy: "Rapid growth phase, needs high-quality protein (25-28%) and balanced calcium-phosphorus ratio. Monitor for proper weight gain.",
      adult: "Active breed, needs balanced nutrition with moderate protein (23-26%). Consider coat maintenance needs with omega fatty acids.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor dental health and adjust food texture if needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80"
  },
  {
    breed: "Bulldog",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 800, max: 1200 },
      senior: { min: 650, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to weight gain, monitor carefully",
    nutritionNotes: {
      puppy: "Brachycephalic breed, needs small kibble size and elevated feeding position. Moderate protein (24-26%) for controlled growth.",
      adult: "Respiratory-friendly kibble shape, lower fat content (10-14%) to prevent obesity. Joint supplements recommended from early adulthood.",
      senior: "Significant calorie reduction after 7 years, elevated feeding position helpful. Consider mobility supplements and digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1521907236370-15e7b9f7e13a?q=80"
  },
  {
    breed: "Beagle",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Tendency to overeat, portion control important",
    nutritionNotes: {
      puppy: "Moderate growth, needs balanced nutrition with 24-26% protein. Avoid overfeeding to prevent obesity later in life.",
      adult: "Strong food drive, strict portion control needed. Consider puzzle feeders to slow consumption and prevent weight gain.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80"
  },
  {
    breed: "Border Collie",
    size: "Medium",
    dailyCalories: { min: 900, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1600 },
      adult: { min: 900, max: 1400 },
      senior: { min: 750, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Very active breed, may need more calories if working",
    nutritionNotes: {
      puppy: "High energy breed, needs quality protein (25-28%) and balanced nutrition for proper growth.",
      adult: "Adjust calories based on herding/working activity. Consider cognitive support supplements for active minds.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80"
  },
  {
    breed: "Corgi",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity, monitor portions carefully",
    nutritionNotes: {
      puppy: "Prone to obesity, strict portion control needed. Consider joint health due to body structure.",
      adult: "Prone to obesity, strict portion control needed. Consider joint health due to body structure.",
      senior: "Prone to obesity, strict portion control needed. Consider joint health due to body structure."
    },
    imageUrl: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?q=80"
  },
  {
    breed: "Shetland Sheepdog",
    size: "Medium",
    dailyCalories: { min: 600, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 700, max: 1100 },
      adult: { min: 600, max: 1000 },
      senior: { min: 500, max: 800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed with moderate caloric needs",
    nutritionNotes: {
      puppy: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition.",
      adult: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition.",
      senior: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition."
    },
    imageUrl: "https://images.unsplash.com/photo-1589210043112-f9be45206827?q=80"
  },
  {
    breed: "Australian Shepherd",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 850, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed, adjust based on activity level",
    nutritionNotes: {
      puppy: "High protein needs (25-30%) for working dogs, adjust based on herding activity. Consider joint supplements.",
      adult: "Adjust based on herding activity, consider joint supplements. Monitor weight closely.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80"
  },
  {
    breed: "Cocker Spaniel",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 800, max: 1200 },
      senior: { min: 700, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate activity, prone to ear infections",
    nutritionNotes: {
      puppy: "Quality protein (24-26%) for proper development. Omega fatty acids for coat health. Monitor for food allergies early.",
      adult: "Moderate protein (22-25%) with omega supplements for coat. Prone to obesity - monitor portion sizes.",
      senior: "Lower calorie density needed with age. Consider foods with glucosamine for joint health."
    },
    imageUrl: "https://images.unsplash.com/photo-1591769607592-e27c8e8c48f5?q=80"
  },
  {
    breed: "Basset Hound",
    size: "Medium",
    dailyCalories: { min: 800, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1500 },
      adult: { min: 800, max: 1400 },
      senior: { min: 700, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Low energy, prone to obesity",
    nutritionNotes: {
      puppy: "Controlled growth important for joint health. Moderate protein (22-25%) prevents excessive growth.",
      adult: "Prone to obesity - strict portion control essential. Consider L-carnitine supplementation.",
      senior: "Further calorie reduction needed with age. Joint supplements highly beneficial. Monitor weight closely."
    },
    imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80"
  },
  {
    breed: "Chow Chow",
    size: "Medium",
    dailyCalories: { min: 900, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 1000, max: 1400 },
      adult: { min: 900, max: 1300 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Dense coat, needs nutritional support",
    nutritionNotes: {
      puppy: "Controlled growth important. Moderate protein (23-25%) with omega fatty acids for coat development.",
      adult: "Quality protein (22-25%) with biotin and zinc for coat health. Monitor for food sensitivities.",
      senior: "Continued coat support with moderate protein (20-22%). Joint supplements beneficial after 7 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80"
  }
];
