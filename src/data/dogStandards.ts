
export interface DogStandard {
  breed: string;
  size: string;
  dailyCalories: {
    min: number;
    max: number;
  };
  ageSpecificCalories: {
    puppy: { min: number; max: number };
    adult: { min: number; max: number };
    senior: { min: number; max: number };
  };
  mealsPerDay: {
    puppy: number;
    adult: number;
    senior: number;
  };
  notes: string;
  nutritionNotes: {
    puppy: string;
    adult: string;
    senior: string;
  };
  imageUrl: string;
  source: string;
}

export const dogStandards: DogStandard[] = [
  {
    breed: "Labrador Retriever",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed, adjust based on activity level",
    nutritionNotes: {
      puppy: "Controlled growth is essential. Puppies need 22-24% protein and 8-12% fat. Feed puppy-specific large breed formula to prevent orthopedic issues.",
      adult: "Active adults need 22-26% protein. Consider joint supplements for active lifestyle. Monitor body condition score to prevent obesity.",
      senior: "Reduced calories needed after 7 years. Lower fat (10-12%) and moderate protein (22-24%) with glucosamine/chondroitin for joints."
    },
    imageUrl: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "German Shepherd",
    size: "Large",
    dailyCalories: { min: 1700, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2400 },
      senior: { min: 1400, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed, needs protein-rich diet",
    nutritionNotes: {
      puppy: "Calcium-phosphorus ratio critical (1.2:1). Moderate growth formula with 22-24% protein. Monitor growth rate to prevent joint issues.",
      adult: "Higher protein (26-28%) for muscle maintenance. Consider multiple smaller meals to prevent bloat. DHA supplementation beneficial.",
      senior: "Joint support essential after 7 years. Moderate protein (24%) and lower phosphorus levels for kidney health. Antioxidants for cognitive support."
    },
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
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
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442b31b?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
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
    imageUrl: "https://images.unsplash.com/photo-1615233500147-01f005438a44?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Golden Retriever",
    size: "Large",
    dailyCalories: { min: 1300, max: 2100 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2400 },
      adult: { min: 1300, max: 2100 },
      senior: { min: 1100, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Adjust based on age and activity",
    nutritionNotes: {
      puppy: "Controlled growth essential with large breed puppy formula. Moderate protein (22-24%) and balanced calcium-phosphorus ratio.",
      adult: "Prone to food allergies - watch for skin issues. Omega-3 fatty acids beneficial (EPA/DHA). Moderate protein (22-24%) sufficient.",
      senior: "Cancer-preventative antioxidants recommended after 7 years. Glucosamine/chondroitin for joints. Lower calorie density to prevent weight gain."
    },
    imageUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Poodle (Standard)",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1500 },
      senior: { min: 800, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Highly active, needs balanced nutrition",
    nutritionNotes: {
      puppy: "Rapid growth phase, needs high-quality protein (25-28%) and balanced calcium-phosphorus ratio. Monitor for proper weight gain.",
      adult: "Active breed, needs balanced nutrition with moderate protein (23-26%). Consider coat maintenance needs with omega fatty acids.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor dental health and adjust food texture if needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
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
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Bulldog",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1300 },
      adult: { min: 800, max: 1200 },
      senior: { min: 650, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to weight gain, monitor carefully",
    nutritionNotes: {
      puppy: "Brachycephalic breed, needs small kibble size and elevated feeding position. Moderate protein (24-26%) for controlled growth.",
      adult: "Respiratory-friendly kibble shape, lower fat content (10-14%) to prevent obesity. Joint supplements recommended from early adulthood.",
      senior: "Significant calorie reduction after 7 years, elevated feeding position helpful. Consider mobility supplements and digestive enzymes."
    },
    imageUrl: "https://images.unsplash.com/photo-1521907236370-15e7b9f7e13a?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
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
    imageUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Siberian Husky",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    ageSpecificCalories: {
      puppy: { min: 1600, max: 2200 },
      adult: { min: 1400, max: 2000 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy needs, especially in cold weather",
    nutritionNotes: {
      puppy: "Rapid growth, needs high-quality protein (25-28%) and balanced calcium-phosphorus ratio. Monitor for proper weight gain.",
      adult: "High energy needs, especially in cold weather. Adjust food intake based on activity level. Consider joint supplements for active dogs.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Rottweiler",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 2800 },
      adult: { min: 1800, max: 2500 },
      senior: { min: 1500, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Requires high protein diet, prone to weight gain if inactive",
    nutritionNotes: {
      puppy: "Controlled growth is essential, feed large breed puppy formula with moderate protein (22-24%) and balanced calcium-phosphorus ratio.",
      adult: "Requires high protein diet (26-28%) for muscle maintenance. Consider multiple smaller meals to prevent bloat.",
      senior: "Joint support essential after 7 years, moderate protein (24%) and lower phosphorus levels for kidney health. Antioxidants for cognitive support."
    },
    imageUrl: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
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
    imageUrl: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Border Collie",
    size: "Medium",
    dailyCalories: { min: 900, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1600 },
      adult: { min: 900, max: 1400 },
      senior: { min: 750, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Very active breed, may need more calories if working",
    nutritionNotes: {
      puppy: "High energy breed, needs quality protein (25-28%) and balanced nutrition for proper growth.",
      adult: "Adjust calories based on herding/working activity. Consider cognitive support supplements for active minds.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Great Dane",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    ageSpecificCalories: {
      puppy: { min: 2200, max: 3200 },
      adult: { min: 2000, max: 3000 },
      senior: { min: 1700, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Multiple smaller meals recommended to prevent bloat",
    nutritionNotes: {
      puppy: "Critical to prevent rapid growth in puppies, feed large breed puppy formula with moderate protein (23-26%) and controlled calcium intake.",
      adult: "Moderate protein (23-26%) recommended, feed elevated to prevent bloat. Monitor calcium levels for proper muscle function.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
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
    imageUrl: "https://images.unsplash.com/photo-1587583530933-ed5d3485d220?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Australian Shepherd",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1800 },
      adult: { min: 1000, max: 1600 },
      senior: { min: 850, max: 1400 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "High energy breed, adjust based on activity level",
    nutritionNotes: {
      puppy: "High protein needs (25-30%) for working dogs, adjust based on herding activity. Consider joint supplements.",
      adult: "Adjust based on herding activity, consider joint supplements. Monitor weight closely.",
      senior: "Lower calorie needs, moderate protein (22-24%) with joint support supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Saint Bernard",
    size: "Large",
    dailyCalories: { min: 1800, max: 2800 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 3000 },
      adult: { min: 1800, max: 2800 },
      senior: { min: 1500, max: 2500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Watch for rapid growth in puppies",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, moderate protein (23-25%). Risk of bloat - avoid exercise after meals. Joint health supplements recommended.",
      adult: "Moderate protein (23-25%), risk of bloat - avoid exercise after meals. Joint health supplements recommended.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1592754888953-4cc99c0b4d3f?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
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
    imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Boxer",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2400 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1300, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed, needs protein-rich diet",
    nutritionNotes: {
      puppy: "High protein requirements (25-30%), consider heart health supplements. Watch for food sensitivities.",
      adult: "Athletic breed, needs protein-rich diet (25-30%), consider heart health supplements. Watch for food sensitivities.",
      senior: "Athletic breed, needs protein-rich diet (25-30%), consider heart health supplements. Watch for food sensitivities."
    },
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Shetland Sheepdog",
    size: "Medium",
    dailyCalories: { min: 600, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 700, max: 1100 },
      adult: { min: 600, max: 1000 },
      senior: { min: 500, max: 800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active breed with moderate caloric needs",
    nutritionNotes: {
      puppy: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition.",
      adult: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition.",
      senior: "Monitor thyroid function, adjust calories accordingly. Quality protein (23-25%) needed. Consider coat maintenance in nutrition."
    },
    imageUrl: "https://images.unsplash.com/photo-1589210043112-f9be45206827?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
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
    imageUrl: "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Doberman Pinscher",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2600 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic breed, needs balanced protein and fat",
    nutritionNotes: {
      puppy: "High protein needs (25-30%), consider taurine supplementation for heart health. Watch for food allergies.",
      adult: "Athletic breed, needs balanced protein and fat (25-30%), consider taurine supplementation for heart health. Watch for food allergies.",
      senior: "Athletic breed, needs balanced protein and fat (25-30%), consider taurine supplementation for heart health. Watch for food allergies."
    },
    imageUrl: "https://images.unsplash.com/photo-1595792463990-93d4dec2dfc8?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
  },
  {
    breed: "Cavalier King Charles Spaniel",
    size: "Small",
    dailyCalories: { min: 400, max: 650 },
    ageSpecificCalories: {
      puppy: { min: 500, max: 750 },
      adult: { min: 400, max: 650 },
      senior: { min: 350, max: 550 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Moderate energy needs, watch for weight gain",
    nutritionNotes: {
      puppy: "Heart-healthy diet recommended, moderate protein (22-25%). Watch for obesity.",
      adult: "Heart-healthy diet recommended, moderate protein (22-25%). Watch for obesity.",
      senior: "Heart-healthy diet recommended, moderate protein (22-25%). Watch for obesity."
    },
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  },
  {
    breed: "Bernese Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 1900, max: 2700 },
      adult: { min: 1700, max: 2500 },
      senior: { min: 1400, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large breed, careful feeding during growth",
    nutritionNotes: {
      puppy: "Control growth rate in puppies, joint health supplements recommended. Moderate protein (23-26%).",
      adult: "Joint health supplements recommended. Moderate protein (23-26%). Watch for bloat - feed smaller meals.",
      senior: "Joint support essential, moderate protein (22-24%) with joint supplements. Monitor weight and adjust food intake accordingly."
    },
    imageUrl: "https://images.unsplash.com/photo-1582828470841-f822d98dc4b1?q=80",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)"
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
    imageUrl: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?q=80",
    source: "American College of Veterinary Nutrition (ACVN)"
  }
];
