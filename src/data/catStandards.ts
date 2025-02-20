
export interface CatStandard {
  breed: string;
  size: string;
  dailyCalories: {
    min: number;
    max: number;
  };
  mealsPerDay: number;
  notes: string;
  imageUrl: string;
}

export const catStandards: CatStandard[] = [
  {
    breed: "Maine Coon",
    size: "Large",
    dailyCalories: { min: 250, max: 400 },
    mealsPerDay: 2,
    notes: "High protein needs (35-40%). Large breed needs joint support. Feed wet and dry food mix. Monitor weight due to size.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80"
  },
  {
    breed: "Persian",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 3,
    notes: "Face shape requires special bowl consideration. High quality protein (32-35%) for coat. Small, frequent meals recommended.",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80"
  },
  {
    breed: "Siamese",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "High metabolism - quality protein (35%). Prone to dental issues. Consider breed-specific formulas. Monitor food temperature preferences.",
    imageUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80"
  },
  {
    breed: "Ragdoll",
    size: "Large",
    dailyCalories: { min: 240, max: 380 },
    mealsPerDay: 2,
    notes: "Moderate protein needs (30-35%). Watch for obesity. Feed age-appropriate portions. Consider indoor cat formula.",
    imageUrl: "https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80"
  },
  {
    breed: "British Shorthair",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Prone to obesity - strict portion control. Moderate protein (30-35%). Consider weight management formulas. Monitor activity level.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  }
];
