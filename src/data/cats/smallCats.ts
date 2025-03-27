
import { CatStandard } from "../types/catTypes";

export const smallCats: CatStandard[] = [
  {
    breed: "Devon Rex",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    ageSpecificCalories: {
      kitten: { min: 210, max: 320 },
      adult: { min: 180, max: 280 },
      senior: { min: 160, max: 250 }
    },
    mealsPerDay: 3,
    mealsByAge: {
      kitten: 4,
      adult: 3,
      senior: 3
    },
    notes: "High metabolism needs calorie-dense food. Quality protein (33-38%). Consider skin health supplements. Monitor temperature during meals.",
    nutritionNotes: {
      kitten: "Very high metabolism - energy-dense food critical. High protein (38-42%) supports growth. Multiple small meals prevent hypoglycemia.",
      adult: "Higher calories per pound than most cats. High quality protein (35-38%) maintains muscle. Skin and coat support nutrients essential.",
      senior: "Maintain higher calories than other senior cats. Moderate protein (33-36%) with quality sources. Omega fatty acids for skin health."
    },
    imageUrl: "https://images.unsplash.com/photo-1576280314498-31e7c48361c9?q=80"
  },
  {
    breed: "Cornish Rex",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    ageSpecificCalories: {
      kitten: { min: 210, max: 320 },
      adult: { min: 180, max: 280 },
      senior: { min: 160, max: 250 }
    },
    mealsPerDay: 3,
    mealsByAge: {
      kitten: 4,
      adult: 3,
      senior: 3
    },
    notes: "High metabolism needs calorie-dense food. Quality protein (33-38%). Consider skin supplements. Monitor body temperature.",
    nutritionNotes: {
      kitten: "Similar to Devon Rex - very high metabolism. Energy-dense formula with high protein (38-42%). Multiple meals essential.",
      adult: "Higher caloric needs than most cats of similar size. High fat (15-18%) and protein (35-38%) diet. Skin support critical.",
      senior: "Maintain higher calories than typical senior cats. Moderate protein (32-36%) with quality sources. Continue skin support."
    },
    imageUrl: "https://images.unsplash.com/photo-1577590835286-1cdd24c08fd5?q=80"
  },
  {
    breed: "Munchkin",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    ageSpecificCalories: {
      kitten: { min: 200, max: 300 },
      adult: { min: 180, max: 280 },
      senior: { min: 160, max: 250 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Short legs need joint support. Moderate protein (30-35%). Consider mobility in feeding setup. Watch weight carefully.",
    nutritionNotes: {
      kitten: "Focus on controlled growth to support developing joints. Quality protein (34-36%) supports proper musculoskeletal development.",
      adult: "Joint support supplements recommended. Maintain lean weight to reduce stress on joints. Monitor mobility during mealtimes.",
      senior: "Increased joint support needed with age. Lower calorie density to prevent weight gain. Consider raised feeding stations."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "Singapura",
    size: "Small",
    dailyCalories: { min: 170, max: 270 },
    ageSpecificCalories: {
      kitten: { min: 190, max: 290 },
      adult: { min: 170, max: 270 },
      senior: { min: 150, max: 240 }
    },
    mealsPerDay: 3,
    mealsByAge: {
      kitten: 4,
      adult: 3,
      senior: 3
    },
    notes: "Smallest breed needs concentrated nutrition. Quality protein (33-38%). Consider small portions. Monitor blood sugar.",
    nutritionNotes: {
      kitten: "Smallest cat breed requires nutrient-dense food. Multiple small meals prevent hypoglycemia. High protein (38-40%) supports growth.",
      adult: "High metabolism requires quality nutrition. Small, frequent meals may benefit energy levels. Consider high-protein formulas.",
      senior: "Maintain smaller portions but nutrient-rich foods. Watch for dental issues that may affect eating. Monitor weight carefully."
    },
    imageUrl: "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?q=80"
  },
  {
    breed: "Bambino",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    ageSpecificCalories: {
      kitten: { min: 200, max: 300 },
      adult: { min: 180, max: 280 },
      senior: { min: 160, max: 250 }
    },
    mealsPerDay: 3,
    mealsByAge: {
      kitten: 4,
      adult: 3,
      senior: 3
    },
    notes: "Hybrid breed needs concentrated nutrition. Quality protein (33-38%). Consider skin health. Monitor body temperature carefully.",
    nutritionNotes: {
      kitten: "Hairless kittens need extra calories to maintain body heat. High protein (38-42%) supports growth. Monitor skin condition.",
      adult: "Higher metabolic rate than furred cats. High fat content (16-18%) provides energy. Skin supplements beneficial for hairless breed.",
      senior: "Maintain higher calories than other senior cats. Moderate protein (33-36%) with quality sources. Continue skin support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  }
];
