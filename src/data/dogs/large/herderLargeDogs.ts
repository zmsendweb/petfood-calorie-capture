
import { DogStandard } from "../../types/dogTypes";

export const herderLargeDogs: DogStandard[] = [
  {
    breed: "Borzoi",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2300 },
      adult: { min: 1400, max: 2000 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Russian sighthound, lean build requires specialized diet",
    nutritionNotes: {
      puppy: "Controlled growth essential for joint health. Higher fat (14-16%) than most large breed puppies.",
      adult: "Naturally lean body type. Higher fat (12-16%) and quality protein (24-28%) even for non-working dogs.",
      senior: "Maintain muscle mass with continued quality protein (22-26%). Monitor dental health."
    },
    imageUrl: "https://images.unsplash.com/photo-1518027862595-d389fc3395f2?q=80"
  },
  {
    breed: "Komondor",
    size: "Large",
    dailyCalories: { min: 1600, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2500 },
      adult: { min: 1600, max: 2200 },
      senior: { min: 1300, max: 1900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hungarian livestock guardian with corded coat",
    nutritionNotes: {
      puppy: "Slow growth essential for joint health. Moderate protein (22-26%) with balanced calcium/phosphorus.",
      adult: "Corded coat requires nutritional support. Quality protein (22-25%) with omega fatty acids.",
      senior: "Joint support increasingly important. Moderate protein (20-24%) with glucosamine/chondroitin."
    },
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80"
  },
  {
    breed: "Anatolian Shepherd",
    size: "Large",
    dailyCalories: { min: 1900, max: 2600 },
    ageSpecificCalories: {
      puppy: { min: 2100, max: 2900 },
      adult: { min: 1900, max: 2600 },
      senior: { min: 1600, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Turkish livestock guardian, self-sufficient",
    nutritionNotes: {
      puppy: "Extremely slow growth essential. Large breed puppy formula with controlled calcium (0.8-1.2%).",
      adult: "Guardian breeds need quality protein (24-26%) for muscle maintenance without excess weight.",
      senior: "Joint support critical with age. Moderate protein (22-24%) with lower calories as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1608096299230-81c7b43d5dfc?q=80"
  },
  {
    breed: "Kuvasz",
    size: "Large",
    dailyCalories: { min: 1700, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2400 },
      senior: { min: 1400, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hungarian guardian breed with thick white coat",
    nutritionNotes: {
      puppy: "Extremely slow growth essential for joint health. Large breed puppy formula with controlled calcium.",
      adult: "White coat benefits from omega fatty acids. Moderate protein (22-26%) for muscle maintenance.",
      senior: "Joint support increasingly important. Moderate protein (20-24%) with glucosamine/chondroitin."
    },
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80"
  },
  {
    breed: "Akita",
    size: "Large",
    dailyCalories: { min: 1500, max: 2300 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2500 },
      adult: { min: 1500, max: 2300 },
      senior: { min: 1300, max: 1900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Japanese guardian breed, prone to food sensitivities",
    nutritionNotes: {
      puppy: "Slow growth essential. Often sensitive to common proteins - consider novel protein sources.",
      adult: "Monitor for food allergies. Limited ingredient diets often beneficial. Moderate protein (22-26%).",
      senior: "Joint support increasingly important. Consider novel protein sources if sensitivities continue."
    },
    imageUrl: "https://images.unsplash.com/photo-1581131131275-89ac13b71b3f?q=80"
  },
  {
    breed: "Rhodesian Ridgeback",
    size: "Large",
    dailyCalories: { min: 1700, max: 2300 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2500 },
      adult: { min: 1700, max: 2300 },
      senior: { min: 1400, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic African hunting breed",
    nutritionNotes: {
      puppy: "Support athletic development. Moderate protein (24-28%) with controlled growth rate.",
      adult: "Athletic breed needs quality protein (24-26%) for muscle maintenance. Monitor weight carefully.",
      senior: "Maintain muscle mass with continued quality protein (22-24%). Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80"
  }
];
