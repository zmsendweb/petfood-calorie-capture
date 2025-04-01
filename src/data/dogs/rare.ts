
import { DogStandard } from "../types/dogTypes";

export const rareDogs: DogStandard[] = [
  {
    breed: "Azawakh",
    size: "Medium",
    dailyCalories: { min: 700, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1350 },
      adult: { min: 700, max: 1200 },
      senior: { min: 600, max: 950 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "African sighthound with extremely lean build. Higher fat (16-20%) and moderate protein (26-30%) for energy and muscle maintenance.",
    nutritionNotes: {
      puppy: "Slow steady growth ideal. Higher fat content (16-20%) for energy. Multiple small meals until 6 months.",
      adult: "Natural lean appearance, do not overfeed. Higher fat content than many breeds. Quality protein sources essential.",
      senior: "Maintain muscle mass with quality protein (26-30%). Joint support increasingly important with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80"
  },
  {
    breed: "Cirneco dell'Etna",
    size: "Small",
    dailyCalories: { min: 480, max: 850 },
    ageSpecificCalories: {
      puppy: { min: 580, max: 950 },
      adult: { min: 480, max: 850 },
      senior: { min: 400, max: 700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Ancient Sicilian hunting breed. Moderate protein (24-28%) with higher fat (14-18%) for energy. Often food motivated.",
    nutritionNotes: {
      puppy: "Support lean muscle development. Moderate protein (26-30%) with adequate fat for energy. Monitor growth carefully.",
      adult: "Natural hunter with high activity potential. Adjust calories based on hunting season. Quality protein sources important.",
      senior: "Maintain muscle mass with moderate protein (24-26%). Monitor dental health closely."
    },
    imageUrl: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?q=80"
  },
  {
    breed: "Thai Ridgeback",
    size: "Medium",
    dailyCalories: { min: 780, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1500 },
      adult: { min: 780, max: 1300 },
      senior: { min: 650, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Primitive breed with efficient metabolism. Quality protein (26-30%) with moderate fat (12-16%). Monitor for food sensitivities.",
    nutritionNotes: {
      puppy: "Monitor growth carefully. Avoid excess calcium/phosphorus. Multiple small meals recommended until 6 months.",
      adult: "Often does well on limited ingredient diets. Monitor for skin sensitivities that may relate to diet.",
      senior: "Maintain muscle mass with quality protein (25-28%). Monitor weight closely as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80"
  },
  {
    breed: "Lagotto Romagnolo",
    size: "Small",
    dailyCalories: { min: 550, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 650, max: 1050 },
      adult: { min: 550, max: 900 },
      senior: { min: 450, max: 750 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Italian truffle hunting breed. Moderate protein (24-28%) with cognitive supportive nutrients. Water-resistant coat benefits from omega fatty acids.",
    nutritionNotes: {
      puppy: "Support cognitive development. DHA and EPA important for brain development. Multiple small meals until 6 months.",
      adult: "Working dogs may need higher calories during hunting season. Omega fatty acids for coat health. Moderate protein content.",
      senior: "Brain support nutrients increasingly important. Moderate protein (24-26%) for muscle maintenance. Monitor dental health."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08dcf9738661?q=80"
  },
  {
    breed: "Cao de Serra de Aires",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1300 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Portuguese herding breed. Moderate protein (24-28%) and fat (12-16%) for sustained energy. Coat benefits from omega-3 fatty acids.",
    nutritionNotes: {
      puppy: "Support steady growth. Avoid excess calories and calcium. Multiple small meals until 6 months.",
      adult: "Working dogs may need additional calories. Quality protein for muscle maintenance. Support coat health with omega-3.",
      senior: "Maintain muscle mass with quality protein (24-26%). Consider joint support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80"
  },
  {
    breed: "Mudi",
    size: "Small",
    dailyCalories: { min: 550, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 650, max: 1050 },
      adult: { min: 550, max: 900 },
      senior: { min: 450, max: 750 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hungarian herding breed with high energy. Moderate protein (26-30%) with adequate fat (12-16%) for sustained energy.",
    nutritionNotes: {
      puppy: "Support active development. Moderate protein (28-32%) for muscle growth. Multiple small meals until 6 months.",
      adult: "Working dogs may need additional calories. Quality protein for muscle maintenance. Monitor weight carefully with activity level changes.",
      senior: "Maintain muscle mass with quality protein (26-28%). Consider joint support as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?q=80"
  },
  {
    breed: "Otterhound",
    size: "Large",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1900 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 800, max: 1300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Rare scent hound with dense waterproof coat. Moderate protein (24-28%) with omega-3 fatty acids for coat health. Monitor ears for infections.",
    nutritionNotes: {
      puppy: "Large breed puppy formula essential. Control growth for joint development. Multiple small meals until 6 months.",
      adult: "Support coat health with omega-3 fatty acids. Moderate protein for muscle maintenance. Watch for bloat risk.",
      senior: "Joint support increasingly important. Moderate protein (24-26%) with omega-3 fatty acids for aging joints and coat."
    },
    imageUrl: "https://images.unsplash.com/photo-1511876484235-da7cf9ea2ef2?q=80"
  },
  {
    breed: "Pyrenean Shepherd",
    size: "Small",
    dailyCalories: { min: 550, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 650, max: 1050 },
      adult: { min: 550, max: 900 },
      senior: { min: 450, max: 750 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Energetic herding breed. Moderate protein (26-30%) with adequate fat (12-16%) for sustained energy. Support coat with omega fatty acids.",
    nutritionNotes: {
      puppy: "Support active growth. Moderate protein (28-32%) for muscle development. Multiple small meals until 6 months.",
      adult: "High energy needs, adjust calories with activity level. Quality protein sources essential. May need higher fat content during working seasons.",
      senior: "Maintain muscle mass with quality protein (26-28%). Monitor weight as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?q=80"
  },
  {
    breed: "Xoloitzcuintli",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1300 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Ancient Mexican hairless breed. Higher caloric needs due to heat regulation. Quality protein (26-30%) with skin-supporting nutrients.",
    nutritionNotes: {
      puppy: "Support skin development. Higher protein (28-32%) with omega fatty acids for skin health. Multiple small meals until 6 months.",
      adult: "Skin health paramount. Quality protein with omega-3 and omega-6 balance. May need higher calories in cold weather.",
      senior: "Maintain skin health with continued omega fatty acids. Moderate protein (25-28%) for muscle maintenance."
    },
    imageUrl: "https://images.unsplash.com/photo-1582456891052-f704012c0ffc?q=80"
  },
  {
    breed: "Sloughi",
    size: "Medium",
    dailyCalories: { min: 750, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1500 },
      adult: { min: 750, max: 1300 },
      senior: { min: 600, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "North African sighthound with unique metabolism. Higher fat (15-18%) even at rest. Quality protein (26-30%) for lean muscle maintenance.",
    nutritionNotes: {
      puppy: "Support lean muscle development. Higher fat content (15-18%) than typical puppies. Multiple small meals until 6 months.",
      adult: "Natural lean appearance, do not overfeed. Quality protein sources essential. May need performance formula even when not working.",
      senior: "Maintain muscle mass with quality protein (26-28%). Monitor dental health typical with sighthounds."
    },
    imageUrl: "https://images.unsplash.com/photo-1518815068914-038f6752ab04?q=80"
  }
];
