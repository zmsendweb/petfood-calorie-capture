
export interface ShowDogBreed {
  name: string;
  size: "Small" | "Medium" | "Large";
  group: string;
  origin: string;
  temperament: string;
  showStandards: string;
  popularityRank: number;
}

export interface ShowCatBreed {
  name: string;
  size: "Small" | "Medium" | "Large";
  coatType: string;
  origin: string;
  temperament: string;
  showStandards: string;
  popularityRank: number;
}

export const showDogBreeds: ShowDogBreed[] = [
  {
    name: "Golden Retriever",
    size: "Large",
    group: "Sporting",
    origin: "Scotland",
    temperament: "Friendly, Intelligent, Devoted",
    showStandards: "Well-balanced, medium to large size. Coat should be rich, lustrous golden. Head broad, eyes dark and friendly.",
    popularityRank: 1
  },
  {
    name: "German Shepherd",
    size: "Large",
    group: "Herding",
    origin: "Germany",
    temperament: "Confident, Courageous, Smart",
    showStandards: "Noble, large, well-muscled. Double coat with dense outer coat. Erect ears, intelligent expression.",
    popularityRank: 2
  },
  {
    name: "French Bulldog",
    size: "Small",
    group: "Non-Sporting",
    origin: "France",
    temperament: "Adaptable, Playful, Smart",
    showStandards: "Compact, muscular build. Bat ears, flat face. Smooth, brilliant coat in various colors.",
    popularityRank: 3
  },
  {
    name: "Labrador Retriever",
    size: "Large",
    group: "Sporting",
    origin: "Canada",
    temperament: "Friendly, Active, Outgoing",
    showStandards: "Well-balanced, medium to large. Short, dense, water-repellent coat. Kind, friendly eyes.",
    popularityRank: 4
  },
  {
    name: "Poodle (Standard)",
    size: "Large",
    group: "Non-Sporting",
    origin: "Germany/France",
    temperament: "Active, Alert, Intelligent",
    showStandards: "Elegant, well-proportioned. Curly, dense coat. Proud carriage, intelligent expression.",
    popularityRank: 5
  },
  // Adding more breeds to reach 50...
  {
    name: "Border Collie",
    size: "Medium",
    group: "Herding",
    origin: "Scotland",
    temperament: "Smart, Work-oriented, Energetic",
    showStandards: "Athletic, medium-sized. Double coat of moderate length. Alert expression, keen intelligence.",
    popularityRank: 6
  },
  {
    name: "Rottweiler",
    size: "Large",
    group: "Working",
    origin: "Germany",
    temperament: "Loyal, Loving, Confident",
    showStandards: "Robust, powerful build. Black with rust markings. Calm, confident, fearless expression.",
    popularityRank: 7
  },
  {
    name: "Yorkshire Terrier",
    size: "Small",
    group: "Toy",
    origin: "England",
    temperament: "Affectionate, Sprightly, Tomboyish",
    showStandards: "Compact, toy-sized. Long, silky coat parted down the middle. Alert, intelligent expression.",
    popularityRank: 8
  },
  {
    name: "Australian Shepherd",
    size: "Medium",
    group: "Herding",
    origin: "United States",
    temperament: "Smart, Work-oriented, Exuberant",
    showStandards: "Well-balanced, medium size. Double coat of moderate length. Triangular ears, alert expression.",
    popularityRank: 9
  },
  {
    name: "Siberian Husky",
    size: "Large",
    group: "Working",
    origin: "Siberia",
    temperament: "Loyal, Outgoing, Mischievous",
    showStandards: "Medium-sized working dog. Double coat, erect triangular ears. Keen but friendly expression.",
    popularityRank: 10
  }
  // ... continue with more breeds to reach 50
];

export const showCatBreeds: ShowCatBreed[] = [
  {
    name: "Persian",
    size: "Medium",
    coatType: "Longhair",
    origin: "Iran",
    temperament: "Quiet, Sweet, Gentle",
    showStandards: "Cobby body, flat face, long flowing coat. Large round eyes, small ears set wide apart.",
    popularityRank: 1
  },
  {
    name: "Maine Coon",
    size: "Large",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Gentle, Friendly, Intelligent",
    showStandards: "Large, sturdy build. Shaggy coat, tufted ears and paws. Square muzzle, large expressive eyes.",
    popularityRank: 2
  },
  {
    name: "Siamese",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Thailand",
    temperament: "Active, Affectionate, Vocal",
    showStandards: "Svelte body, wedge-shaped head. Color-point pattern, deep blue almond eyes.",
    popularityRank: 3
  },
  {
    name: "British Shorthair",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United Kingdom",
    temperament: "Calm, Easy-going, Affectionate",
    showStandards: "Compact, well-balanced build. Dense, plush coat. Round face with full cheeks, large round eyes.",
    popularityRank: 4
  },
  {
    name: "Ragdoll",
    size: "Large",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Docile, Placid, Affectionate",
    showStandards: "Large, muscular body. Semi-long coat, blue eyes. Color-point pattern with white markings.",
    popularityRank: 5
  },
  {
    name: "Scottish Fold",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Scotland",
    temperament: "Sweet, Charming, Adaptable",
    showStandards: "Medium build, folded ears. Round head, large round eyes. Sweet, open expression.",
    popularityRank: 6
  },
  {
    name: "Abyssinian",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Ethiopia",
    temperament: "Active, Intelligent, Playful",
    showStandards: "Medium-sized, muscular. Ticked coat pattern. Wedge-shaped head, large alert ears.",
    popularityRank: 7
  },
  {
    name: "Russian Blue",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Russia",
    temperament: "Gentle, Quiet, Intelligent",
    showStandards: "Medium build, blue-gray coat. Green eyes, sweet facial expression. Double coat with silver tips.",
    popularityRank: 8
  },
  {
    name: "Bengal",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Active, Intelligent, Curious",
    showStandards: "Athletic build, wild appearance. Spotted or marbled pattern. Broad nose, prominent whisker pads.",
    popularityRank: 9
  },
  {
    name: "Norwegian Forest Cat",
    size: "Large",
    coatType: "Longhair",
    origin: "Norway",
    temperament: "Gentle, Friendly, Independent",
    showStandards: "Large, strong build. Water-resistant double coat. Triangular head, large ears with lynx tips.",
    popularityRank: 10
  }
  // ... continue with more breeds to reach 50
];
