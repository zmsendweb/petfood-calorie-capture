import { CatStandard } from "../../types/catTypes";

export const traditionalMediumBreeds: CatStandard[] = [
  {
    breed: "Persian",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 3,
    mealsByAge: {
      kitten: 4,
      adult: 3,
      senior: 3
    },
    notes: "Face shape requires special bowl consideration. High quality protein (32-35%) for coat. Small, frequent meals recommended.",
    nutritionNotes: {
      kitten: "Flat-faced kittens need specially shaped kibble. Extended kitten formula (12-14 months). Higher protein (36-38%) supports coat development.",
      adult: "Prone to dental issues - dental-friendly kibble essential. Hairball formulas beneficial. Elevated feeding dishes recommended.",
      senior: "Kidney issues common after 7 years - lower phosphorus diet needed. Lower protein (28-32%) with higher quality sources. Wet food beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Siamese",
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
      senior: 3
    },
    notes: "High metabolism - quality protein (35%). Prone to dental issues. Consider breed-specific formulas. Monitor food temperature preferences.",
    nutritionNotes: {
      kitten: "Rapid growth - high protein (38-40%) with balanced amino acids. Extended kitten formula (12 months). Multiple meals prevent hypoglycemia.",
      adult: "Higher metabolic rate than most breeds. High protein (35-38%) maintains lean muscle. Dental care critical through diet.",
      senior: "Prone to amyloidosis - moderate protein (30-34%) from high-quality sources. Dental issues increase with age - soft food may be needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "British Shorthair",
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
    notes: "Prone to obesity - strict portion control. Moderate protein (30-35%). Consider weight management formulas. Monitor activity level.",
    nutritionNotes: {
      kitten: "Moderate growth - avoid overfeeding. Protein (34-36%) for muscle development. Extended kitten formula (12 months) recommended.",
      adult: "Extremely prone to obesity - strict portion control. Moderate protein (30-32%) sufficient. Weight management formula beneficial.",
      senior: "Significant calorie reduction after 7 years. Low-fat, moderate protein (28-30%) diet. Joint support increasingly important with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Russian Blue",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 170, max: 260 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate protein needs (30-35%). Watch for obesity. Consider hypoallergenic formulas. Monitor portion sizes carefully.",
    nutritionNotes: {
      kitten: "Hypoallergenic kitten formulas recommended. Moderate protein (34-36%) for muscle development. Monitor for food sensitivities.",
      adult: "Indoor lifestyle requires portion control. Moderate protein (30-32%) sufficient. Dental health through diet important.",
      senior: "Lower calorie needs after 7 years. Moderate protein (28-30%) with antioxidants. Joint support supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1638867911609-b17304c4cd96?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Abyssinian",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 190, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed needs quality protein (33-38%). Small, frequent meals may benefit. Monitor weight due to high activity. Consider dental health.",
    nutritionNotes: {
      kitten: "High energy needs - frequent small meals. High protein (36-38%) supports muscle development. Monitor for food sensitivities.",
      adult: "Active lifestyle requires higher calorie intake. High protein (33-38%) maintains lean muscle. Dental health through diet important.",
      senior: "Maintain higher protein levels than most senior cats. Moderate protein (30-34%) with antioxidants. Joint support supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "American Shorthair",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 170, max: 260 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate protein needs (30-35%). Watch for obesity in indoor cats. Consider dental health. Consistent feeding schedule important.",
    nutritionNotes: {
      kitten: "Moderate growth - avoid overfeeding. Protein (34-36%) for muscle development. Consistent feeding schedule important.",
      adult: "Indoor lifestyle requires portion control. Moderate protein (30-32%) sufficient. Dental health through diet important.",
      senior: "Lower calorie needs after 7 years. Moderate protein (28-30%) with antioxidants. Joint support supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Japanese Bobtail",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed needs quality protein (32-37%). Consider joint health. Watch for food allergies. Monitor activity level for portions.",
    nutritionNotes: {
      kitten: "High energy needs - frequent small meals. High protein (36-38%) supports muscle development. Monitor for food sensitivities.",
      adult: "Active lifestyle requires higher calorie intake. High protein (32-37%) maintains lean muscle. Joint support supplements beneficial.",
      senior: "Maintain higher protein levels than most senior cats. Moderate protein (29-33%) with antioxidants. Monitor kidney function."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Burmese",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 170, max: 260 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity - strict portion control. Moderate protein (30-35%). Consider dental health. Monitor blood sugar levels.",
    nutritionNotes: {
      kitten: "Moderate growth - avoid overfeeding. Protein (34-36%) for muscle development. Monitor blood sugar levels.",
      adult: "Indoor lifestyle requires portion control. Moderate protein (30-32%) sufficient. Dental health through diet important.",
      senior: "Lower calorie needs after 7 years. Moderate protein (28-30%) with antioxidants. Monitor blood sugar levels."
    },
    imageUrl: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "European Shorthair",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 170, max: 260 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Robust breed needs balanced protein (30-35%). Consider dental health. Watch for weight gain. Monitor outdoor activity level.",
    nutritionNotes: {
      kitten: "Moderate growth - avoid overfeeding. Protein (34-36%) for muscle development. Monitor for food sensitivities.",
      adult: "Active lifestyle requires higher calorie intake. Moderate protein (30-32%) sufficient. Dental health through diet important.",
      senior: "Lower calorie needs after 7 years. Moderate protein (28-30%) with antioxidants. Joint support supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Chartreux",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "French breed needs quality protein (32-37%). Consider joint health. Watch for obesity in indoor cats. Monitor muscle tone.",
    nutritionNotes: {
      kitten: "Moderate growth - avoid overfeeding. Protein (35-37%) for muscle development. Monitor for food sensitivities.",
      adult: "Indoor lifestyle requires portion control. High protein (32-37%) maintains muscle tone. Joint support supplements beneficial.",
      senior: "Lower calorie needs after 7 years. Moderate protein (29-33%) with antioxidants. Joint support supplements increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  }
];
