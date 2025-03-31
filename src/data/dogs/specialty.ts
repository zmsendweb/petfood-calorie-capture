
import { DogStandard } from "../dogStandards";

export const specialtyDogs: DogStandard[] = [
  {
    breed: "Border Collie",
    size: "Medium",
    dailyCalories: { min: 800, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1000, max: 1600 },
      adult: { min: 800, max: 1400 },
      senior: { min: 600, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working dog with very high energy needs. Quality protein (28-32%) for muscle maintenance. Monitor fat content (12-16%) for sustained energy.",
    nutritionNotes: {
      puppy: "Support rapid mental development. DHA for cognitive function. Higher protein (30-34%) for muscle development.",
      adult: "Active working breeds may need sport/performance formulas. High quality protein essential. Consider higher fat content during peak work season.",
      senior: "Maintain muscle mass with quality protein (28-30%). Support joint health with glucosamine/chondroitin."
    },
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80"
  },
  {
    breed: "Australian Shepherd",
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
    notes: "Active herding breed. Quality protein (26-30%) with moderate fat (12-15%) for sustained energy. May be prone to MDR1 mutation - avoid foods with certain medications.",
    nutritionNotes: {
      puppy: "Control growth for joint health. Moderate protein (28-32%), avoid excess calcium/phosphorus. Multiple small meals until 6 months old.",
      adult: "Adjust calories with seasonal work requirements. Quality protein for muscle maintenance. Monitor weight carefully.",
      senior: "Joint supplements beneficial. Moderate protein (25-30%) for muscle maintenance. Lower calories as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80"
  },
  {
    breed: "Alaskan Malamute",
    size: "Large",
    dailyCalories: { min: 1000, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 2000 },
      adult: { min: 1000, max: 1800 },
      senior: { min: 800, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working sled dog with seasonal energy needs. High quality protein (28-32%) and higher fat content (14-18%) during working seasons. Monitor weight carefully.",
    nutritionNotes: {
      puppy: "Slow growth essential for joint development. Control calories and calcium/phosphorus levels. Avoid overfeeding.",
      adult: "Working season may require 50%+ more calories. Higher fat (16-20%) during cold weather/work periods. Quality protein essential.",
      senior: "Support joint health. Moderate protein (26-30%) with lower fat in non-working periods. Monitor weight carefully."
    },
    imageUrl: "https://images.unsplash.com/photo-1602307362970-c0d1a107eab9?q=80"
  },
  {
    breed: "Cane Corso",
    size: "Large",
    dailyCalories: { min: 1200, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2400 },
      adult: { min: 1200, max: 2000 },
      senior: { min: 900, max: 1600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Giant guardian breed. Controlled growth crucial. Moderate protein (24-28%) and lower fat (12-15%) to prevent overgrowth.",
    nutritionNotes: {
      puppy: "Extremely slow growth essential for joint health. Large breed puppy food mandatory. Multiple small meals to prevent bloat.",
      adult: "Moderate protein prevents excess mass. Joint supplements beneficial throughout life. Monitor weight carefully.",
      senior: "Lower calories while maintaining protein content. Joint supplements crucial. Watch for weight gain tendencies."
    },
    imageUrl: "https://images.unsplash.com/photo-1568393691060-3fcd1e001d8d?q=80"
  },
  {
    breed: "Saluki",
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
    notes: "Sighthound with unique metabolism. Higher fat (16-20%) even at rest. Quality protein (26-30%) promotes muscle maintenance.",
    nutritionNotes: {
      puppy: "Support lean muscle development. Higher protein (28-32%) and fat (14-18%) than typical puppies. Watch for food sensitivities.",
      adult: "Higher fat content than most breeds. Protein quality critical for muscle maintenance. May do well on performance formulas even when not working.",
      senior: "Maintain lean muscle mass. Higher protein (26-30%) than most senior dogs. Watch for dental issues common in sighthounds."
    },
    imageUrl: "https://images.unsplash.com/photo-1551730458-8158ff1825ed?q=80"
  },
  {
    breed: "Basenji",
    size: "Small",
    dailyCalories: { min: 500, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 600, max: 1000 },
      adult: { min: 500, max: 900 },
      senior: { min: 400, max: 700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Primitive breed with efficient metabolism. Often sensitive to grains. Quality protein (26-30%) with moderate fat (12-16%).",
    nutritionNotes: {
      puppy: "Prone to digestive sensitivities. Introduction of new foods should be gradual. Multiple small meals until 6 months.",
      adult: "Grain-free options often preferred. Higher quality protein sources. Monitor for Fanconi syndrome symptoms.",
      senior: "Kidney function monitoring critical. Quality protein sources with moderate phosphorus. Consider kidney support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08dcf9738661?q=80"
  },
  {
    breed: "Bloodhound",
    size: "Large",
    dailyCalories: { min: 1100, max: 1900 },
    ageSpecificCalories: {
      puppy: { min: 1300, max: 2100 },
      adult: { min: 1100, max: 1900 },
      senior: { min: 900, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Scent hound with deep barrel chest. Bloat prevention critical. Moderate protein (24-28%) with measured feeding intervals.",
    nutritionNotes: {
      puppy: "Control growth to support joints. Large breed puppy formula essential. Multiple small meals to prevent gastric issues.",
      adult: "Elevated feeding stations reduce bloat risk. Quality protein for muscle maintenance. Monitor for skin fold infections.",
      senior: "Joint support crucial. Moderate protein (24-28%) for muscle maintenance. Watch for weight gain as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1618173745537-9570d6b5ca26?q=80"
  },
  {
    breed: "Leonberger",
    size: "Large",
    dailyCalories: { min: 1300, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1500, max: 2400 },
      adult: { min: 1300, max: 2200 },
      senior: { min: 1000, max: 1700 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Giant water-working breed. Control growth essential. Moderate protein (24-28%) with joint supportive nutrients.",
    nutritionNotes: {
      puppy: "Extremely slow growth ideal. Large breed puppy formula mandatory. Multiple small meals to support steady growth.",
      adult: "Adjust for seasonal coat needs. Moderate protein with omega fatty acids for coat. Joint supplements beneficial throughout life.",
      senior: "Joint support increasingly important. Moderate protein (24-26%) for muscle maintenance. Weight management critical."
    },
    imageUrl: "https://images.unsplash.com/photo-1580130732478-4e339fb6836f?q=80"
  },
  {
    breed: "Whippet",
    size: "Medium",
    dailyCalories: { min: 600, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 700, max: 1200 },
      adult: { min: 600, max: 1000 },
      senior: { min: 500, max: 800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Sighthound with unique metabolism. Higher fat (15-18%) even at rest. Quality protein (26-30%) for lean muscle maintenance.",
    nutritionNotes: {
      puppy: "Support lean muscle development without excess growth. Moderate protein (28-32%) with higher fat than typical puppies.",
      adult: "Higher fat content than many breeds. May do well on performance formulas even when not working. Quality protein essential.",
      senior: "Dental care increasingly important. Moderate protein (26-28%) for muscle maintenance. Monitor joint health."
    },
    imageUrl: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80"
  },
  {
    breed: "Dalmatian",
    size: "Medium",
    dailyCalories: { min: 780, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1400 },
      adult: { min: 780, max: 1200 },
      senior: { min: 650, max: 950 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Unique purine metabolism requires specialized diet. Low purine diet with controlled protein (22-26%) sources. Monitor urine pH.",
    nutritionNotes: {
      puppy: "Specialized puppy formulas preferred. Control protein sources and purines. Multiple small meals until 6 months.",
      adult: "Low purine protein sources essential. Monitor urine pH with vet. Increased water intake encouragement.",
      senior: "Continue purine management. Moderate protein (22-24%) from appropriate sources. Monitor kidney function with regular vet checks."
    },
    imageUrl: "https://images.unsplash.com/photo-1583512603866-910c8542ba9d?q=80"
  }
];
