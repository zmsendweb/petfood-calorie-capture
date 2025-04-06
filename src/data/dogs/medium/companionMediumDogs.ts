
import { DogStandard } from "../../types/dogTypes";

export const companionMediumDogs: DogStandard[] = [
  {
    breed: "Beagle",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Tendency to overeat, portion control important",
    nutritionNotes: {
      puppy: "Moderate growth, needs balanced nutrition with 24-26% protein. Avoid overfeeding to prevent obesity later in life.",
      adult: "Strong food drive, strict portion control needed. Consider puzzle feeders to slow consumption and prevent weight gain.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80"
  },
  {
    breed: "Corgi",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to obesity, monitor portions carefully",
    nutritionNotes: {
      puppy: "Prone to obesity, strict portion control needed. Consider joint health due to body structure.",
      adult: "Prone to obesity, strict portion control needed. Consider joint health due to body structure.",
      senior: "Prone to obesity, strict portion control needed. Consider joint health due to body structure."
    },
    imageUrl: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?q=80"
  },
  {
    breed: "Cocker Spaniel",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 800, max: 1200 },
      senior: { min: 700, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate activity, prone to ear infections",
    nutritionNotes: {
      puppy: "Quality protein (24-26%) for proper development. Omega fatty acids for coat health. Monitor for food allergies early.",
      adult: "Moderate protein (22-25%) with omega supplements for coat. Prone to obesity - monitor portion sizes.",
      senior: "Lower calorie density needed with age. Consider foods with glucosamine for joint health."
    },
    imageUrl: "https://images.unsplash.com/photo-1591769607592-e27c8e8c48f5?q=80"
  },
  {
    breed: "English Springer Spaniel",
    size: "Medium",
    dailyCalories: { min: 850, max: 1250 },
    ageSpecificCalories: {
      puppy: { min: 950, max: 1350 },
      adult: { min: 850, max: 1250 },
      senior: { min: 750, max: 1150 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working breed, adjust calories with activity",
    nutritionNotes: {
      puppy: "Support steady growth with quality protein (24-26%). Consider DHA for cognitive development.",
      adult: "Adjust calories based on hunting/working activity. Omega fatty acids beneficial for coat health.",
      senior: "Joint support increasingly important with age. Maintain coat health with omega supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1579551054711-6b1c95b31d77?q=80"
  },
  {
    breed: "Whippet",
    size: "Medium",
    dailyCalories: { min: 780, max: 1150 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 780, max: 1150 },
      senior: { min: 650, max: 950 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Lean build, may need higher fat content",
    nutritionNotes: {
      puppy: "Support lean muscle development. Higher fat (15-18%) than many puppies. Monitor for dry skin issues.",
      adult: "Naturally lean body type. Higher fat content (14-18%) even for non-racing dogs. Quality protein essential (24-28%).",
      senior: "Maintain muscle mass as activity decreases. Moderate fat (12-16%) and quality protein (22-26%)."
    },
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80"
  },
  {
    breed: "Samoyed",
    size: "Medium",
    dailyCalories: { min: 900, max: 1350 },
    ageSpecificCalories: {
      puppy: { min: 1050, max: 1500 },
      adult: { min: 900, max: 1350 },
      senior: { min: 750, max: 1100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Dense coat requires nutritional support",
    nutritionNotes: {
      puppy: "Support coat development with omega fatty acids. Quality protein (24-26%) for proper growth.",
      adult: "Coat health paramount - omega 3 and 6 balance important. Higher caloric needs in cold weather.",
      senior: "Maintain coat quality with continued fatty acid support. Joint supplements beneficial as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80"
  }
]
