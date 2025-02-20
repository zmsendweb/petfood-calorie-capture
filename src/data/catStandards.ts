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
  },
  {
    breed: "Sphynx",
    size: "Medium",
    dailyCalories: { min: 230, max: 350 },
    mealsPerDay: 3,
    notes: "Higher caloric needs due to lack of fur. High protein (35-40%) required. Consider skin health supplements. Frequent small meals recommended.",
    imageUrl: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80"
  },
  {
    breed: "Bengal",
    size: "Medium",
    dailyCalories: { min: 250, max: 400 },
    mealsPerDay: 2,
    notes: "High energy breed needs quality protein (35-40%). May prefer running water with meals. Consider enrichment during feeding. Watch for food allergies.",
    imageUrl: "https://images.unsplash.com/photo-1682180193588-a4e41b4d5cc1?q=80"
  },
  {
    breed: "Russian Blue",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Moderate protein needs (30-35%). Watch for obesity. Consider hypoallergenic formulas. Monitor portion sizes carefully.",
    imageUrl: "https://images.unsplash.com/photo-1638867911609-b17304c4cd96?q=80"
  },
  {
    breed: "Norwegian Forest Cat",
    size: "Large",
    dailyCalories: { min: 280, max: 420 },
    mealsPerDay: 2,
    notes: "Large breed needs joint support. High protein (35-40%) for coat maintenance. Consider omega fatty acids. Watch growth rate in kittens.",
    imageUrl: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80"
  },
  {
    breed: "Abyssinian",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Active breed needs quality protein (33-38%). Small, frequent meals may benefit. Monitor weight due to high activity. Consider dental health.",
    imageUrl: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80"
  },
  {
    breed: "Scottish Fold",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Joint health supplements recommended. Moderate protein (30-35%). Watch for obesity. Consider cartilage support in diet.",
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80"
  },
  {
    breed: "Devon Rex",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    mealsPerDay: 3,
    notes: "High metabolism - needs calorie-dense food. Quality protein (33-38%). Consider skin health supplements. Monitor temperature during meals.",
    imageUrl: "https://images.unsplash.com/photo-1576280314498-31e7c48361c9?q=80"
  },
  {
    breed: "Oriental Shorthair",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "High energy needs - quality protein (35%). Watch for food sensitivity. Consider breed-specific formulas. Monitor hydration.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Turkish Van",
    size: "Large",
    dailyCalories: { min: 250, max: 380 },
    mealsPerDay: 2,
    notes: "Late maturity - adjust portions with age. High protein (33-38%). Consider swimming activity in calorie needs. Monitor growth rate.",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80"
  },
  {
    breed: "American Shorthair",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Moderate protein needs (30-35%). Watch for obesity in indoor cats. Consider dental health. Consistent feeding schedule important.",
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80"
  },
  {
    breed: "Japanese Bobtail",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Active breed needs quality protein (32-37%). Consider joint health. Watch for food allergies. Monitor activity level for portions.",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "Tonkinese",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Balance of Siamese and Burmese needs. Quality protein (32-37%). Watch for dental issues. Consider breed-specific formulas.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  },
  {
    breed: "Birman",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Sacred cat of Burma needs quality protein (30-35%). Consider coat health supplements. Watch for obesity. Monitor kidney health.",
    imageUrl: "https://images.unsplash.com/photo-1586289883499-f11d28425e23?q=80"
  },
  {
    breed: "Burmese",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Prone to obesity - strict portion control. Moderate protein (30-35%). Consider dental health. Monitor blood sugar levels.",
    imageUrl: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80"
  },
  {
    breed: "Cornish Rex",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    mealsPerDay: 3,
    notes: "High metabolism needs calorie-dense food. Quality protein (33-38%). Consider skin supplements. Monitor body temperature.",
    imageUrl: "https://images.unsplash.com/photo-1577590835286-1cdd24c08fd5?q=80"
  },
  {
    breed: "Egyptian Mau",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Athletic breed needs quality protein (33-38%). Consider activity level in portions. Watch for food sensitivities. Monitor muscle condition.",
    imageUrl: "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?q=80"
  },
  {
    breed: "Exotic Shorthair",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Similar to Persian needs. Moderate protein (30-35%). Consider respiratory needs in kibble size. Watch for obesity.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  },
  {
    breed: "Havana Brown",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Quality protein (32-37%) needed. Watch for dental issues. Consider breed-specific formulas. Monitor weight carefully.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Korat",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Ancient breed needs quality protein (30-35%). Consider heart health supplements. Watch for food allergies. Monitor silver coat condition.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "LaPerm",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Curly coat needs quality protein (32-37%). Consider coat health supplements. Watch for hairballs. Monitor hydration.",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80"
  },
  {
    breed: "Manx",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Watch spine health - quality protein (30-35%). Consider joint supplements. Monitor digestion. Adjust portions for activity.",
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80"
  },
  {
    breed: "Munchkin",
    size: "Small",
    dailyCalories: { min: 180, max: 280 },
    mealsPerDay: 2,
    notes: "Short legs need joint support. Moderate protein (30-35%). Consider mobility in feeding setup. Watch weight carefully.",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80"
  },
  {
    breed: "Nebelung",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Russian Blue variant needs quality protein (32-37%). Consider coat health supplements. Watch for anxiety during meals.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  },
  {
    breed: "Ocicat",
    size: "Large",
    dailyCalories: { min: 250, max: 380 },
    mealsPerDay: 2,
    notes: "Athletic breed needs high protein (35-40%). Consider muscle maintenance. Watch for food allergies. Monitor activity level.",
    imageUrl: "https://images.unsplash.com/photo-1586289883499-f11d28425e23?q=80"
  },
  {
    breed: "RagaMuffin",
    size: "Large",
    dailyCalories: { min: 240, max: 360 },
    mealsPerDay: 2,
    notes: "Similar to Ragdoll needs. Moderate protein (30-35%). Watch for obesity. Consider joint health. Monitor portion sizes.",
    imageUrl: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80"
  },
  {
    breed: "Selkirk Rex",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Curly coat needs quality protein (32-37%). Consider skin health. Watch for matting issues. Monitor hydration.",
    imageUrl: "https://images.unsplash.com/photo-1577590835286-1cdd24c08fd5?q=80"
  },
  {
    breed: "Singapura",
    size: "Small",
    dailyCalories: { min: 170, max: 270 },
    mealsPerDay: 3,
    notes: "Smallest breed needs concentrated nutrition. Quality protein (33-38%). Consider small portions. Monitor blood sugar.",
    imageUrl: "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?q=80"
  },
  {
    breed: "Snowshoe",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    mealsPerDay: 2,
    notes: "Siamese variant needs quality protein (32-37%). Consider point coloration in diet. Watch for obesity. Monitor kidney health.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80"
  },
  {
    breed: "Somali",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Active breed needs quality protein (33-38%). Long hair needs dietary support. Watch for dental issues. Monitor activity level.",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80"
  },
  {
    breed: "Toyger",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    mealsPerDay: 2,
    notes: "Bengal variant needs quality protein (33-38%). Consider muscle maintenance. Watch for food allergies. Monitor coat condition.",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80"
  },
  {
    breed: "Turkish Angora",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    mealsPerDay: 2,
    notes: "Ancient breed needs quality protein (32-37%). Consider coat health. Watch for deafness-related feeding issues. Monitor heart health.",
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80"
  }
];
