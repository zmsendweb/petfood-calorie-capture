
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
  },
  {
    breed: "American Curl",
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
    notes: "Active breed needs balanced nutrition. Quality protein (30-35%). Normal feeding requirements but consider ear care diet supplements.",
    nutritionNotes: {
      kitten: "Standard growth requirements. Moderate protein (35-38%) supports overall development. Monitor ear formation during growth.",
      adult: "Balanced diet with quality protein (30-35%). Consider grooming-specific supplements to support coat and ear cartilage health.",
      senior: "Maintain lean body mass with adequate protein (28-32%). Watch for potential joint issues in curled ears with aging."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Burmilla",
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
    notes: "Generally healthy breed with standard nutritional needs. Quality protein (30-35%). Monitor coat condition for nutritional deficiencies.",
    nutritionNotes: {
      kitten: "Steady growth pattern. Balanced nutrients with moderate protein (34-38%) support development. Watch for silvery coat development.",
      adult: "Balanced diet with quality protein (30-35%). Consider coat-specific supplements for shine maintenance of silver coats.",
      senior: "Maintain lean body mass with adequate protein (28-32%). Watch for kidney issues that are sometimes seen in related breeds."
    },
    imageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80"
  },
  {
    breed: "Dwelf",
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
    notes: "Hairless dwarf breed needs specialized nutrition. Quality protein (33-38%). Monitor body temperature. Joint support needed.",
    nutritionNotes: {
      kitten: "Careful growth monitoring essential. Higher calories for body heat maintenance combined with controlled growth for joint development.",
      adult: "Higher caloric needs (like other hairless breeds). Joint supplements recommended. Skin support nutrients essential.",
      senior: "Maintain higher calories than typical senior cats. Moderate protein (30-34%) with increased joint support as they age."
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80"
  },
  {
    breed: "Korat",
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
    notes: "Slow maturing breed needs consistent nutrition. Moderate protein (30-35%). Silver-blue coat benefits from specific nutrients.",
    nutritionNotes: {
      kitten: "Extended growth period - may require kitten formulas longer. Moderate protein (34-38%) supports slow muscle development.",
      adult: "Balanced diet with moderate fat content. Quality protein (30-35%) with coat-supporting nutrients for blue sheen maintenance.",
      senior: "Gradual transition to senior diet. Moderate protein (28-32%) with antioxidants to support overall health during aging."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Minuet (Napoleon)",
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
    notes: "Short legs need joint support. Quality protein (30-35%) for muscle maintenance. Control weight carefully due to short stature.",
    nutritionNotes: {
      kitten: "Controlled growth essential for proper development. Focus on joint-supporting nutrients. Monitor limb development closely.",
      adult: "Weight management crucial. Moderate calorie diet with quality protein (30-35%) to maintain muscle without excess weight.",
      senior: "Joint support increasingly important with age. Lower calorie density to prevent weight gain. Consider raised feeding stations."
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80"
  },
  {
    breed: "Russian Blue",
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
    notes: "Genetically prone to obesity. Control portions carefully. Quality protein (30-35%) for muscle and coat maintenance.",
    nutritionNotes: {
      kitten: "Standard growth patterns. Moderate protein (34-38%) supports development. Establish portion control early.",
      adult: "Weight management crucial. Measured portions of quality protein (30-35%) diet. Coat supplements beneficial for plush double coat.",
      senior: "Continue strict weight management. Moderate protein (28-32%) with adjusted calories for lower activity levels."
    },
    imageUrl: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?q=80"
  },
  {
    breed: "Scottish Fold",
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
    notes: "Cartilage and joint support crucial due to genetic factors. Quality protein (30-35%) with supplements. Monitor mobility carefully.",
    nutritionNotes: {
      kitten: "Joint supplements from early age. Moderate protein (34-38%) with glucosamine and chondroitin to support cartilage development.",
      adult: "Continue joint support throughout life. Quality protein (30-35%) with ongoing supplementation for cartilage health.",
      senior: "Increased joint support needed. Moderate protein (28-32%) with comprehensive joint supplement regimen."
    },
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80"
  },
  {
    breed: "Tonkinese",
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
    notes: "Active breed with standard nutritional needs. Quality protein (30-35%). Monitor activity levels for caloric adjustments.",
    nutritionNotes: {
      kitten: "Standard growth patterns. Moderate protein (34-38%) supports development. May require more calories due to playful nature.",
      adult: "Active disposition may require higher end of caloric range. Quality protein (30-35%) maintains muscle tone and supports activity.",
      senior: "Gradually decrease calories with age. Moderate protein (28-32%) maintains muscle mass as activity naturally decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  },
  {
    breed: "Toyger",
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
    notes: "Muscular build requires quality protein (32-36%). Consider coat-supporting nutrients for distinctive markings.",
    nutritionNotes: {
      kitten: "Standard growth with focus on muscle development. Moderate protein (35-39%) supports proper muscular structure.",
      adult: "Muscle maintenance key for breed standard. Quality protein (32-36%) with coat-supporting nutrients for pattern enhancement.",
      senior: "Maintain muscle mass with adequate protein (30-34%). Adjust calories as activity decreases with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  }
];
