import { CatStandard } from "../../types/catTypes";

export const specialtyMediumBreeds: CatStandard[] = [
  {
    breed: "Sphynx",
    size: "Medium",
    dailyCalories: { min: 230, max: 350 },
    ageSpecificCalories: {
      kitten: { min: 260, max: 380 },
      adult: { min: 230, max: 350 },
      senior: { min: 210, max: 320 }
    },
    mealsPerDay: 3,
    mealsByAge: {
      kitten: 4,
      adult: 3,
      senior: 3
    },
    notes: "Higher caloric needs due to lack of fur. High protein (35-40%) required. Consider skin health supplements. Frequent small meals recommended.",
    nutritionNotes: {
      kitten: "Growth period with very high caloric needs. Higher fat (18-20%) and protein (38-42%) than furred kittens. Multiple small meals essential.",
      adult: "Metabolic rate 15-20% higher than furred cats. High fat content (16-18%) provides energy. Skin health supplements (omega oils) beneficial.",
      senior: "Maintain higher calories than other senior cats. Moderate protein (34-38%) from high-quality sources. Maintain skin support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Scottish Fold",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Joint health supplements recommended. Moderate protein (30-35%). Watch for obesity. Consider cartilage support in diet.",
    nutritionNotes: {
      kitten: "Critical cartilage support needed from early age. Glucosamine/chondroitin supplementation. Moderate protein (34-36%) prevents rapid growth.",
      adult: "Lifelong joint support essential. Moderate protein (30-35%) with antioxidants. Weight management critical to prevent joint strain.",
      senior: "Increased joint support with age. Moderate protein (28-32%) with anti-inflammatory nutrients. Pain management through diet important."
    },
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Manx",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Watch spine health - quality protein (30-35%). Consider joint supplements. Monitor digestion. Adjust portions for activity.",
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80"
  },
  {
    breed: "Peterbald",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Hairless breed needs high calories. Quality protein (35-40%). Consider skin health. Monitor body temperature. Watch hydration.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Ukrainian Levkoy",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Hairless breed needs higher calories. Quality protein (35-40%). Consider skin health. Monitor temperature sensitivity.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "LaPerm",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Curly coat needs quality protein (32-37%). Consider coat health supplements. Watch for hairballs. Monitor hydration.",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80"
  },
  {
    breed: "Selkirk Rex",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Curly coat needs quality protein (32-37%). Consider skin health. Watch for matting issues. Monitor hydration.",
    imageUrl: "https://images.unsplash.com/photo-1577590835286-1cdd24c08fd5?q=80"
  },
  {
    breed: "Lykoi",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Werewolf cat needs high protein (33-38%). Consider skin health supplements. Watch for temperature sensitivity. Monitor coat condition.",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  }
];
