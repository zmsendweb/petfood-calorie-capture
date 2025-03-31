import { DogStandard } from "../../types/dogTypes";

export const sportingDogs: DogStandard[] = [
  {
    breed: "Vizsla",
    size: "Medium",
    dailyCalories: { min: 1200, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1400, max: 2000 },
      adult: { min: 1200, max: 1800 },
      senior: { min: 1000, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy hunting breed, needs performance nutrition",
    nutritionNotes: {
      puppy: "Controlled growth important for joint development. Moderate protein (24-26%) prevents excessive growth rate.",
      adult: "High energy needs for hunting/training. Higher protein (26-30%) and fat (14-18%) diet recommended for working dogs.",
      senior: "Maintain muscle mass with quality protein (24-28%). Reduce calories if activity decreases. Joint supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80"
  },
  {
    breed: "Weimaraner",
    size: "Large",
    dailyCalories: { min: 1400, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2400 },
      adult: { min: 1400, max: 2200 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active hunting breed, prone to bloat",
    nutritionNotes: {
      puppy: "Slow growth essential for large breed health. Large breed puppy formula with 22-24% protein recommended.",
      adult: "Risk of bloat - elevated feeding and multiple small meals recommended. Higher protein (25-28%) for working dogs.",
      senior: "Moderate protein (22-26%) maintains muscle mass. Adjust calories if activity decreases. Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?q=80"
  },
  {
    breed: "English Setter",
    size: "Medium",
    dailyCalories: { min: 1200, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1400, max: 2000 },
      adult: { min: 1200, max: 1800 },
      senior: { min: 1000, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active hunting breed with high energy needs",
    nutritionNotes: {
      puppy: "Moderate growth rate ideal. Quality protein (24-26%) supports proper development. Monitor for food sensitivities.",
      adult: "Active breed with variable energy needs. Adjust calories based on hunting/activity level. Coat-supporting nutrients beneficial.",
      senior: "Moderate protein (22-24%) maintains muscle mass. Coat support remains important. Joint supplements recommended."
    },
    imageUrl: "https://images.unsplash.com/photo-1525891618908-24765267dab7?q=80"
  },
  {
    breed: "Gordon Setter",
    size: "Large",
    dailyCalories: { min: 1300, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2200 },
      adult: { min: 1300, max: 2000 },
      senior: { min: 1100, max: 1700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working breed with moderate energy needs",
    nutritionNotes: {
      puppy: "Controlled growth important for joint health. Large breed puppy formula with moderate protein (22-24%) recommended.",
      adult: "Moderate to high energy needs based on work level. Quality protein (24-26%) supports coat health and energy needs.",
      senior: "Moderate protein (22-24%) maintains muscle mass. Coat support remains important. Joint supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1538736548623-fdd265a2fa8a?q=80"
  },
  {
    breed: "Brittany",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 800, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy hunting breed, needs quality nutrition",
    nutritionNotes: {
      puppy: "Moderate protein (24-26%) supports proper growth. Monitor for food sensitivities common in sporting breeds.",
      adult: "High energy breed with variable caloric needs. Adjust based on hunting/activity level. Higher protein (26-28%) for working dogs.",
      senior: "Moderate protein (22-24%) maintains muscle mass. Senior formula with joint support recommended after 7-8 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80"
  },
  {
    breed: "Pointer",
    size: "Large",
    dailyCalories: { min: 1200, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1400, max: 2000 },
      adult: { min: 1200, max: 1800 },
      senior: { min: 1000, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic hunting breed with lean build",
    nutritionNotes: {
      puppy: "Controlled growth important for joint development. Moderate protein (24-26%) prevents excessive growth rate.",
      adult: "Athletic breed needs quality nutrition. Higher protein (25-28%) for working dogs. Adjust calories based on activity level.",
      senior: "Maintain lean muscle mass with quality protein (22-26%). Reduce calories if activity decreases. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80"
  },
  {
    breed: "Irish Setter",
    size: "Large",
    dailyCalories: { min: 1300, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2200 },
      adult: { min: 1300, max: 2000 },
      senior: { min: 1100, max: 1700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Energy needs vary with activity level",
    nutritionNotes: {
      puppy: "Slow growth essential for joint health. Large breed puppy formula with moderate protein (22-24%) recommended.",
      adult: "Energy needs vary with activity level. Coat support nutrients beneficial. Quality protein (24-26%) maintains muscle.",
      senior: "Moderate protein (22-24%) maintains muscle mass. Coat support remains important. Joint supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1611611158876-41699b77a059?q=80"
  },
  {
    breed: "English Springer Spaniel",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 800, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active sporting breed, prone to ear infections",
    nutritionNotes: {
      puppy: "Moderate protein (24-26%) supports proper growth. Monitor for food allergies that may affect ear health.",
      adult: "Active sporting breed with variable energy needs. Quality protein (24-26%) supports coat and energy needs.",
      senior: "Moderate protein (22-24%) maintains muscle mass. Watch for weight gain as activity decreases with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80"
  },
  {
    breed: "Chesapeake Bay Retriever",
    size: "Large",
    dailyCalories: { min: 1400, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2400 },
      adult: { min: 1400, max: 2200 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working water dog, needs waterproof coat support",
    nutritionNotes: {
      puppy: "Slow growth essential for joint health. Large breed puppy formula with moderate protein (22-24%) recommended.",
      adult: "Working water dog needs quality nutrition. Higher fat (14-18%) supports waterproof coat. Quality protein (25-28%) maintains energy.",
      senior: "Moderate protein (22-26%) maintains muscle mass. Coat support remains important. Joint supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80"
  },
  {
    breed: "Flat-Coated Retriever",
    size: "Large",
    dailyCalories: { min: 1300, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2200 },
      adult: { min: 1300, max: 2000 },
      senior: { min: 1100, max: 1700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Energetic sporting breed, prone to cancer",
    nutritionNotes: {
      puppy: "Controlled growth important for joint health. Large breed puppy formula with moderate protein (22-24%) recommended.",
      adult: "Energetic sporting breed with moderate energy needs. Quality protein (24-26%) supports coat and energy needs.",
      senior: "Antioxidant-rich diet beneficial. Consider cancer-preventative nutrition after 7 years. Quality protein (22-24%) maintains muscle."
    },
    imageUrl: "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80"
  }
];
