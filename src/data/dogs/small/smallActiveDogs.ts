
import { DogStandard } from "../../types/dogTypes";

export const smallActiveDogs: DogStandard[] = [
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
    breed: "Jack Russell Terrier",
    size: "Small",
    dailyCalories: { min: 400, max: 650 },
    ageSpecificCalories: {
      puppy: { min: 450, max: 700 },
      adult: { min: 400, max: 650 },
      senior: { min: 320, max: 550 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Very active, high energy needs",
    nutritionNotes: {
      puppy: "Needs high quality protein (26-30%) for muscle development. Consider higher calorie density for active puppies.",
      adult: "Athletic breed with high energy needs. Quality protein (25-28%) with higher fat content (12-16%) for sustained energy.",
      senior: "Adjust calories as activity decreases, but maintain protein levels (24-26%) for muscle preservation."
    },
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80"
  },
  {
    breed: "Miniature Schnauzer",
    size: "Small",
    dailyCalories: { min: 350, max: 550 },
    ageSpecificCalories: {
      puppy: { min: 400, max: 650 },
      adult: { min: 350, max: 550 },
      senior: { min: 300, max: 450 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to pancreatitis, monitor fat intake",
    nutritionNotes: {
      puppy: "Moderate fat (10-14%) due to predisposition to pancreatic issues. Quality protein (24-26%) for proper growth.",
      adult: "Lower fat diet (8-12%) recommended. Consider adding digestive enzymes. Watch for food sensitivities.",
      senior: "Further reduce fat (6-10%) and monitor closely. Consider supplements for joint health and coat maintenance."
    },
    imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80"
  },
  {
    breed: "Miniature Pinscher",
    size: "Small",
    dailyCalories: { min: 250, max: 450 },
    ageSpecificCalories: {
      puppy: { min: 300, max: 500 },
      adult: { min: 250, max: 450 },
      senior: { min: 200, max: 350 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 3,
      senior: 3
    },
    notes: "High energy, fast metabolism",
    nutritionNotes: {
      puppy: "Risk of hypoglycemia - frequent small meals important. Energy-dense formula with 26-28% protein.",
      adult: "Active metabolism requires quality protein (24-26%). Small kibble size important for dental health.",
      senior: "Maintain protein levels (22-24%) as metabolism slows. Monitor dental health carefully."
    },
    imageUrl: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80"
  },
  {
    breed: "Norwich Terrier",
    size: "Small",
    dailyCalories: { min: 260, max: 430 },
    ageSpecificCalories: {
      puppy: { min: 310, max: 480 },
      adult: { min: 260, max: 430 },
      senior: { min: 210, max: 380 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working terrier with hearty appetite",
    nutritionNotes: {
      puppy: "Support muscle development with quality protein (25-28%). Small kibble size essential for dental health.",
      adult: "Adjust calories based on activity level. Quality protein (24-26%) supports coat and energy needs.",
      senior: "Maintain muscle mass with quality protein (22-24%). Consider dental-supportive foods."
    },
    imageUrl: "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?q=80"
  }
]
