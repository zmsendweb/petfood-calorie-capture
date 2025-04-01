
import { DogStandard } from "../../types/dogTypes";

export const rareHerdingDogs: DogStandard[] = [
  {
    breed: "Cao de Serra de Aires",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1300 },
      adult: { min: 700, max: 1100 },
      senior: { min: 600, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Portuguese herding breed. Moderate protein (24-28%) and fat (12-16%) for sustained energy. Coat benefits from omega-3 fatty acids.",
    nutritionNotes: {
      puppy: "Support steady growth. Avoid excess calories and calcium. Multiple small meals until 6 months.",
      adult: "Working dogs may need additional calories. Quality protein for muscle maintenance. Support coat health with omega-3.",
      senior: "Maintain muscle mass with quality protein (24-26%). Consider joint support supplements."
    },
    imageUrl: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80"
  },
  {
    breed: "Mudi",
    size: "Small",
    dailyCalories: { min: 550, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 650, max: 1050 },
      adult: { min: 550, max: 900 },
      senior: { min: 450, max: 750 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hungarian herding breed with high energy. Moderate protein (26-30%) with adequate fat (12-16%) for sustained energy.",
    nutritionNotes: {
      puppy: "Support active development. Moderate protein (28-32%) for muscle growth. Multiple small meals until 6 months.",
      adult: "Working dogs may need additional calories. Quality protein for muscle maintenance. Monitor weight carefully with activity level changes.",
      senior: "Maintain muscle mass with quality protein (26-28%). Consider joint support as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?q=80"
  },
  {
    breed: "Pyrenean Shepherd",
    size: "Small",
    dailyCalories: { min: 550, max: 900 },
    ageSpecificCalories: {
      puppy: { min: 650, max: 1050 },
      adult: { min: 550, max: 900 },
      senior: { min: 450, max: 750 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Energetic herding breed. Moderate protein (26-30%) with adequate fat (12-16%) for sustained energy. Support coat with omega fatty acids.",
    nutritionNotes: {
      puppy: "Support active growth. Moderate protein (28-32%) for muscle development. Multiple small meals until 6 months.",
      adult: "High energy needs, adjust calories with activity level. Quality protein sources essential. May need higher fat content during working seasons.",
      senior: "Maintain muscle mass with quality protein (26-28%). Monitor weight as activity decreases."
    },
    imageUrl: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?q=80"
  }
];
