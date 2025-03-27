
import { CatStandard } from "../../types/catTypes";

export const modernMediumBreeds: CatStandard[] = [
  {
    breed: "Bengal",
    size: "Medium",
    dailyCalories: { min: 250, max: 400 },
    ageSpecificCalories: {
      kitten: { min: 280, max: 450 },
      adult: { min: 250, max: 400 },
      senior: { min: 220, max: 350 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed needs quality protein (35-40%). May prefer running water with meals. Consider enrichment during feeding. Watch for food allergies.",
    nutritionNotes: {
      kitten: "Rapid development requires high protein (38-42%). Extended kitten formula (14-16 months). Multiple meals support high energy needs.",
      adult: "Extremely active breed - higher calories than most cats. Very high protein (35-40%) maintains muscle. Consider feeding puzzles for enrichment.",
      senior: "Aging begins later (8-10 years). Maintain higher protein (32-36%) than most senior cats. Mental stimulation through feeding remains important."
    },
    imageUrl: "https://images.unsplash.com/photo-1682180193588-a4e41b4d5cc1?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Oriental Shorthair",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 360 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 3
    },
    notes: "High energy needs - quality protein (35%). Watch for food sensitivity. Consider breed-specific formulas. Monitor hydration.",
    nutritionNotes: {
      kitten: "Similar to Siamese needs - high protein (38-40%). Frequent small meals prevent hypoglycemia. DHA supports brain development.",
      adult: "Higher metabolism than average cats. High protein (35-38%) maintains lean muscle. Dental care critical through appropriate diet.",
      senior: "Prone to dental issues with age. Moderate protein (30-35%) with quality sources. May need softer food options in later years."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Tonkinese",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Balance of Siamese and Burmese needs. Quality protein (32-37%). Watch for dental issues. Consider breed-specific formulas.",
    nutritionNotes: {
      kitten: "Balanced development needs with medium growth rate. Quality protein (36-38%) supports proper development. Monitor for food sensitivities.",
      adult: "Moderate energy needs between Siamese and Burmese. Quality protein (32-37%) for muscle maintenance. Dental support important.",
      senior: "Moderate protein (30-34%) from quality sources. Watch for dental issues with age. Balanced nutrition with antioxidant support."
    },
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Egyptian Mau",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed needs quality protein (33-38%). Consider activity level in portions. Watch for food sensitivities. Monitor muscle condition.",
    nutritionNotes: {
      kitten: "Athletic breed development requires quality nutrition. High protein (36-38%) supports muscle development. Multiple small meals beneficial.",
      adult: "Very athletic breed needs quality protein (33-38%). Adjust calories based on activity level. Consider muscle maintenance supplements.",
      senior: "Maintain muscle mass with quality protein (30-34%). Joint support increasingly important with age. Watch for food sensitivities."
    },
    imageUrl: "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Havana Brown",
    size: "Medium",
    dailyCalories: { min: 210, max: 310 },
    ageSpecificCalories: {
      kitten: { min: 240, max: 340 },
      adult: { min: 210, max: 310 },
      senior: { min: 190, max: 280 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Quality protein (32-37%) needed. Watch for dental issues. Consider breed-specific formulas. Monitor weight carefully.",
    nutritionNotes: {
      kitten: "Balanced development with moderate growth rate. Quality protein (34-36%) supports proper development. Monitor dental development.",
      adult: "Moderate energy needs but quality nutrition essential. Protein (32-37%) maintains lean muscle. Dental health support critical.",
      senior: "Moderate protein (30-34%) from quality sources. Watch for dental issues with age. Weight management increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Serengeti",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed needs quality protein (33-38%). Consider activity level in portions. Watch for food allergies. Monitor weight.",
    nutritionNotes: {
      kitten: "Rapid development in this hybrid breed. High protein (36-38%) supports proper growth. Monitor for food sensitivities early.",
      adult: "Active breed with high muscle mass. Quality protein (33-38%) maintains athletic condition. Consider enrichment during feeding.",
      senior: "Maintain muscle mass with quality protein (30-34%). Activity may remain high into senior years. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Toyger",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Bengal variant needs quality protein (33-38%). Consider muscle maintenance. Watch for food allergies. Monitor coat condition.",
    nutritionNotes: {
      kitten: "Similar to Bengal with high energy needs. Quality protein (36-38%) supports proper development. Monitor coat development.",
      adult: "Active breed with distinctive coat. Quality protein (33-38%) maintains muscle and coat health. Enrichment during feeding beneficial.",
      senior: "Maintain muscle mass with quality protein (30-34%). May remain active into senior years. Coat support supplements beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Australian Mist",
    size: "Medium",
    dailyCalories: { min: 200, max: 300 },
    ageSpecificCalories: {
      kitten: { min: 230, max: 330 },
      adult: { min: 200, max: 300 },
      senior: { min: 180, max: 270 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate energy breed needs quality protein (30-35%). Consider indoor formula. Watch for weight gain. Monitor portion sizes.",
    nutritionNotes: {
      kitten: "Moderate growth with balanced development. Quality protein (34-36%) supports proper development. Monitor for food sensitivities.",
      adult: "Moderate energy needs for this adaptable breed. Quality protein (30-35%) maintains ideal condition. Weight management important.",
      senior: "Moderate protein (28-32%) from quality sources. Weight management increasingly important with age. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "California Spangled",
    size: "Medium",
    dailyCalories: { min: 220, max: 320 },
    ageSpecificCalories: {
      kitten: { min: 250, max: 350 },
      adult: { min: 220, max: 320 },
      senior: { min: 200, max: 290 }
    },
    mealsPerDay: 2,
    mealsByAge: {
      kitten: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed needs quality protein (33-38%). Consider muscle maintenance. Watch for food allergies. Monitor activity level.",
    nutritionNotes: {
      kitten: "Athletic breed development needs quality nutrition. High protein (36-38%) supports muscle development. Monitor for food sensitivities.",
      adult: "Active breed with spotted coat pattern. Quality protein (33-38%) maintains muscle tone and coat health. Monitor weight carefully.",
      senior: "Maintain muscle mass with quality protein (30-34%). Activity level may decrease with age. Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  }
];
