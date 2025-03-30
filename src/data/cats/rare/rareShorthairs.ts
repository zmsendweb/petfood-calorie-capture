
import { CatStandard } from "../../types/catTypes";

export const rareShorthairs: CatStandard[] = [
  {
    breed: "Sokoke",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 340 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Lean and athletic build requires quality protein (33-38%). Monitor activity levels and adjust calories accordingly.",
    nutritionNotes: {
      kitten: "High protein (36-40%) supports athletic development. Multiple small meals prevent hypoglycemia.",
      adult: "Quality protein (33-38%) maintains lean muscle mass. Consider higher calories during high-activity periods.",
      senior: "Maintain muscle mass with quality protein (30-35%). Monitor kidney function and adjust phosphorus as needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?q=80"
  },
  {
    breed: "Chausie",
    size: "Large",
    dailyCalories: { min: 250, max: 400 },
    ageSpecificCalories: {
      kitten: { min: 300, max: 450 },
      adult: { min: 250, max: 400 },
      senior: { min: 220, max: 350 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Wild ancestry requires high protein diet (38-42%). Consider raw or minimal processing. Monitor urinary health.",
    nutritionNotes: {
      kitten: "Slow growth better for joint development. Very high protein (40-45%) supports athletic development.",
      adult: "Very high protein (38-42%) maintains muscle mass. Consider grain-free options for digestive sensitivity.",
      senior: "Higher protein than typical seniors (36-40%). Monitor kidney function and adjust as needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80"
  },
  {
    breed: "Serengeti",
    size: "Medium",
    dailyCalories: { min: 220, max: 330 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 370 },
      adult: { min: 220, max: 330 },
      senior: { min: 190, max: 300 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic build requires high protein (36-40%). Monitor urinary health. Consider wet food for hydration.",
    nutritionNotes: {
      kitten: "High protein (38-42%) supports athletic development. Multiple small meals prevent hypoglycemia.",
      adult: "High protein (36-40%) maintains lean muscle mass. Consider higher calories during high-activity periods.",
      senior: "Maintain muscle mass with quality protein (34-38%). Monitor kidney function and adjust phosphorus as needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80"
  }
];
