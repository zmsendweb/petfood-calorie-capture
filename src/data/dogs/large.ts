import { DogStandard } from "../types/dogTypes";

export const largeDogs: DogStandard[] = [
  {
    breed: "Labrador Retriever",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed, adjust based on activity level",
    nutritionNotes: {
      puppy: "Controlled growth is essential. Puppies need 22-24% protein and 8-12% fat. Feed puppy-specific large breed formula to prevent orthopedic issues.",
      adult: "Active adults need 22-26% protein. Consider joint supplements for active lifestyle. Monitor body condition score to prevent obesity.",
      senior: "Reduced calories needed after 7 years. Lower fat (10-12%) and moderate protein (22-24%) with glucosamine/chondroitin for joints."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80"
  },
  {
    breed: "German Shepherd",
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
    notes: "High energy breed, needs protein-rich diet",
    nutritionNotes: {
      puppy: "Calcium-phosphorus ratio critical (1.2:1). Moderate growth formula with 22-24% protein. Monitor growth rate to prevent joint issues.",
      adult: "Higher protein (26-28%) for muscle maintenance. Consider multiple smaller meals to prevent bloat. DHA supplementation beneficial.",
      senior: "Joint support essential after 7 years. Moderate protein (24%) and lower phosphorus levels for kidney health. Antioxidants for cognitive support."
    },
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80"
  },
  {
    breed: "Golden Retriever",
    size: "Large",
    dailyCalories: { min: 1300, max: 2100 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2400 },
      adult: { min: 1300, max: 2100 },
      senior: { min: 1100, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Adjust based on age and activity",
    nutritionNotes: {
      puppy: "Controlled growth essential with large breed puppy formula. Moderate protein (22-24%) and balanced calcium-phosphorus ratio.",
      adult: "Prone to food allergies - watch for skin issues. Omega-3 fatty acids beneficial (EPA/DHA). Moderate protein (22-24%) sufficient.",
      senior: "Cancer-preventative antioxidants recommended after 7 years. Glucosamine/chondroitin for joints. Lower calorie density to prevent weight gain."
    },
    imageUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80"
  },
  {
    breed: "Siberian Husky",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2200 },
      adult: { min: 1400, max: 2000 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy needs, especially in cold weather",
    nutritionNotes: {
      puppy: "Rapid growth, needs high-quality protein (25-28%) and balanced calcium-phosphorus ratio. Monitor for proper weight gain.",
      adult: "High energy needs, especially in cold weather. Adjust food intake based on activity level. Consider joint supplements for active dogs.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80"
  },
  {
    breed: "Rottweiler",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 2800 },
      adult: { min: 1800, max: 2500 },
      senior: { min: 1500, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Requires high protein diet, prone to weight gain if inactive",
    nutritionNotes: {
      puppy: "Controlled growth is essential, feed large breed puppy formula with moderate protein (22-24%) and balanced calcium-phosphorus ratio.",
      adult: "Requires high protein diet (26-28%) for muscle maintenance. Consider multiple smaller meals to prevent bloat.",
      senior: "Joint support essential after 7 years, moderate protein (24%) and lower phosphorus levels for kidney health. Antioxidants for cognitive support."
    },
    imageUrl: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?q=80"
  },
  {
    breed: "Great Dane",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    ageSpecificCalories: {
      puppy: { min: 2200, max: 3200 },
      adult: { min: 2000, max: 3000 },
      senior: { min: 1700, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Multiple smaller meals recommended to prevent bloat",
    nutritionNotes: {
      puppy: "Critical to prevent rapid growth in puppies, feed large breed puppy formula with moderate protein (23-26%) and controlled calcium intake.",
      adult: "Moderate protein (23-26%) recommended, feed elevated to prevent bloat. Monitor calcium levels for proper muscle function.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80"
  },
  {
    breed: "Boxer",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2400 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed, needs protein-rich diet",
    nutritionNotes: {
      puppy: "High protein requirements (25-30%), consider heart health supplements. Watch for food sensitivities.",
      adult: "Athletic breed, needs protein-rich diet (25-30%), consider heart health supplements. Watch for food sensitivities.",
      senior: "Athletic breed, needs protein-rich diet (25-30%), consider heart health supplements. Watch for food sensitivities."
    },
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80"
  },
  {
    breed: "Saint Bernard",
    size: "Large",
    dailyCalories: { min: 1800, max: 2800 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 3000 },
      adult: { min: 1800, max: 2800 },
      senior: { min: 1500, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Watch for rapid growth in puppies",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, moderate protein (23-25%). Risk of bloat - avoid exercise after meals. Joint health supplements recommended.",
      adult: "Moderate protein (23-25%), risk of bloat - avoid exercise after meals. Joint health supplements recommended.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1592754888953-4cc99c0b4d3f?q=80"
  },
  {
    breed: "Doberman Pinscher",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed, needs balanced protein and fat",
    nutritionNotes: {
      puppy: "High protein needs (25-30%), consider taurine supplementation for heart health. Watch for food allergies.",
      adult: "Athletic breed, needs balanced protein and fat (25-30%), consider taurine supplementation for heart health. Watch for food allergies.",
      senior: "Athletic breed, needs balanced protein and fat (25-30%), consider taurine supplementation for heart health. Watch for food allergies."
    },
    imageUrl: "https://images.unsplash.com/photo-1595792463990-93d4dec2dfc8?q=80"
  },
  {
    breed: "Bernese Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2500 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large breed, careful feeding during growth",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, joint health supplements recommended. Moderate protein (23-26%).",
      adult: "Joint health supplements recommended. Moderate protein (23-26%). Watch for bloat - feed smaller meals.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1582828470841-f822d98dc4b1?q=80"
  }
];
