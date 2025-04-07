
import { DogStandard } from "../../types/dogTypes";

export const terrierSmallDogs: DogStandard[] = [
  {
    breed: "Scottish Terrier",
    size: "Small",
    dailyCalories: { min: 400, max: 700 },
    ageSpecificCalories: {
      puppy: { min: 450, max: 750 },
      adult: { min: 400, max: 700 },
      senior: { min: 350, max: 600 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Sturdy hunting terrier, moderate energy",
    nutritionNotes: {
      puppy: "Support proper growth with quality protein (24-26%). Small kibble size essential for dental health.",
      adult: "Quality protein (22-25%) for muscle maintenance. Monitor for weight gain as activity varies.",
      senior: "Lower calorie needs as activity decreases. Moderate protein (20-22%) with dental-friendly kibble."
    },
    imageUrl: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80"
  },
  {
    breed: "Cairn Terrier",
    size: "Small",
    dailyCalories: { min: 380, max: 670 },
    ageSpecificCalories: {
      puppy: { min: 430, max: 720 },
      adult: { min: 380, max: 670 },
      senior: { min: 330, max: 580 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active working terrier, weatherproof coat",
    nutritionNotes: {
      puppy: "Support muscular development with quality protein (24-26%). Small kibble size essential.",
      adult: "Moderate protein (22-25%) sufficient for muscle maintenance. Monitor for tendency to obesity.",
      senior: "Lower calorie needs with age. Quality protein (20-22%) with joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80"
  },
  {
    breed: "Silky Terrier",
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
    notes: "Fine coat requires nutritional support",
    nutritionNotes: {
      puppy: "Support coat development with omega fatty acids. Quality protein (24-26%) for proper growth.",
      adult: "Silky coat benefits from balanced fatty acids. Moderate protein (22-25%) for muscle maintenance.",
      senior: "Continue coat support with omega supplements. Lower calories (20-22%) as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80"
  },
  {
    breed: "Lhasa Apso",
    size: "Small",
    dailyCalories: { min: 350, max: 550 },
    ageSpecificCalories: {
      puppy: { min: 400, max: 600 },
      adult: { min: 350, max: 550 },
      senior: { min: 300, max: 500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Long coat, moderate activity level",
    nutritionNotes: {
      puppy: "Support coat development with omega fatty acids. Quality protein (24-26%) for proper growth.",
      adult: "Coat health paramount - balanced fatty acids. Moderate protein (22-24%) sufficient.",
      senior: "Continue coat support as aging occurs. Lower calories (20-22%) with joint supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1587764379873-a490e0c5e0c5?q=80"
  },
  {
    breed: "Italian Greyhound",
    size: "Small",
    dailyCalories: { min: 250, max: 450 },
    ageSpecificCalories: {
      puppy: { min: 300, max: 500 },
      adult: { min: 250, max: 450 },
      senior: { min: 200, max: 400 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "Delicate build, higher fat needs",
    nutritionNotes: {
      puppy: "Prone to hypoglycemia, frequent small meals important. Higher fat (14-16%) than most puppies.",
      adult: "Higher fat content (12-16%) even for non-racing dogs. Quality protein (24-26%) for muscle.",
      senior: "Dental health critical as they age. Maintain lean muscle with quality protein (22-24%)."
    },
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80"
  },
  {
    breed: "Boston Terrier",
    size: "Small",
    dailyCalories: { min: 400, max: 650 },
    ageSpecificCalories: {
      puppy: { min: 450, max: 700 },
      adult: { min: 400, max: 650 },
      senior: { min: 350, max: 550 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Brachycephalic breed, specialized feeding needs",
    nutritionNotes: {
      puppy: "Small kibble essential for flat face. Moderate protein (24-26%) for controlled growth.",
      adult: "Elevated feeding position helpful. Lower fat content (10-14%) to prevent obesity.",
      senior: "Further calorie reduction with age. Joint supplements beneficial after 7 years."
    },
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  }
];
