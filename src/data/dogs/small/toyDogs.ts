
import { DogStandard } from "../../types/dogTypes";

export const toyDogs: DogStandard[] = [
  {
    breed: "Chihuahua",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 450 },
      adult: { min: 200, max: 400 },
      senior: { min: 180, max: 350 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small portions, frequent meals recommended",
    nutritionNotes: {
      puppy: "Hypoglycemia risk - needs 4-6 small meals daily. High quality protein (26-28%) for growth. Tiny kibble size essential.",
      adult: "Dental health critical - dental-friendly kibble or supplements needed. Energy-dense nutrition with 24-26% protein.",
      senior: "May need softer food with age (after 9 years). High quality protein sources (22-24%) for muscle maintenance. Dental care remains priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1615233500147-01f005438a44?q=80"
  },
  {
    breed: "Yorkshire Terrier",
    size: "Small",
    dailyCalories: { min: 150, max: 300 },
    ageSpecificCalories: {
      puppy: { min: 200, max: 350 },
      adult: { min: 150, max: 300 },
      senior: { min: 120, max: 250 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small frequent meals, avoid overfeeding",
    nutritionNotes: {
      puppy: "Prone to hypoglycemia, needs frequent small meals with high-quality protein (26-28%). Monitor blood sugar levels.",
      adult: "Dental health is critical, needs dental-friendly kibble or supplements. Energy-dense nutrition with 24-26% protein.",
      senior: "May need softer food with age, high-quality protein sources (22-24%) for muscle maintenance. Dental care remains a priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80"
  },
  {
    breed: "Pomeranian",
    size: "Small",
    dailyCalories: { min: 200, max: 500 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 550 },
      adult: { min: 200, max: 500 },
      senior: { min: 180, max: 400 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small portions to prevent hypoglycemia",
    nutritionNotes: {
      puppy: "Small, frequent meals to prevent hypoglycemia, dense nutrition needed. Watch for dental issues.",
      adult: "High-quality protein for coat health, watch for dental issues. Consider nutrient-dense foods.",
      senior: "May need softer food with age, high-quality protein sources (22-24%) for muscle maintenance. Dental care remains a priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1587583530933-ed5d3485d220?q=80"
  },
  {
    breed: "Maltese",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 450 },
      adult: { min: 200, max: 400 },
      senior: { min: 180, max: 350 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small, frequent meals recommended",
    nutritionNotes: {
      puppy: "Small, frequent meals recommended. High-quality protein for coat health. Watch for dental issues.",
      adult: "Small, frequent meals recommended. High-quality protein for coat health. Watch for dental issues.",
      senior: "Small, frequent meals recommended. High-quality protein for coat health. Watch for dental issues."
    },
    imageUrl: "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80"
  }
];
