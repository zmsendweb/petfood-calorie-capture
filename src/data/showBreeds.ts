
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
  },
  {
    name: "Bulldog",
    size: "Medium",
    group: "Non-Sporting",
    origin: "England",
    temperament: "Docile, Willful, Friendly",
    showStandards: "Thick-set, low-swung body. Massive head, short face. Smooth coat, distinctive rolling gait.",
    popularityRank: 11
  },
  {
    name: "Beagle",
    size: "Medium",
    group: "Hound",
    origin: "England",
    temperament: "Amiable, Determined, Excitable",
    showStandards: "Sturdy, compact hound. Short, easy-care coat. Large brown or hazel eyes, gentle expression.",
    popularityRank: 12
  },
  {
    name: "Boxer",
    size: "Large",
    group: "Working",
    origin: "Germany",
    temperament: "Bright, Fun-loving, Active",
    showStandards: "Medium-sized, square build. Short, tight-fitting coat. Dark eyes, alert expression.",
    popularityRank: 13
  },
  {
    name: "Dachshund",
    size: "Small",
    group: "Hound",
    origin: "Germany",
    temperament: "Curious, Friendly, Spunky",
    showStandards: "Long, low body. Three coat varieties. Confident carriage, intelligent expression.",
    popularityRank: 14
  },
  {
    name: "Great Dane",
    size: "Large",
    group: "Working",
    origin: "Germany",
    temperament: "Friendly, Patient, Dependable",
    showStandards: "Giant size, elegant appearance. Short, thick coat. Rectangular head, kind expression.",
    popularityRank: 15
  },
  {
    name: "Pembroke Welsh Corgi",
    size: "Small",
    group: "Herding",
    origin: "Wales",
    temperament: "Affectionate, Smart, Alert",
    showStandards: "Low-set, strong build. Medium-length coat. Fox-like head, intelligent expression.",
    popularityRank: 16
  },
  {
    name: "Boston Terrier",
    size: "Small",
    group: "Non-Sporting",
    origin: "United States",
    temperament: "Friendly, Bright, Amusing",
    showStandards: "Compact, well-balanced. Short, smooth coat. Square head, kind, intelligent expression.",
    popularityRank: 17
  },
  {
    name: "Bernese Mountain Dog",
    size: "Large",
    group: "Working",
    origin: "Switzerland",
    temperament: "Good-natured, Patient, Strong",
    showStandards: "Large, sturdy working dog. Thick, silky coat. Friendly eyes, gentle expression.",
    popularityRank: 18
  },
  {
    name: "Cocker Spaniel",
    size: "Medium",
    group: "Sporting",
    origin: "United States",
    temperament: "Gentle, Smart, Happy",
    showStandards: "Compact body, silky coat. Well-balanced head. Dark, melting eyes, alert expression.",
    popularityRank: 19
  },
  {
    name: "Mastiff",
    size: "Large",
    group: "Working",
    origin: "England",
    temperament: "Courageous, Dignified, Good-natured",
    showStandards: "Massive size, broad head. Short coat. Dark eyes, kind but alert expression.",
    popularityRank: 20
  },
  {
    name: "Shih Tzu",
    size: "Small",
    group: "Toy",
    origin: "Tibet",
    temperament: "Affectionate, Playful, Outgoing",
    showStandards: "Compact, solid build. Long, flowing coat. Round head, warm, friendly expression.",
    popularityRank: 21
  },
  {
    name: "Chihuahua",
    size: "Small",
    group: "Toy",
    origin: "Mexico",
    temperament: "Graceful, Charming, Sassy",
    showStandards: "Tiny size, apple or deer head. Two coat varieties. Large eyes, alert expression.",
    popularityRank: 22
  },
  {
    name: "Brittany",
    size: "Medium",
    group: "Sporting",
    origin: "France",
    temperament: "Bright, Eager, Athletic",
    showStandards: "Compact, athletic build. Dense, flat coat. Expressive eyes, intelligent appearance.",
    popularityRank: 23
  },
  {
    name: "Pomeranian",
    size: "Small",
    group: "Toy",
    origin: "Germany/Poland",
    temperament: "Inquisitive, Bold, Lively",
    showStandards: "Compact, short-backed. Double coat with frill. Fox-like head, bright, alert expression.",
    popularityRank: 24
  },
  {
    name: "Australian Cattle Dog",
    size: "Medium",
    group: "Herding",
    origin: "Australia",
    temperament: "Alert, Curious, Pleasant",
    showStandards: "Compact, symmetrical build. Smooth double coat. Oval eyes, keen, alert expression.",
    popularityRank: 25
  },
  {
    name: "Saint Bernard",
    size: "Large",
    group: "Working",
    origin: "Switzerland",
    temperament: "Playful, Charming, Inquisitive",
    showStandards: "Powerful, imposing size. Dense coat, two varieties. Kind eyes, intelligent expression.",
    popularityRank: 26
  },
  {
    name: "Vizsla",
    size: "Medium",
    group: "Sporting",
    origin: "Hungary",
    temperament: "Affectionate, Gentle, Energetic",
    showStandards: "Medium-sized, athletic build. Short, smooth coat. Lean head, lively, intelligent expression.",
    popularityRank: 27
  },
  {
    name: "Weimaraner",
    size: "Large",
    group: "Sporting",
    origin: "Germany",
    temperament: "Friendly, Fearless, Alert",
    showStandards: "Medium to large size. Short, smooth gray coat. Moderate head, kind, intelligent expression.",
    popularityRank: 28
  },
  {
    name: "Basset Hound",
    size: "Medium",
    group: "Hound",
    origin: "France",
    temperament: "Charming, Patient, Low-key",
    showStandards: "Low-slung, long body. Smooth, short coat. Large head, gentle, sad expression.",
    popularityRank: 29
  },
  {
    name: "Newfoundland",
    size: "Large",
    group: "Working",
    origin: "Canada",
    temperament: "Sweet, Patient, Devoted",
    showStandards: "Large, powerful build. Flat, water-resistant coat. Broad head, soft, intelligent expression.",
    popularityRank: 30
  },
  {
    name: "Rhodesian Ridgeback",
    size: "Large",
    group: "Hound",
    origin: "Southern Africa",
    temperament: "Affectionate, Dignified, Even-tempered",
    showStandards: "Strong, muscular build. Short, dense coat with ridge. Flat skull, intelligent expression.",
    popularityRank: 31
  },
  {
    name: "Shiba Inu",
    size: "Small",
    group: "Non-Sporting",
    origin: "Japan",
    temperament: "Alert, Agile, Charming",
    showStandards: "Compact, well-balanced. Double coat, various colors. Triangular eyes, confident expression.",
    popularityRank: 32
  },
  {
    name: "Bloodhound",
    size: "Large",
    group: "Hound",
    origin: "Belgium",
    temperament: "Friendly, Independent, Inquisitive",
    showStandards: "Large, powerful build. Short, dense coat. Long head, noble, dignified expression.",
    popularityRank: 33
  },
  {
    name: "Bull Terrier",
    size: "Medium",
    group: "Terrier",
    origin: "England",
    temperament: "Playful, Charming, Mischievous",
    showStandards: "Strong, muscular build. Short, flat coat. Egg-shaped head, keen, determined expression.",
    popularityRank: 34
  },
  {
    name: "Havanese",
    size: "Small",
    group: "Toy",
    origin: "Cuba",
    temperament: "Intelligent, Outgoing, Funny",
    showStandards: "Small, sturdy build. Long, silky coat. Almond eyes, soft, intelligent expression.",
    popularityRank: 35
  },
  {
    name: "English Springer Spaniel",
    size: "Medium",
    group: "Sporting",
    origin: "England",
    temperament: "Friendly, Playful, Obedient",
    showStandards: "Medium-sized, compact build. Medium-length coat. Oval eyes, alert, kind expression.",
    popularityRank: 36
  },
  {
    name: "Akita",
    size: "Large",
    group: "Working",
    origin: "Japan",
    temperament: "Dignified, Courageous, Profoundly loyal",
    showStandards: "Large, powerful build. Double coat, various colors. Triangular eyes, alert expression.",
    popularityRank: 37
  },
  {
    name: "Maltese",
    size: "Small",
    group: "Toy",
    origin: "Malta",
    temperament: "Gentle, Playful, Charming",
    showStandards: "Compact, toy-sized. Long, silky white coat. Round, dark eyes, gentle expression.",
    popularityRank: 38
  },
  {
    name: "Chesapeake Bay Retriever",
    size: "Large",
    group: "Sporting",
    origin: "United States",
    temperament: "Bright, Quiet, Sensible",
    showStandards: "Medium to large size. Wavy, oily coat. Broad round skull, intelligent expression.",
    popularityRank: 39
  },
  {
    name: "Great Pyrenees",
    size: "Large",
    group: "Working",
    origin: "France/Spain",
    temperament: "Smart, Patient, Calm",
    showStandards: "Large, majestic build. Weather-resistant double coat. Wedge-shaped head, gentle expression.",
    popularityRank: 40
  },
  {
    name: "Dalmatian",
    size: "Medium",
    group: "Non-Sporting",
    origin: "Croatia",
    temperament: "Dignified, Smart, Outgoing",
    showStandards: "Medium-sized, well-balanced. Short, dense spotted coat. Intelligent, alert expression.",
    popularityRank: 41
  },
  {
    name: "Portuguese Water Dog",
    size: "Medium",
    group: "Working",
    origin: "Portugal",
    temperament: "Affectionate, Adventurous, Athletic",
    showStandards: "Medium-sized, robust build. Curly or wavy coat. Wide-set eyes, steady, intelligent gaze.",
    popularityRank: 42
  },
  {
    name: "Samoyed",
    size: "Medium",
    group: "Working",
    origin: "Siberia",
    temperament: "Adaptable, Friendly, Gentle",
    showStandards: "Medium-sized, elegant build. Dense, weather-resistant coat. Dark eyes, smiling expression.",
    popularityRank: 43
  },
  {
    name: "Irish Setter",
    size: "Large",
    group: "Sporting",
    origin: "Ireland",
    temperament: "Active, Outgoing, Sweet-natured",
    showStandards: "Medium to large size. Flat, silky red coat. Almond eyes, intelligent, kind expression.",
    popularityRank: 44
  },
  {
    name: "Papillon",
    size: "Small",
    group: "Toy",
    origin: "France/Belgium",
    temperament: "Happy, Alert, Friendly",
    showStandards: "Small, fine-boned build. Long, silky coat. Large, round eyes, alert expression.",
    popularityRank: 45
  },
  {
    name: "Whippet",
    size: "Medium",
    group: "Hound",
    origin: "England",
    temperament: "Affectionate, Playful, Calm",
    showStandards: "Medium-sized sighthound. Short, smooth coat. Long, lean head, gentle expression.",
    popularityRank: 46
  },
  {
    name: "Bichon Frise",
    size: "Small",
    group: "Non-Sporting",
    origin: "Mediterranean",
    temperament: "Playful, Curious, Peppy",
    showStandards: "Small, sturdy build. Soft, dense curly coat. Round, dark eyes, gentle expression.",
    popularityRank: 47
  },
  {
    name: "Collie",
    size: "Large",
    group: "Herding",
    origin: "Scotland",
    temperament: "Devoted, Graceful, Proud",
    showStandards: "Medium to large size. Two coat varieties. Wedge-shaped head, sweet, intelligent expression.",
    popularityRank: 48
  },
  {
    name: "Afghan Hound",
    size: "Large",
    group: "Hound",
    origin: "Afghanistan",
    temperament: "Independent, Sweet, Dignified",
    showStandards: "Large sighthound. Long, silky coat. Triangular eyes, dignified, aloof expression.",
    popularityRank: 49
  },
  {
    name: "Old English Sheepdog",
    size: "Large",
    group: "Herding",
    origin: "England",
    temperament: "Adaptable, Gentle, Smart",
    showStandards: "Large, athletic build. Profuse, shaggy coat. Dark eyes hidden by hair, intelligent expression.",
    popularityRank: 50
  }
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
  },
  {
    name: "Birman",
    size: "Medium",
    coatType: "Longhair",
    origin: "Myanmar",
    temperament: "Affectionate, Gentle, Social",
    showStandards: "Medium to large build. Semi-long coat, color-point pattern. Round head, deep blue eyes.",
    popularityRank: 11
  },
  {
    name: "Oriental Shorthair",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Thailand",
    temperament: "Social, Intelligent, Curious",
    showStandards: "Svelte, tubular body. Short, fine coat. Wedge-shaped head, large ears, almond eyes.",
    popularityRank: 12
  },
  {
    name: "Sphynx",
    size: "Medium",
    coatType: "Hairless",
    origin: "Canada",
    temperament: "Energetic, Loyal, Curious",
    showStandards: "Medium build, hairless appearance. Wrinkled skin, large ears. Lemon-shaped eyes, alert expression.",
    popularityRank: 13
  },
  {
    name: "Exotic Shorthair",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Gentle, Calm, Affectionate",
    showStandards: "Cobby body like Persian but short coat. Flat face, large round eyes. Sweet, quiet temperament.",
    popularityRank: 14
  },
  {
    name: "Devon Rex",
    size: "Small",
    coatType: "Curly",
    origin: "England",
    temperament: "Mischievous, Loyal, Social",
    showStandards: "Slender build, curly coat. Large ears, short wedge-shaped head. Large, oval eyes.",
    popularityRank: 15
  },
  {
    name: "Cornish Rex",
    size: "Small",
    coatType: "Curly",
    origin: "England",
    temperament: "Affectionate, Intelligent, Active",
    showStandards: "Small to medium build. Soft, wavy coat. Egg-shaped head, large ears, oval eyes.",
    popularityRank: 16
  },
  {
    name: "Himalayan",
    size: "Medium",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Calm, Gentle, Social",
    showStandards: "Cobby body, long coat. Color-point pattern like Siamese. Flat face, large round eyes.",
    popularityRank: 17
  },
  {
    name: "Turkish Angora",
    size: "Medium",
    coatType: "Longhair",
    origin: "Turkey",
    temperament: "Intelligent, Loyal, Playful",
    showStandards: "Medium build, silky coat. Single-layer coat, no undercoat. Almond eyes, alert expression.",
    popularityRank: 18
  },
  {
    name: "Burmese",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Myanmar",
    temperament: "Social, Intelligent, Playful",
    showStandards: "Medium build, muscular. Short, fine coat. Round head, large, expressive eyes.",
    popularityRank: 19
  },
  {
    name: "Manx",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Isle of Man",
    temperament: "Social, Intelligent, Active",
    showStandards: "Compact build, tailless or short tail. Double coat, round head. Large, round eyes.",
    popularityRank: 20
  },
  {
    name: "Tonkinese",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Thailand/Myanmar",
    temperament: "Social, Intelligent, Active",
    showStandards: "Medium build, muscular. Mink pattern coat. Modified wedge head, aqua eyes.",
    popularityRank: 21
  },
  {
    name: "Somali",
    size: "Medium",
    coatType: "Longhair",
    origin: "Somalia",
    temperament: "Active, Intelligent, Playful",
    showStandards: "Medium build, fox-like appearance. Semi-long ticked coat. Wedge-shaped head, large ears.",
    popularityRank: 22
  },
  {
    name: "Munchkin",
    size: "Small",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Outgoing, Intelligent, Social",
    showStandards: "Short legs, normal body. Various coat colors. Walnut-shaped eyes, alert expression.",
    popularityRank: 23
  },
  {
    name: "Savannah",
    size: "Large",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Active, Adventurous, Loyal",
    showStandards: "Large, lean build. Spotted coat pattern. Long legs, large ears, hooded eyes.",
    popularityRank: 24
  },
  {
    name: "Ocicat",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Outgoing, Social, Active",
    showStandards: "Athletic build, spotted pattern. Well-muscled body. Modified wedge head, almond eyes.",
    popularityRank: 25
  },
  {
    name: "Turkish Van",
    size: "Large",
    coatType: "Longhair",
    origin: "Turkey",
    temperament: "Active, Agile, Intelligent",
    showStandards: "Large, muscular build. Semi-long coat, van pattern. Broad head, amber or blue eyes.",
    popularityRank: 26
  },
  {
    name: "Egyptian Mau",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Egypt",
    temperament: "Loyal, Gentle, Alert",
    showStandards: "Medium build, naturally spotted coat. Muscular, active body. Round head, large eyes.",
    popularityRank: 27
  },
  {
    name: "Bombay",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Social, Intelligent, Easy-going",
    showStandards: "Medium build, all-black coat. Muscular body. Round head, copper or gold eyes.",
    popularityRank: 28
  },
  {
    name: "Chartreux",
    size: "Medium",
    coatType: "Shorthair",
    origin: "France",
    temperament: "Gentle, Intelligent, Playful",
    showStandards: "Robust build, blue-gray coat. Dense, woolly texture. Round head, copper or orange eyes.",
    popularityRank: 29
  },
  {
    name: "Korat",
    size: "Small",
    coatType: "Shorthair",
    origin: "Thailand",
    temperament: "Gentle, Intelligent, Loyal",
    showStandards: "Small to medium build. Silver-blue coat, heart-shaped head. Large, round green eyes.",
    popularityRank: 30
  },
  {
    name: "Singapura",
    size: "Small",
    coatType: "Shorthair",
    origin: "Singapore",
    temperament: "Curious, Playful, Affectionate",
    showStandards: "Small, muscular build. Ticked coat pattern. Round head, large eyes and ears.",
    popularityRank: 31
  },
  {
    name: "Japanese Bobtail",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Japan",
    temperament: "Intelligent, Active, Sweet",
    showStandards: "Medium build, short pom-pom tail. Triangular head, large oval eyes. Alert expression.",
    popularityRank: 32
  },
  {
    name: "Selkirk Rex",
    size: "Medium",
    coatType: "Curly",
    origin: "United States",
    temperament: "Calm, Tolerant, Playful",
    showStandards: "Medium to large build. Curly coat, round head. Large, round eyes, sweet expression.",
    popularityRank: 33
  },
  {
    name: "LaPerm",
    size: "Medium",
    coatType: "Curly",
    origin: "United States",
    temperament: "Affectionate, Active, Curious",
    showStandards: "Medium build, curly coat. Modified wedge head, large ears. Expressive, alert eyes.",
    popularityRank: 34
  },
  {
    name: "Balinese",
    size: "Medium",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Intelligent, Social, Playful",
    showStandards: "Svelte build, long silky coat. Wedge-shaped head, deep blue eyes. Color-point pattern.",
    popularityRank: 35
  },
  {
    name: "Javanese",
    size: "Medium",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Intelligent, Social, Active",
    showStandards: "Medium build, long coat. Wedge-shaped head, almond eyes. Color-point or solid patterns.",
    popularityRank: 36
  },
  {
    name: "Colorpoint Shorthair",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Social, Intelligent, Vocal",
    showStandards: "Svelte build, point coloration. Wedge-shaped head, deep blue eyes. Various point colors.",
    popularityRank: 37
  },
  {
    name: "Havana Brown",
    size: "Medium",
    coatType: "Shorthair",
    origin: "England",
    temperament: "Intelligent, Playful, Social",
    showStandards: "Medium build, chocolate brown coat. Oval head, green eyes. Alert, intelligent expression.",
    popularityRank: 38
  },
  {
    name: "American Curl",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Gentle, Intelligent, Playful",
    showStandards: "Medium build, curled ears. Walnut-shaped eyes, alert expression. Silky coat texture.",
    popularityRank: 39
  },
  {
    name: "American Wirehair",
    size: "Medium",
    coatType: "Wirehair",
    origin: "United States",
    temperament: "Calm, Tolerant, Playful",
    showStandards: "Medium build, wiry coat. Round head, large round eyes. Sweet, open expression.",
    popularityRank: 40
  },
  {
    name: "Cymric",
    size: "Medium",
    coatType: "Longhair",
    origin: "Isle of Man",
    temperament: "Social, Intelligent, Playful",
    showStandards: "Compact build, tailless. Long, silky coat. Round head, large round eyes.",
    popularityRank: 41
  },
  {
    name: "Peterbald",
    size: "Medium",
    coatType: "Hairless",
    origin: "Russia",
    temperament: "Social, Intelligent, Energetic",
    showStandards: "Elegant build, hairless or brush coat. Wedge-shaped head, large ears. Almond eyes.",
    popularityRank: 42
  },
  {
    name: "Pixie-bob",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Social, Intelligent, Active",
    showStandards: "Medium to large build. Spotted pattern, bobbed tail. Inverted pear-shaped head.",
    popularityRank: 43
  },
  {
    name: "Ragamuffin",
    size: "Large",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Gentle, Social, Calm",
    showStandards: "Large, muscular build. Plush coat, various colors. Sweet facial expression, large eyes.",
    popularityRank: 44
  },
  {
    name: "Siberian",
    size: "Large",
    coatType: "Longhair",
    origin: "Russia",
    temperament: "Gentle, Social, Playful",
    showStandards: "Large, powerful build. Triple coat, water-resistant. Round head, large expressive eyes.",
    popularityRank: 45
  },
  {
    name: "American Shorthair",
    size: "Medium",
    coatType: "Shorthair",
    origin: "United States",
    temperament: "Gentle, Calm, Social",
    showStandards: "Medium to large build. Short, thick coat. Round head, large round eyes.",
    popularityRank: 46
  },
  {
    name: "European Shorthair",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Europe",
    temperament: "Intelligent, Playful, Social",
    showStandards: "Medium build, muscular. Short, dense coat. Round head, large round eyes.",
    popularityRank: 47
  },
  {
    name: "Neva Masquerade",
    size: "Large",
    coatType: "Longhair",
    origin: "Russia",
    temperament: "Gentle, Social, Calm",
    showStandards: "Large build, color-point pattern. Semi-long coat, blue eyes. Sweet facial expression.",
    popularityRank: 48
  },
  {
    name: "Kurilian Bobtail",
    size: "Medium",
    coatType: "Shorthair",
    origin: "Russia",
    temperament: "Gentle, Social, Active",
    showStandards: "Medium build, short curved tail. Compact body, round head. Large expressive eyes.",
    popularityRank: 49
  },
  {
    name: "Chantilly-Tiffany",
    size: "Medium",
    coatType: "Longhair",
    origin: "United States",
    temperament: "Gentle, Social, Vocal",
    showStandards: "Medium build, chocolate coat. Semi-long silky coat. Oval head, gold or green eyes.",
    popularityRank: 50
  }
];
