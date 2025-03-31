
import { CatStandard } from "../../types/catTypes";

export const rareExoticBreeds: CatStandard[] = [
  {
    breed: "Ojos Azules",
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
    notes: "Extremely rare breed with distinctive deep blue eyes. Quality protein (30-35%) and taurine for eye health.",
    nutritionNotes: {
      kitten: "High-quality protein (36-38%) with taurine supplement for eye development. Monitor growth carefully.",
      adult: "Quality protein (30-35%) with enhanced taurine. Eye health supplements beneficial. Standard feeding protocols.",
      senior: "Maintain lean body mass with quality protein (28-32%). Increased taurine and antioxidants for eye health."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "American Wirehair",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 190, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Distinctive wiry coat needs quality nutrition. Quality protein (32-36%) and fatty acids for coat maintenance.",
    nutritionNotes: {
      kitten: "Quality protein (34-36%) with balanced fat content. Biotin and B vitamins support unique coat development.",
      adult: "Moderate protein (32-36%) with biotin and fatty acids for coat health. Similar nutritional needs to American Shorthair.",
      senior: "Maintain coat health with quality protein (30-34%). Consider joint supplements and monitor kidney function."
    },
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80"
  },
  {
    breed: "Kurilian Bobtail",
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
    notes: "Naturally occurring Russian breed. Quality protein (32-36%) and joint support due to bobtail genetics.",
    nutritionNotes: {
      kitten: "Controlled growth important. Balanced calcium/phosphorus ratio for proper vertebral development. Monitor growth rate.",
      adult: "Quality protein (32-36%) for muscle maintenance. Consider joint-supporting nutrients and adjust calories based on activity.",
      senior: "Maintain muscle mass with quality protein (30-34%). Increase joint support as they age. Moderate calorie reduction."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "Mekong Bobtail",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 190, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Thai breed with distinctive color points. Quality protein (32-36%) and joint support due to bobtail genetics.",
    nutritionNotes: {
      kitten: "Siamese-like growth pattern. Monitor vertebral development carefully. Higher protein (34-38%) with joint support.",
      adult: "Moderate protein (32-36%) with joint support nutrients. Consider color point enhancement nutrients like tyrosine.",
      senior: "Joint support increasingly important with age. Moderate protein (30-34%) from quality sources. Monitor weight."
    },
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80"
  },
  {
    breed: "Donskoy",
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
    notes: "Hairless Russian breed needs higher calories. Quality protein (35-40%) and skin health supplements.",
    nutritionNotes: {
      kitten: "Higher caloric needs than furred kittens. High protein (38-42%) supports growth. Skin health critical from early age.",
      adult: "Higher metabolic rate than furred cats. High quality protein (35-40%) with skin supplements. Monitor temperature sensitivity.",
      senior: "Maintain higher calories than typical senior cats. Quality protein (32-36%). Continue skin support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Thai Lilac",
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
    notes: "Rare Thai breed with lavender coat. Quality protein (30-35%) and coat support for distinctive color.",
    nutritionNotes: {
      kitten: "Standard growth pattern. Quality protein (34-36%) with tyrosine supplement for coat color development.",
      adult: "Quality protein (30-35%) with coat-supporting nutrients. Similar nutritional needs to Korat and Burmese.",
      senior: "Maintain coat health with quality protein (28-32%). Monitor kidney function and adjust phosphorus as needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?q=80"
  }
];
