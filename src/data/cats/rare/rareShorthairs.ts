
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
  },
  {
    breed: "Khao Manee",
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
    notes: "Ancient Thai breed with typical nutritional needs. Quality protein (32-36%) supports general health. Monitor eye health.",
    nutritionNotes: {
      kitten: "Standard growth pattern. Moderate protein (36-40%) with taurine for eye development essential due to characteristic eyes.",
      adult: "Balanced diet with quality protein (32-36%). Antioxidants for eye health support. Standard feeding protocols.",
      senior: "Maintain lean body mass with adequate protein (30-34%). Increased antioxidants for aging eye support."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "European Burmese",
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
    notes: "Muscular build needs quality protein (32-36%). Watch for weight gain tendency. Monitor food intake carefully.",
    nutritionNotes: {
      kitten: "Focus on lean muscle development. Moderate protein (36-40%) supports proper growth without excess fat.",
      adult: "Portion control important as breed may overeat. Quality protein (32-36%) maintains muscle tone without excess weight gain.",
      senior: "Increased tendency toward weight gain with age. Lower calorie density while maintaining protein (30-34%) for muscle.",
      },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Arabian Mau",
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
    notes: "Natural desert breed with efficient metabolism. Quality protein (32-36%). Consider heat-adapted feeding schedules.",
    nutritionNotes: {
      kitten: "Natural growth patterns. Moderate protein (35-39%) supports development. Consider higher hydration needs.",
      adult: "Heat-adapted metabolism may require specialized feeding times. Quality protein (32-36%) with emphasis on hydration.",
      senior: "Maintain lean body mass with adequate protein (30-34%). Continue focus on hydration and temperature adaptation."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "California Spangled",
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
    notes: "Active breed requires higher end of feeding range. Quality protein (33-37%). Support coat pattern with specific nutrients.",
    nutritionNotes: {
      kitten: "Active growth needs quality nutrition. High protein (37-41%) supports muscular development and coat pattern.",
      adult: "Very active breed may require higher calories. Quality protein (33-37%) maintains muscle tone and supports spotted coat.",
      senior: "Gradually decrease calories with age. Moderate protein (31-35%) maintains muscle mass as activity naturally decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Dragon Li",
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
    notes: "Natural Chinese breed with efficient metabolism. Quality protein (32-36%). Monitor macronutrient balance for coat health.",
    nutritionNotes: {
      kitten: "Natural growth pattern. Moderate protein (35-39%) supports muscular development typical of natural breed.",
      adult: "Balanced diet with quality protein (32-36%). Consider traditional protein sources that match ancestral diet.",
      senior: "Maintain lean body mass with adequate protein (30-34%). Adjust calories as metabolism naturally slows."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  }
];
