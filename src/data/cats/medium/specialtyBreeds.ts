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
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 190, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Watch spine health - quality protein (30-35%). Consider joint supplements. Monitor digestion. Adjust portions for activity.",
    nutritionNotes: {
      kitten: "Special attention to spine development. Quality protein (34-36%) supports proper skeletal formation. Monitor digestive health closely.",
      adult: "Some may have digestive sensitivities due to shortened spine. Quality protein (30-35%) supports muscle maintenance. Joint supplements beneficial.",
      senior: "Increased support for aging spine and joints. Moderate protein (28-32%) with anti-inflammatory nutrients. Digestible food important."
    },
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Peterbald",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 300 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hairless breed needs high calories. Quality protein (35-40%). Consider skin health. Monitor body temperature. Watch hydration.",
    nutritionNotes: {
      kitten: "Hairless kittens need higher calories to maintain body temperature. High protein (38-42%) supports growth. Monitor skin condition closely.",
      adult: "Higher metabolic rate than furred cats. Higher fat (15-18%) and protein (35-40%) diet. Skin supplements essential for hairless breed.",
      senior: "Maintain higher calories than other senior cats. Quality protein sources (32-36%) for muscle maintenance. Continue skin support."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Ukrainian Levkoy",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 190, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hairless breed needs higher calories. Quality protein (35-40%). Consider skin health. Monitor temperature sensitivity.",
    nutritionNotes: {
      kitten: "Folded ear and hairless breed needs special attention. High protein (38-40%) supports growth. Monitor ear and skin health.",
      adult: "Higher calories needed due to lack of insulation. High quality protein (35-40%) for muscle maintenance. Skin supplements beneficial.",
      senior: "Maintain higher calories than typical senior cats. Quality protein sources (32-36%). Continue skin and ear support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "LaPerm",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 190, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Curly coat needs quality protein (32-37%). Consider coat health supplements. Watch for hairballs. Monitor hydration.",
    nutritionNotes: {
      kitten: "Special attention to developing curly coat. High protein (36-38%) supports proper coat development. Omega fatty acids beneficial.",
      adult: "Unique coat requires nutritional support. Quality protein (32-37%) maintains coat health. Hairball prevention formula recommended.",
      senior: "Maintain coat health with quality nutrition. Moderate protein (30-34%) with omega supplements. Hairball control remains important."
    },
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Selkirk Rex",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 190, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Curly coat needs quality protein (32-37%). Consider skin health. Watch for matting issues. Monitor hydration.",
    nutritionNotes: {
      kitten: "Focus on coat development with high-quality proteins (36-38%). Omega fatty acids support curly coat formation. Monitor skin health.",
      adult: "Plush coat requires nutritional support. Quality protein (32-37%) and fatty acids maintain coat health. Watch for matting-related issues.",
      senior: "Maintain coat quality with appropriate nutrition. Moderate protein (30-34%) with continued omega supplements. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1577590835286-1cdd24c08fd5?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Lykoi",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 190, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Werewolf cat needs high protein (33-38%). Consider skin health supplements. Watch for temperature sensitivity. Monitor coat condition.",
    nutritionNotes: {
      kitten: "Partial hairlessness requires special nutrition. High protein (36-38%) supports proper development. Monitor unique coat pattern.",
      adult: "Higher calories needed due to partial hairlessness. Quality protein (33-38%) supports skin and muscle health. Skin supplements beneficial.",
      senior: "Maintain skin health with quality nutrition. Moderate protein (30-34%) with skin support supplements. Watch for age-related coat changes."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Devon Rex",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Curly-coated breed with higher metabolic rate. Quality protein (32-36%) and skin health supplements.",
    nutritionNotes: {
      kitten: "Higher caloric needs than standard kittens. High protein (36-38%) supports growth. Monitor coat development.",
      adult: "Higher metabolic rate than most cats. Quality protein (32-36%) with skin and coat supplements. Monitor body temperature.",
      senior: "Maintain higher calories than typical senior cats. Moderate protein (30-34%) with continued coat support."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Cornish Rex",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Thin-coated active breed with higher metabolism. Quality protein (32-36%) and coat support.",
    nutritionNotes: {
      kitten: "Higher caloric needs than standard kittens. High protein (36-38%) supports high activity. Monitor weight gain.",
      adult: "Very active breed with higher metabolism. Quality protein (32-36%) with skin supplements. Higher fat beneficial.",
      senior: "Maintain higher calories than typical senior cats. Moderate protein (30-34%) with continued activity support."
    },
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Burmilla",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Burmese hybrid with silver coat. Quality protein (30-35%) and coat support for distinctive color.",
    nutritionNotes: {
      kitten: "Moderate growth rate. Quality protein (34-36%) with tyrosine supplement for coat color development.",
      adult: "Quality protein (30-35%) with coat-supporting nutrients. Monitor weight as breed can trend toward obesity.",
      senior: "Moderate protein (28-32%) with quality sources. Weight management increasingly important with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Ocicat",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic spotted breed with higher activity level. Quality protein (33-38%) for muscle maintenance.",
    nutritionNotes: {
      kitten: "Active growth pattern. High protein (36-38%) supports muscle development. Multiple small meals beneficial.",
      adult: "Active breed with high muscle mass. Quality protein (33-38%) for energy and spotted coat pattern. Mental enrichment during feeding.",
      senior: "Maintain muscle mass with quality protein (30-34%). Activity may decrease with age. Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  }
];
