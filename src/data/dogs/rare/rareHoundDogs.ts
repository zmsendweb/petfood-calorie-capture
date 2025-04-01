
import { DogStandard } from "../../types/dogTypes";

export const rareHoundDogs: DogStandard[] = [
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
  }
];
