
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
}

import { smallDogs } from "./dogs/small";
import { mediumDogs } from "./dogs/medium";
import { largeDogs } from "./dogs/large";
import { specialtyDogs } from "./dogs/specialty";
import { rareDogs } from "./dogs/rare";

// Adding additional dog breeds to each category
export const additionalSmallDogs: DogStandard[] = [
  {
    breed: "Norwich Terrier",
    size: "Small",
    dailyCalories: { min: 180, max: 350 },
    ageSpecificCalories: {
      puppy: { min: 250, max: 450 },
      adult: { min: 180, max: 350 },
      senior: { min: 150, max: 280 }
    },
    mealsPerDay: {
      puppy: 4,
      adult: 2,
      senior: 2
    },
    notes: "Active small breed that needs quality protein. Watch for dental issues.",
    nutritionNotes: {
      puppy: "High quality protein for muscle development. DHA for brain development. Four small meals to maintain blood sugar levels.",
      adult: "Needs high-quality protein with moderate fat content. Active breed requires more calories than typical small dogs.",
      senior: "Reduced calories but maintained protein levels to prevent muscle loss. Dental health becomes increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1589697547048-f201f0bca5cb?q=80"
  },
  {
    breed: "Cesky Terrier",
    size: "Small",
    dailyCalories: { min: 200, max: 380 },
    ageSpecificCalories: {
      puppy: { min: 280, max: 480 },
      adult: { min: 200, max: 380 },
      senior: { min: 170, max: 300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Less active than other terriers. Monitor weight closely.",
    nutritionNotes: {
      puppy: "Moderate growth rate requires balanced nutrition. Calcium-phosphorus ratio important for bone development.",
      adult: "Moderate protein and fat levels. Less active than many terriers, so portion control is important.",
      senior: "Joint support supplements beneficial. Lower calorie diet with maintained protein levels."
    },
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  },
  {
    breed: "Coton de Tulear",
    size: "Small",
    dailyCalories: { min: 210, max: 400 },
    ageSpecificCalories: {
      puppy: { min: 280, max: 480 },
      adult: { min: 210, max: 400 },
      senior: { min: 180, max: 320 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Coat health important. Moderate protein needs. Watch for food sensitivities.",
    nutritionNotes: {
      puppy: "DHA and EPA for coat and brain development. Multiple small meals prevent hypoglycemia.",
      adult: "Omega fatty acids for coat health. Moderate protein (26-30%) with quality animal sources.",
      senior: "Joint support increasingly important. Maintain protein quality while reducing calories."
    },
    imageUrl: "https://images.unsplash.com/photo-1580064755419-883acc42900b?q=80"
  },
  {
    breed: "Swedish Vallhund",
    size: "Small",
    dailyCalories: { min: 250, max: 450 },
    ageSpecificCalories: {
      puppy: { min: 320, max: 550 },
      adult: { min: 250, max: 450 },
      senior: { min: 200, max: 380 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active herding breed. Higher protein needs. Monitor joint health.",
    nutritionNotes: {
      puppy: "Higher protein (30-34%) for muscle development. DHA important for cognitive function. Watch growth rate.",
      adult: "Active lifestyle needs quality protein (28-32%). Athletic breed may need higher calories based on activity.",
      senior: "Joint supplements recommended. Maintain protein levels while moderately reducing calories."
    },
    imageUrl: "https://images.unsplash.com/photo-1567612529018-a8ed1fe4c338?q=80"
  },
  {
    breed: "Petit Basset Griffon Vendéen",
    size: "Small",
    dailyCalories: { min: 240, max: 460 },
    ageSpecificCalories: {
      puppy: { min: 320, max: 580 },
      adult: { min: 240, max: 460 },
      senior: { min: 200, max: 380 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active scent hound. Prone to weight gain when inactive. Quality protein needed.",
    nutritionNotes: {
      puppy: "Controlled growth important. Balanced calcium-phosphorus ratio for proper bone development.",
      adult: "Activity level varies greatly - adjust calories accordingly. Moderate protein (26-30%) with quality sources.",
      senior: "Weight management crucial. Lower fat but maintain protein quality. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80"
  }
];

export const additionalMediumDogs: DogStandard[] = [
  {
    breed: "Canaan Dog",
    size: "Medium",
    dailyCalories: { min: 740, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1400 },
      adult: { min: 740, max: 1200 },
      senior: { min: 650, max: 980 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Primitive breed with efficient metabolism. Moderate protein needs. Watch for food sensitivities.",
    nutritionNotes: {
      puppy: "Moderate growth rate - avoid overfeeding. Balanced nutrition without excessive supplements.",
      adult: "Natural diet with moderate protein (24-28%). Generally good food efficiency - watch portions.",
      senior: "Maintain lean muscle mass. Joint support increasingly important with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1583337426008-2fef51fdede2?q=80"
  },
  {
    breed: "Finnish Spitz",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    ageSpecificCalories: {
      puppy: { min: 880, max: 1300 },
      adult: { min: 700, max: 1100 },
      senior: { min: 620, max: 900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active hunting breed. Higher protein needs. Watch coat health.",
    nutritionNotes: {
      puppy: "DHA important for cognitive development. Moderate protein for steady growth.",
      adult: "Active lifestyle needs quality protein (26-30%). Omega fatty acids beneficial for coat health.",
      senior: "Maintain protein quality while slightly reducing calories. Monitor dental health."
    },
    imageUrl: "https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?q=80"
  },
  {
    breed: "Keeshond",
    size: "Medium",
    dailyCalories: { min: 750, max: 1150 },
    ageSpecificCalories: {
      puppy: { min: 900, max: 1350 },
      adult: { min: 750, max: 1150 },
      senior: { min: 650, max: 950 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Dense coat requires proper nutrition. Watch weight carefully. Moderate activity level.",
    nutritionNotes: {
      puppy: "Moderate growth rate ideal. Omega fatty acids important for coat development.",
      adult: "Moderate protein (24-28%) sufficient. Proper nutrients for coat health (biotin, zinc, omega fatty acids).",
      senior: "Weight management important. Lower calories while maintaining protein quality and coat support."
    },
    imageUrl: "https://images.unsplash.com/photo-1589697547048-f201f0bca5cb?q=80"
  },
  {
    breed: "Lancashire Heeler",
    size: "Medium",
    dailyCalories: { min: 650, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 800, max: 1200 },
      adult: { min: 650, max: 1000 },
      senior: { min: 580, max: 850 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working breed with moderate to high energy. Quality protein important.",
    nutritionNotes: {
      puppy: "Careful calorie monitoring to prevent rapid growth. DHA supports brain development.",
      adult: "Activity level can vary - adjust calories accordingly. Moderate to high protein (26-30%) recommended.",
      senior: "Joint support increasingly important. Maintain muscle mass with quality protein."
    },
    imageUrl: "https://images.unsplash.com/photo-1588269845464-8993565cac3a?q=80"
  },
  {
    breed: "Norwegian Lundehund",
    size: "Medium",
    dailyCalories: { min: 680, max: 1050 },
    ageSpecificCalories: {
      puppy: { min: 820, max: 1250 },
      adult: { min: 680, max: 1050 },
      senior: { min: 600, max: 880 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Prone to digestive issues. May need specialized diet. Monitor carefully.",
    nutritionNotes: {
      puppy: "Highly digestible proteins essential. Multiple small meals recommended.",
      adult: "Specialty diets often required. Highly digestible protein sources. May need low-fat options.",
      senior: "Digestive health remains priority. Specialized senior formula may be needed."
    },
    imageUrl: "https://images.unsplash.com/photo-1588269845464-8993565cac3a?q=80"
  }
];

export const additionalLargeDogs: DogStandard[] = [
  {
    breed: "Black Russian Terrier",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    ageSpecificCalories: {
      puppy: { min: 1800, max: 2500 },
      adult: { min: 1500, max: 2200 },
      senior: { min: 1300, max: 1900 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Large working breed. Slow maturation. Joint health critical. Moderate protein.",
    nutritionNotes: {
      puppy: "Very slow growth rate ideal. Extended puppy feeding (12-18 months). Carefully balanced calcium-phosphorus.",
      adult: "Moderate protein (24-28%) sufficient. Joint supplements beneficial. Monitor weight carefully.",
      senior: "Joint support essential. Moderate protein with quality sources to maintain muscle mass."
    },
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80"
  },
  {
    breed: "Dogo Argentino",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    ageSpecificCalories: {
      puppy: { min: 2000, max: 2800 },
      adult: { min: 1600, max: 2400 },
      senior: { min: 1400, max: 2000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Athletic working breed. High protein needs. Monitor joint development closely.",
    nutritionNotes: {
      puppy: "Controlled growth essential. High protein (30-34%) from quality sources. Avoid overfeeding.",
      adult: "Athletic breed needs quality protein (28-32%). May need higher calories based on activity level.",
      senior: "Maintain muscle mass with quality protein. Joint support increasingly important."
    },
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80"
  },
  {
    breed: "Leonberger",
    size: "Large",
    dailyCalories: { min: 1800, max: 2600 },
    ageSpecificCalories: {
      puppy: { min: 2200, max: 3000 },
      adult: { min: 1800, max: 2600 },
      senior: { min: 1500, max: 2200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Giant breed with slow development. Joint health critical. Moderate protein needs.",
    nutritionNotes: {
      puppy: "Very slow growth ideal. Extended puppy feeding (14-18 months). Carefully controlled calcium.",
      adult: "Large breed formula with joint support. Moderate protein (24-26%) from quality sources.",
      senior: "Joint support essential. Lower calories while maintaining adequate protein for muscle maintenance."
    },
    imageUrl: "https://images.unsplash.com/photo-1568393691066-9cccdbcbd89f?q=80"
  },
  {
    breed: "Tibetan Mastiff",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    ageSpecificCalories: {
      puppy: { min: 2100, max: 2900 },
      adult: { min: 1700, max: 2500 },
      senior: { min: 1400, max: 2100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 1,
      senior: 1
    },
    notes: "Ancient breed with efficient metabolism. Seasonal appetite changes. Joint health important.",
    nutritionNotes: {
      puppy: "Very slow development. Extended puppy feeding period (14-24 months). Control calcium intake.",
      adult: "Often does well with single daily feeding. Moderate protein (24-26%) sufficient. Seasonal appetite fluctuations normal.",
      senior: "Joint support essential. Maintain protein quality while reducing calories."
    },
    imageUrl: "https://images.unsplash.com/photo-1601880348117-25c1127a95df?q=80"
  },
  {
    breed: "Boerboel",
    size: "Large",
    dailyCalories: { min: 1800, max: 2700 },
    ageSpecificCalories: {
      puppy: { min: 2200, max: 3100 },
      adult: { min: 1800, max: 2700 },
      senior: { min: 1500, max: 2300 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working mastiff breed. Moderate protein needs. Joint health critical.",
    nutritionNotes: {
      puppy: "Slow controlled growth essential. Extended puppy feeding (12-18 months). Balance calcium-phosphorus carefully.",
      adult: "Moderate protein (24-28%) from quality sources. Weight management important to reduce joint stress.",
      senior: "Joint support essential. Maintain muscle mass with adequate protein while managing weight."
    },
    imageUrl: "https://images.unsplash.com/photo-1599420186946-7b6fb14d2dd9?q=80"
  }
];

export const additionalSpecialtyDogs: DogStandard[] = [
  {
    breed: "Xoloitzcuintli",
    size: "Specialty",
    dailyCalories: { min: 600, max: 1000 },
    ageSpecificCalories: {
      puppy: { min: 750, max: 1200 },
      adult: { min: 600, max: 1000 },
      senior: { min: 500, max: 850 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Hairless breed needs skin support. Moderate protein. Watch sunburn risk.",
    nutritionNotes: {
      puppy: "Omega fatty acids important for skin development. Protection from elements crucial.",
      adult: "Skin health supplements beneficial. Moderate protein (24-28%) with quality sources.",
      senior: "Continue skin support. Maintain protein quality while moderating calories."
    },
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442976d?q=80"
  },
  {
    breed: "Catahoula Leopard Dog",
    size: "Specialty",
    dailyCalories: { min: 1100, max: 1800 },
    ageSpecificCalories: {
      puppy: { min: 1350, max: 2100 },
      adult: { min: 1100, max: 1800 },
      senior: { min: 900, max: 1500 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Working breed with high energy. Quality protein essential. Monitor joint development.",
    nutritionNotes: {
      puppy: "Control growth rate. High-quality protein sources. Joint support from early age.",
      adult: "Active breed needs quality protein (26-30%). Calories vary with activity level.",
      senior: "Joint support crucial. Maintain muscle mass with adequate protein quality."
    },
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80"
  },
  {
    breed: "Thai Ridgeback",
    size: "Specialty",
    dailyCalories: { min: 900, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1800 },
      adult: { min: 900, max: 1500 },
      senior: { min: 750, max: 1250 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Primitive breed with efficient metabolism. Moderate protein needs.",
    nutritionNotes: {
      puppy: "Balanced nutrition without excessive supplements. Moderate growth rate ideal.",
      adult: "Natural diet with moderate protein (24-28%). Generally good food efficiency.",
      senior: "Maintain muscle mass. Slight calorie reduction with age."
    },
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80"
  },
  {
    breed: "Carolina Dog",
    size: "Specialty",
    dailyCalories: { min: 800, max: 1300 },
    ageSpecificCalories: {
      puppy: { min: 1000, max: 1600 },
      adult: { min: 800, max: 1300 },
      senior: { min: 700, max: 1100 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Primitive breed with natural foraging tendencies. Moderate protein needs.",
    nutritionNotes: {
      puppy: "Natural balanced diet. Avoid excessive supplements or overfeeding.",
      adult: "Moderate protein (24-28%) from quality sources. Often thrives on simple diet.",
      senior: "Maintain lean body condition. Adjust calories with activity level changes."
    },
    imageUrl: "https://images.unsplash.com/photo-1559190394-df34a5ed9fe4?q=80"
  },
  {
    breed: "Treeing Tennessee Brindle",
    size: "Specialty",
    dailyCalories: { min: 900, max: 1400 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1700 },
      adult: { min: 900, max: 1400 },
      senior: { min: 750, max: 1200 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active hunting breed. Higher protein needs. Watch joint development.",
    nutritionNotes: {
      puppy: "Quality protein for muscle development. Controlled growth rate ideal.",
      adult: "Active lifestyle needs quality protein (26-30%). Adjust calories with hunting activity.",
      senior: "Joint support beneficial. Maintain muscle mass with adequate protein."
    },
    imageUrl: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80"
  }
];

export const additionalRareDogs: DogStandard[] = [
  {
    breed: "Azawakh",
    size: "Rare",
    dailyCalories: { min: 900, max: 1500 },
    ageSpecificCalories: {
      puppy: { min: 1100, max: 1800 },
      adult: { min: 900, max: 1500 },
      senior: { min: 750, max: 1250 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Sighthound with efficient metabolism. Higher protein needs. Often lean body condition normal.",
    nutritionNotes: {
      puppy: "Higher protein (30-34%) for muscle development. Controlled growth important.",
      adult: "Quality protein (28-32%) essential. May need higher fat content. Naturally lean appearance normal.",
      senior: "Maintain muscle mass with continued quality protein. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1554196320-d25b2aca0628?q=80"
  },
  {
    breed: "Mudi",
    size: "Rare",
    dailyCalories: { min: 700, max: 1200 },
    ageSpecificCalories: {
      puppy: { min: 850, max: 1400 },
      adult: { min: 700, max: 1200 },
      senior: { min: 600, max: 1000 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Active herding breed. Moderate protein needs. Watch for food sensitivities.",
    nutritionNotes: {
      puppy: "DHA important for cognitive development. Moderate protein for steady growth.",
      adult: "Active lifestyle may require higher calories. Moderate protein (26-30%) sufficient.",
      senior: "Maintain activity levels with appropriate nutrition. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?q=80"
  },
  {
    breed: "Sloughi",
    size: "Rare",
    dailyCalories: { min: 950, max: 1600 },
    ageSpecificCalories: {
      puppy: { min: 1200, max: 1900 },
      adult: { min: 950, max: 1600 },
      senior: { min: 800, max: 1350 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Sighthound with efficient metabolism. Higher protein needs. Lean body condition normal.",
    nutritionNotes: {
      puppy: "Higher protein (30-34%) for muscle development. Controlled growth important.",
      adult: "Quality protein (28-32%) essential. May need higher fat content. Naturally lean appearance normal.",
      senior: "Maintain muscle mass with continued quality protein. Joint support beneficial."
    },
    imageUrl: "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80"
  },
  {
    breed: "Otterhound",
    size: "Rare",
    dailyCalories: { min: 1400, max: 2100 },
    ageSpecificCalories: {
      puppy: { min: 1700, max: 2400 },
      adult: { min: 1400, max: 2100 },
      senior: { min: 1200, max: 1800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Rare scent hound. Moderate protein needs. Watch coat condition.",
    nutritionNotes: {
      puppy: "Controlled growth rate ideal. Omega fatty acids for coat development.",
      adult: "Moderate protein (24-28%) sufficient. Proper nutrients for coat health (biotin, zinc, omega fatty acids).",
      senior: "Joint support increasingly important. Maintain coat health with appropriate nutrients."
    },
    imageUrl: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80"
  },
  {
    breed: "Cirneco dell'Etna",
    size: "Rare",
    dailyCalories: { min: 600, max: 950 },
    ageSpecificCalories: {
      puppy: { min: 750, max: 1150 },
      adult: { min: 600, max: 950 },
      senior: { min: 500, max: 800 }
    },
    mealsPerDay: {
      puppy: 3,
      adult: 2,
      senior: 2
    },
    notes: "Ancient sighthound with efficient metabolism. Moderate protein needs.",
    nutritionNotes: {
      puppy: "Balanced nutrition without excessive supplements. Moderate growth rate ideal.",
      adult: "Moderate protein (24-28%) sufficient. Naturally lean appearance normal.",
      senior: "Maintain muscle mass with quality protein. Adjust calories with activity changes."
    },
    imageUrl: "https://images.unsplash.com/photo-1559190394-df34a5ed9fe4?q=80"
  }
];

// Update the main arrays with the additional breeds
export const updatedSmallDogs = [...smallDogs, ...additionalSmallDogs];
export const updatedMediumDogs = [...mediumDogs, ...additionalMediumDogs];
export const updatedLargeDogs = [...largeDogs, ...additionalLargeDogs];
export const updatedSpecialtyDogs = [...specialtyDogs, ...additionalSpecialtyDogs];
export const updatedRareDogs = [...rareDogs, ...additionalRareDogs];

export const dogStandards: DogStandard[] = [
  ...updatedSmallDogs,
  ...updatedMediumDogs,
  ...updatedLargeDogs,
  ...updatedSpecialtyDogs,
  ...updatedRareDogs
];

// For convenience when querying the library by size
export const smallDogBreeds = updatedSmallDogs;
export const mediumDogBreeds = updatedMediumDogs;
export const largeDogBreeds = updatedLargeDogs;
export const specialtyDogBreeds = updatedSpecialtyDogs;
export const rareDogBreeds = updatedRareDogs;

// Utility function to get total count
export const getDogBreedCount = () => {
  return {
    small: updatedSmallDogs.length,
    medium: updatedMediumDogs.length,
    large: updatedLargeDogs.length,
    specialty: updatedSpecialtyDogs.length,
    rare: updatedRareDogs.length,
    total: dogStandards.length
  };
};
