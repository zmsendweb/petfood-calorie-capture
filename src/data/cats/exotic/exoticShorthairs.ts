
import { CatStandard } from "../../types/catTypes";

export const exoticShorthairs: CatStandard[] = [
  {
    breed: "Exotic Shorthair",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Flat face needs special kibble shape. Quality protein (30-34%) for muscle maintenance. Monitor respiratory effort during meals.",
    nutritionNotes: {
      kitten: "Small kibble size essential. Moderate protein (34-38%) supports proper growth. Watch for feeding difficulties.",
      adult: "Quality protein (30-34%) maintains muscle tone. Consider wet food to aid hydration. Monitor breathing during meals.",
      senior: "Moderate protein (28-32%), elevated feeding position. Softer food often needed for dental issues. Monitor weight carefully."
    },
    imageUrl: "https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?q=80"
  },
  {
    breed: "Sphynx",
    size: "Small",
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
    notes: "Hairless breed needs higher calories for warmth. Quality protein (32-37%) and skin support nutrients.",
    nutritionNotes: {
      kitten: "Hairless kittens need extra calories to maintain body heat. High protein (36-40%) supports growth.",
      adult: "Higher metabolic rate than furred cats. High fat content (16-18%) provides energy. Skin supplements beneficial.",
      senior: "Maintain higher calories than other senior cats. Moderate protein (30-35%) with quality sources."
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80"
  },
  {
    breed: "Peterbald",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hairless or minimal coat requires higher calories. Quality protein (32-37%) and skin support nutrients. Monitor body temperature.",
    nutritionNotes: {
      kitten: "Higher calories required for temperature regulation. High protein (36-40%) supports growth and activity.",
      adult: "Higher metabolic rate than furred cats. Quality protein (32-37%) with skin-supporting nutrients essential.",
      senior: "Maintain higher calories than typical senior cats. Moderate protein (30-35%) with continued skin support."
    },
    imageUrl: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?q=80"
  },
  {
    breed: "Donskoy",
    size: "Medium",
    dailyCalories: { min: 210, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 350 },
      adult: { min: 210, max: 320 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hairless breed with temperature regulation needs. Quality protein (32-37%) and skin support nutrients essential.",
    nutritionNotes: {
      kitten: "Higher calories required for temperature regulation. High protein (36-40%) supports growth and immunity.",
      adult: "Higher metabolic rate than furred cats. Quality protein (32-37%) with omega fatty acids for skin health.",
      senior: "Maintain higher calories than typical senior cats. Moderate protein (30-35%) with skin-supporting supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80"
  },
  {
    breed: "Minskin",
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
    notes: "Dwarf breed with sparse fur needs specialized nutrition. Quality protein (32-36%). Consider joint support from early age.",
    nutritionNotes: {
      kitten: "Careful growth monitoring. Higher calories for temperature regulation balanced with controlled growth for joint development.",
      adult: "Specialized needs combining both short-legged and sparse fur factors. Quality protein (32-36%) with joint and skin support.",
      senior: "Joint support increasingly important with age. Moderate protein (30-34%) with comprehensive joint supplement regimen."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "American Curl Shorthair",
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
    notes: "Active breed with standard nutritional needs. Quality protein (30-35%). Normal feeding requirements but consider ear care.",
    nutritionNotes: {
      kitten: "Standard growth requirements. Moderate protein (35-38%) supports overall development. Monitor ear formation during growth.",
      adult: "Balanced diet with quality protein (30-35%). Consider supplements to support ear cartilage health.",
      senior: "Maintain lean body mass with adequate protein (28-32%). Watch for potential joint issues in curled ears with aging."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Japanese Bobtail",
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
    notes: "Active breed with higher activity level. Quality protein (32-36%). Monitor spine and vertebral development due to bobtail.",
    nutritionNotes: {
      kitten: "Higher end of caloric range for active kittens. Monitor skeletal development with attention to vertebral formation.",
      adult: "Active breed may require higher calories. Quality protein (32-36%) maintains muscle tone. Support bone health.",
      senior: "Gradually decrease calories with age. Moderate protein (30-34%) maintains muscle mass. Monitor mobility changes."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
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
    notes: "Robust wild-type build requires quality protein (33-37%). Monitor spine and vertebral development due to bobtail.",
    nutritionNotes: {
      kitten: "Controlled growth pattern recommended. Focus on proper bone development with optimal calcium/phosphorus ratio.",
      adult: "Natural diet preferences - may prefer multiple proteins. Quality protein (33-37%) maintains muscle and supports coat.",
      senior: "Maintain muscle mass with quality protein (31-35%). Monitor mobility and adjust support as needed for spine health."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Pixiebob",
    size: "Large",
    dailyCalories: { min: 240, max: 380 },
    ageSpecificCalories: {
      kitten: { min: 280, max: 420 },
      adult: { min: 240, max: 380 },
      senior: { min: 210, max: 340 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Wild appearance with bobcat-like features. Quality protein (33-38%). Monitor polydactyl paws for hygiene during feeding.",
    nutritionNotes: {
      kitten: "Slow maturation (up to 4 years). Moderate protein (36-40%) supports muscle development. Monitor paw development.",
      adult: "Quality protein (33-38%) maintains muscle mass. Consider raw or minimal processing to match ancestral preferences.",
      senior: "Maintain muscle mass with quality protein (31-36%). Monitor mobility and joint health as they age."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  }
];
