import { CatStandard } from "../types/catTypes";

export const largeCats: CatStandard[] = [
  {
    breed: "Maine Coon",
    size: "Large",
    dailyCalories: { min: 250, max: 400 },
    ageSpecificCalories: {
      kitten: { min: 300, max: 450 },
      adult: { min: 250, max: 400 },
      senior: { min: 220, max: 350 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 4,
      adult: 2,
      senior: 2
    },
    notes: "High protein needs (35-40%). Large breed needs joint support. Feed wet and dry food mix. Monitor weight due to size.",
    nutritionNotes: {
      kitten: "Growth period extends to 18-24 months. Requires high protein (38-40%) and DHA for development. Multiple small meals prevent growth issues.",
      adult: "Joint support essential with glucosamine/chondroitin. High-quality protein (35-40%) maintains muscle mass. Wet food helps with hydration.",
      senior: "Senior formula after 7 years. Moderate protein (32-36%) with lower phosphorus for kidney health. Joint supplements increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Ragdoll",
    size: "Large",
    dailyCalories: { min: 240, max: 380 },
    ageSpecificCalories: {
      kitten: { min: 280, max: 420 },
      adult: { min: 240, max: 380 },
      senior: { min: 210, max: 330 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate protein needs (30-35%). Watch for obesity. Feed age-appropriate portions. Consider indoor cat formula.",
    nutritionNotes: {
      kitten: "Slower maturation rate requires extended kitten formula (12-14 months). Moderate protein (36-38%) prevents rapid growth issues.",
      adult: "Indoor lifestyle requires careful portion control. Hairball prevention formula beneficial. Moderate protein (30-35%) sufficient.",
      senior: "Prone to cardiac issues - taurine and L-carnitine important after 7 years. Lower phosphorus levels for kidney health. Soft food may be needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Norwegian Forest Cat",
    size: "Large",
    dailyCalories: { min: 280, max: 420 },
    ageSpecificCalories: {
      kitten: { min: 320, max: 460 },
      adult: { min: 280, max: 420 },
      senior: { min: 240, max: 380 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large breed needs joint support. High protein (35-40%) for coat maintenance. Consider omega fatty acids. Watch growth rate in kittens.",
    nutritionNotes: {
      kitten: "Extended growth period (14-16 months). High protein (38-40%) supports muscle development. Omega-3 and 6 essential for coat development.",
      adult: "Higher caloric needs in winter months. Thick coat requires specific nutrients (biotin, zinc). High protein (35-40%) maintains coat health.",
      senior: "Joint support increasingly important after 7 years. Moderate protein (32-36%) prevents muscle loss. Dental-friendly kibble recommended."
    },
    imageUrl: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Turkish Van",
    size: "Large",
    dailyCalories: { min: 250, max: 380 },
    ageSpecificCalories: {
      kitten: { min: 290, max: 430 },
      adult: { min: 250, max: 380 },
      senior: { min: 220, max: 340 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Late maturity - adjust portions with age. High protein (33-38%). Consider swimming activity in calorie needs. Monitor growth rate.",
    nutritionNotes: {
      kitten: "Very late maturity (3-5 years). Extended kitten diet recommended. High protein (38-40%) with DHA supports brain development.",
      adult: "Activity level varies with environment - adjust calories accordingly. High protein (33-38%) maintains muscle. Skin and coat support essential.",
      senior: "Aging begins around 9-10 years. Moderate protein (30-34%) with increased antioxidants. Monitor kidney function with appropriate diet."
    },
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Ocicat",
    size: "Large",
    dailyCalories: { min: 250, max: 380 },
    ageSpecificCalories: {
      kitten: { min: 290, max: 430 },
      adult: { min: 250, max: 380 },
      senior: { min: 220, max: 340 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed needs high protein (35-40%). Consider muscle maintenance. Watch for food allergies. Monitor activity level.",
    nutritionNotes: {
      kitten: "High energy needs require frequent meals. High protein (38-42%) supports muscle development. Monitor for food sensitivities early.",
      adult: "Active lifestyle requires balanced nutrition. High protein (35-40%) maintains muscle mass. Taurine supplementation beneficial.",
      senior: "Maintain muscle mass with quality protein (32-36%). Joint support essential. Monitor kidney function with appropriate diet."
    },
    imageUrl: "https://images.unsplash.com/photo-1586289883499-f11d28425e23?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "RagaMuffin",
    size: "Large",
    dailyCalories: { min: 240, max: 360 },
    ageSpecificCalories: {
      kitten: { min: 270, max: 400 },
      adult: { min: 240, max: 360 },
      senior: { min: 210, max: 330 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Similar to Ragdoll needs. Moderate protein (30-35%). Watch for obesity. Consider joint health. Monitor portion sizes.",
    nutritionNotes: {
      kitten: "Slow growth requires controlled nutrition. Moderate protein (36-38%) prevents rapid weight gain. Monitor portion sizes carefully.",
      adult: "Prone to obesity - strict portion control needed. Moderate protein (30-35%) sufficient. Hairball control formula beneficial.",
      senior: "Cardiac health support with taurine and L-carnitine. Lower phosphorus levels for kidney health. Soft food may be needed for dental issues."
    },
    imageUrl: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Siberian",
    size: "Large",
    dailyCalories: { min: 250, max: 380 },
    ageSpecificCalories: {
      kitten: { min: 290, max: 430 },
      adult: { min: 250, max: 380 },
      senior: { min: 220, max: 340 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Cold-adapted breed needs high protein (35-40%). Consider omega fatty acids for coat. Watch joint health. Monitor seasonal appetite changes.",
    nutritionNotes: {
      kitten: "Dense fur requires high protein (38-42%) and omega fatty acids. Monitor growth rate to prevent joint issues. Frequent small meals recommended.",
      adult: "Higher caloric needs in winter months. Thick coat requires specific nutrients (biotin, zinc). High protein (35-40%) maintains coat health.",
      senior: "Joint support increasingly important after 7 years. Moderate protein (32-36%) prevents muscle loss. Dental-friendly kibble recommended."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Highlander",
    size: "Large",
    dailyCalories: { min: 240, max: 360 },
    ageSpecificCalories: {
      kitten: { min: 270, max: 400 },
      adult: { min: 240, max: 360 },
      senior: { min: 210, max: 330 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large breed needs quality protein (33-38%). Consider joint supplements. Watch for growth rate. Monitor muscle development.",
    nutritionNotes: {
      kitten: "Requires high-quality protein for muscle development. Monitor calcium and phosphorus levels. Small, frequent meals are beneficial.",
      adult: "Active breed needs balanced nutrition. High-quality protein (33-38%) maintains muscle mass. Taurine supplementation beneficial.",
      senior: "Joint support essential. Moderate protein (30-34%) with increased antioxidants. Monitor kidney function with appropriate diet."
    },
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  }
];
