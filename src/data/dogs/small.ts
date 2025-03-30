
import { DogStandard } from "../dogStandards";

export const smallDogs: DogStandard[] = [
  {
    breed: "French Bulldog",
    size: "Small",
    dailyCalories: { min: 700, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1100 },
      adult: { min: 700, max: 1000 },
      senior: { min: 550, max: 850 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Prone to obesity, monitor intake carefully",
    nutritionNotes: {
      puppy: "Brachycephalic breed needs small kibble size. Moderate protein (24-26%) for controlled growth. Watch for food allergies early.",
      adult: "Respiratory-friendly kibble shape. Lower fat content (10-14%) to prevent obesity. Joint supplements recommended from early adulthood.",
      senior: "Significant calorie reduction after 7 years. Elevated feeding position helpful. Consider mobility supplements and digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442b31b?q=80"
  },
  {
    breed: "Chihuahua",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 450 },
      adult: { min: 200, max: 400 },
      senior: { min: 180, max: 350 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small portions, frequent meals recommended",
    nutritionNotes: {
      puppy: "Hypoglycemia risk - needs 4-6 small meals daily. High quality protein (26-28%) for growth. Tiny kibble size essential.",
      adult: "Dental health critical - dental-friendly kibble or supplements needed. Energy-dense nutrition with 24-26% protein.",
      senior: "May need softer food with age (after 9 years). High quality protein sources (22-24%) for muscle maintenance. Dental care remains priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1615233500147-01f005438a44?q=80"
  },
  {
    breed: "Yorkshire Terrier",
    size: "Small",
    dailyCalories: { min: 150, max: 300 },
    ageSpecificCalories: {
      puppy: { min: 200, max: 350 },
      adult: { min: 150, max: 300 },
      senior: { min: 120, max: 250 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small frequent meals, avoid overfeeding",
    nutritionNotes: {
      puppy: "Prone to hypoglycemia, needs frequent small meals with high-quality protein (26-28%). Monitor blood sugar levels.",
      adult: "Dental health is critical, needs dental-friendly kibble or supplements. Energy-dense nutrition with 24-26% protein.",
      senior: "May need softer food with age, high-quality protein sources (22-24%) for muscle maintenance. Dental care remains a priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80"
  },
  {
    breed: "Pomeranian",
    size: "Small",
    dailyCalories: { min: 200, max: 500 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 550 },
      adult: { min: 200, max: 500 },
      senior: { min: 180, max: 400 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small portions to prevent hypoglycemia",
    nutritionNotes: {
      puppy: "Small, frequent meals to prevent hypoglycemia, dense nutrition needed. Watch for dental issues.",
      adult: "High-quality protein for coat health, watch for dental issues. Consider nutrient-dense foods.",
      senior: "May need softer food with age, high-quality protein sources (22-24%) for muscle maintenance. Dental care remains a priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1587583530933-ed5d3485d220?q=80"
  },
  {
    breed: "Maltese",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 450 },
      adult: { min: 200, max: 400 },
      senior: { min: 180, max: 350 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Small, frequent meals recommended",
    nutritionNotes: {
      puppy: "Small, frequent meals recommended. High-quality protein for coat health. Watch for dental issues.",
      adult: "Small, frequent meals recommended. High-quality protein for coat health. Watch for dental issues.",
      senior: "Small, frequent meals recommended. High-quality protein for coat health. Watch for dental issues."
    },
    imageUrl: "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80"
  },
  {
    breed: "Shih Tzu",
    size: "Small",
    dailyCalories: { min: 400, max: 700 },
    ageSpecificCalories: {
      puppy: { min: 500, max: 800 },
      adult: { min: 400, max: 700 },
      senior: { min: 350, max: 600 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Low exercise needs, watch for overfeeding",
    nutritionNotes: {
      puppy: "Small breed, needs frequent small meals with high-quality protein (26-28%). Monitor for proper weight gain.",
      adult: "Prone to obesity, feed measured portions of low-fat diet. Consider dental health with kibble size.",
      senior: "May need softer food with age, high-quality protein sources (22-24%) for muscle maintenance. Dental care remains a priority."
    },
    imageUrl: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?q=80"
  },
  {
    breed: "Dachshund",
    size: "Small",
    dailyCalories: { min: 300, max: 600 },
    ageSpecificCalories: {
      puppy: { min: 400, max: 700 },
      adult: { min: 300, max: 600 },
      senior: { min: 250, max: 500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity, careful portion control needed",
    nutritionNotes: {
      puppy: "Strict portion control needed, consider back health - maintain lean weight. L-carnitine supplementation may benefit.",
      adult: "Prone to obesity, careful portion control needed. Consider back health - maintain lean weight. L-carnitine supplementation may benefit.",
      senior: "Prone to obesity, careful portion control needed. Consider back health - maintain lean weight. L-carnitine supplementation may benefit."
    },
    imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80"
  },
  {
    breed: "Papillon",
    size: "Small",
    dailyCalories: { min: 180, max: 350 },
    ageSpecificCalories: {
      puppy: { min: 220, max: 400 },
      adult: { min: 180, max: 350 },
      senior: { min: 160, max: 300 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 2
    },
    notes: "Active small breed, needs nutrient-dense food",
    nutritionNotes: {
      puppy: "High energy needs despite small size. Quality protein (26-28%) for proper development. Small kibble essential.",
      adult: "Active breed with higher caloric needs than similarly sized dogs. Quality protein (24-26%) maintains energy levels.",
      senior: "Maintain energy with quality protein (22-24%). Monitor dental health carefully with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  },
  {
    breed: "Bichon Frise",
    size: "Small",
    dailyCalories: { min: 300, max: 500 },
    ageSpecificCalories: {
      puppy: { min: 350, max: 550 },
      adult: { min: 300, max: 500 },
      senior: { min: 250, max: 450 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate activity level, prone to dental issues",
    nutritionNotes: {
      puppy: "Quality protein (24-26%) for proper growth. Consider dental-friendly kibble early. Fatty acids for coat health.",
      adult: "Moderate protein (22-24%) sufficient. Dental health formulas beneficial. Consider supplements for white coat maintenance.",
      senior: "Lower calorie density with protein (20-22%). Monitor dental health closely. Joint supplements may benefit."
    },
    imageUrl: "https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?q=80"
  },
  {
    breed: "Pug",
    size: "Small",
    dailyCalories: { min: 400, max: 600 },
    ageSpecificCalories: {
      puppy: { min: 450, max: 650 },
      adult: { min: 400, max: 600 },
      senior: { min: 350, max: 550 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Brachycephalic breed, prone to obesity",
    nutritionNotes: {
      puppy: "Controlled growth important. Small kibble for brachycephalic anatomy. Monitor weight gain closely.",
      adult: "Very prone to obesity - strict portion control essential. Low-fat (8-12%) formulas beneficial.",
      senior: "Further calorie reduction needed with age. Consider joint supplements and elevated feeding position."
    },
    imageUrl: "https://images.unsplash.com/photo-1553698217-934b000f1f00?q=80"
  }
];
