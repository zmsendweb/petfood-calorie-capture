
import { NutritionInfo } from "./types.ts";

// Define our nutrition information array
export const nutritionInfo: NutritionInfo[] = [
  // Cat nutrition information
  {
    id: 1,
    title: "Cat Nutritional Requirements",
    content: "Cats are obligate carnivores that require high protein diets (30-40% on a dry matter basis). They need specific nutrients like taurine, arachidonic acid, vitamin A, and niacin that must come from animal sources. Recommended daily calorie intake varies by size, activity level, and age.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 2,
    title: "Feeding Small Cat Breeds",
    content: "Small cat breeds like Devon Rex and Singapura have higher metabolic rates and require more calories per pound than larger breeds. They benefit from multiple small meals throughout the day with calorie-dense foods to maintain healthy weight and energy levels.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  {
    id: 3,
    title: "Feeding Medium Cat Breeds",
    content: "Medium cat breeds like Persian, Siamese, and British Shorthair need balanced nutrition with moderate protein (30-35%) and careful portion control to prevent obesity. Some breeds have special considerations like face shape (Persians) or higher metabolism (Siamese).",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 4,
    title: "Feeding Large Cat Breeds",
    content: "Large cat breeds like Maine Coon and Ragdoll require joint-supporting nutrients and higher protein levels (35-40%) to maintain muscle mass. Daily calorie needs range from 240-420 calories depending on activity level and specific breed characteristics.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  {
    id: 5,
    title: "Special Dietary Considerations for Cats",
    content: "Hairless breeds like Sphynx have higher energy requirements due to heat loss. Breeds with known genetic predispositions (e.g., Burmese diabetes risk) may benefit from specialized diets. Always consult with a veterinary nutritionist for breed-specific recommendations.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 6,
    title: "Life Stage Nutrition for Cats",
    content: "Nutritional needs change throughout a cat's life. Kittens need higher protein and calories for growth. Adult cats need maintenance diets, while senior cats often benefit from moderate protein, lower phosphorus, and anti-inflammatory nutrients to support aging joints and kidneys.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  {
    id: 7,
    title: "Indoor vs Outdoor Cat Nutrition",
    content: "Indoor cats are more prone to obesity and may need fewer calories and more fiber than outdoor cats. Outdoor cats typically have higher energy requirements but may also benefit from antioxidants to support immune health from environmental exposures.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 8,
    title: "Wet vs Dry Food for Cats",
    content: "Wet food provides hydration and is often higher in protein and lower in carbohydrates. Dry food can help with dental health and is more convenient. Many veterinary nutritionists recommend a combination of both to balance benefits, especially for breeds prone to urinary issues.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  
  // Dog nutrition information
  {
    id: 9,
    title: "Dog Nutritional Requirements",
    content: "Dogs are omnivores requiring balanced nutrition with moderate protein (18-25% on dry matter basis). Unlike cats, they can synthesize taurine and vitamin A. Their nutritional needs vary significantly based on age, breed size, activity level, and health status.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 10,
    title: "Feeding Small Dog Breeds",
    content: "Small breeds like Chihuahuas and Yorkies have faster metabolisms and require more calories per pound than larger breeds. They benefit from energy-dense, small kibble formulas fed in 3-4 small meals daily to prevent hypoglycemia and support their higher energy needs.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  },
  {
    id: 11,
    title: "Feeding Medium Dog Breeds",
    content: "Medium breeds like Beagles and Border Collies need balanced nutrition with appropriate protein (21-25%) and careful portion control to prevent obesity. Their active lifestyles often require formulas that support joint health and sustained energy levels.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 12,
    title: "Feeding Large Dog Breeds",
    content: "Large breeds like Labradors and German Shepherds need controlled growth in puppyhood to prevent orthopedic issues. Adult maintenance requires moderate protein (22-26%), joint-supporting nutrients, and measured portions to prevent bloat and obesity.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  },
  {
    id: 13,
    title: "Special Dietary Considerations for Dogs",
    content: "Brachycephalic breeds (e.g., Bulldogs) benefit from elevated feeding positions and kibble shapes that reduce respiratory stress. Working breeds need higher calories and protein, while prone-to-obesity breeds require strict portion control and lower-calorie formulas.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 14,
    title: "Life Stage Nutrition for Dogs",
    content: "Puppies need higher protein, fat, and minerals for growth (large breeds need controlled growth). Adult dogs require maintenance formulas based on activity level. Senior dogs often benefit from moderate protein, joint supplements, and lower phosphorus levels.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  },
  {
    id: 15,
    title: "Dog Food Allergies and Sensitivities",
    content: "Common food allergens for dogs include beef, dairy, chicken, and wheat. Limited ingredient diets using novel proteins (e.g., venison, duck) and carbohydrates (e.g., sweet potato) can help identify and manage food sensitivities that manifest as skin or digestive issues.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 16,
    title: "Grain-Free Diets for Dogs",
    content: "The FDA has identified potential links between grain-free diets and dilated cardiomyopathy in dogs. Unless medically necessary, most dogs benefit from balanced diets containing whole grains that provide essential nutrients and fiber for gut health.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  }
];
