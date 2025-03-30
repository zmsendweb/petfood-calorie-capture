
import { CatStandard } from "../../types/catTypes";

export const rareLonghairs: CatStandard[] = [
  {
    breed: "LaPerm",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    ageSpecificCalories: {
      kitten: { min: 210, max: 320 },
      adult: { min: 180, max: 280 },
      senior: { min: 160, max: 250 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Curly coat needs quality protein (30-35%) and fatty acids. Monitor weight as activity level varies.",
    nutritionNotes: {
      kitten: "Moderate protein (34-38%) with omega fatty acids for coat development. Monitor growth rate.",
      adult: "Quality protein (30-35%) with biotin and zinc for coat health. Consider adding omega supplements.",
      senior: "Maintain muscle mass with quality protein (28-32%). Monitor dental health - may need softer food."
    },
    imageUrl: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80"
  },
  {
    breed: "Ukrainian Levkoy",
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
    notes: "Hairless breed needs higher calories for warmth. Quality protein (32-36%) and skin support nutrients.",
    nutritionNotes: {
      kitten: "Hairless kittens need extra calories to maintain body heat. High protein (36-40%) supports growth.",
      adult: "Higher metabolic rate than furred cats. High fat content (16-18%) provides energy. Skin supplements beneficial.",
      senior: "Maintain higher calories than other senior cats. Moderate protein (30-34%) with quality sources."
    },
    imageUrl: "https://images.unsplash.com/photo-1491485880348-85d48a9e5312?q=80"
  }
];
