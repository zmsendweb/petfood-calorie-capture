
import { CatStandard } from "../../types/catTypes";

export const exoticShorthairs: CatStandard[] = [
  {
    breed: "Burmese",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    ageSpecificCalories: {
      kitten: { min: 210, max: 320 },
      adult: { min: 180, max: 280 },
      senior: { min: 160, max: 250 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 4,
      adult: 2,
      senior: 2
    },
    notes: "Muscular build needs protein-rich diet (32-36%). Prone to obesity if inactive. Feed measured portions.",
    nutritionNotes: {
      kitten: "High protein (38-40%) for proper muscle development. Feed multiple small meals to support high activity level.",
      adult: "Moderate protein (32-36%) with controlled fat (12-16%). Monitor portion sizes to prevent weight gain.",
      senior: "Maintain muscle mass with quality protein (30-34%). Consider joint supplements after 9 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1589857604264-07d9a86a6112?q=80"
  },
  {
    breed: "Egyptian Mau",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 340 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 4,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed needs high protein (35-38%). High metabolism requires calorie-dense food. Monitor weight.",
    nutritionNotes: {
      kitten: "Very active kittens need high protein (38-42%) for development. Multiple small meals support energy needs.",
      adult: "High protein (35-38%) for lean muscle mass. Consider higher calorie density due to fast metabolism.",
      senior: "Maintain muscle mass with quality protein (32-36%). Monitor kidney function and adjust phosphorus levels."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Russian Blue",
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
    notes: "Dense coat needs quality protein (30-35%). Prone to obesity. Monitor portions. Consider coat supplements.",
    nutritionNotes: {
      kitten: "Moderate growth rate benefits from controlled feeding. Protein (35-38%) with omega fatty acids for coat.",
      adult: "Quality protein (30-35%) maintains muscular build and coat condition. Monitor calories to prevent weight gain.",
      senior: "Moderate protein (28-32%) with increased antioxidants. Adjust portions to maintain healthy weight."
    },
    imageUrl: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80"
  },
  {
    breed: "Korat",
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
    notes: "Muscular build requires quality protein (32-36%). Silver coat needs specific nutrients. Monitor weight.",
    nutritionNotes: {
      kitten: "Slow maturation - extend kitten diet to 12 months. Protein (35-38%) supports development.",
      adult: "Quality protein (32-36%) maintains muscular build. Biotin and zinc support coat health.",
      senior: "Moderate protein (30-34%) to maintain muscle mass. Consider taurine supplementation for heart health."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "Havana Brown",
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
    notes: "Moderate energy needs. Quality protein (30-35%) for muscle tone. Monitor weight as activity declines with age.",
    nutritionNotes: {
      kitten: "Moderate growth pattern - quality protein (35-38%) supports development. Consider DHA for brain development.",
      adult: "Balanced nutrition with moderate protein (30-35%). Interactive feeding toys benefit mental stimulation.",
      senior: "Moderate protein (28-32%) with joint support supplements. Monitor dental health - may need softer food."
    },
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80"
  },
  {
    breed: "Bombay",
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
    notes: "Muscular build needs protein-rich diet (32-36%). Glossy coat requires coat support nutrients.",
    nutritionNotes: {
      kitten: "Quality protein (36-40%) for proper development. Omega fatty acids support coat shine.",
      adult: "Moderate protein (32-36%) maintains muscle tone. Biotin and omega fatty acids enhance coat sheen.",
      senior: "Maintain muscle mass with quality protein (30-34%). Monitor weight as activity level decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80"
  }
];
