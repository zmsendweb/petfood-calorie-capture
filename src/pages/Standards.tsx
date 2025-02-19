import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

interface DogStandard {
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

const dogStandards: DogStandard[] = [
  {
    breed: "Labrador Retriever",
    size: "Large",
    dailyCalories: { min: 1800, max: 2600 },
    mealsPerDay: 2,
    notes: "Adjust calories based on activity level. Prone to obesity - monitor body condition score. Adult maintenance energy requirement varies significantly with activity.",
    imageUrl: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80"
  },
  {
    breed: "German Shepherd",
    size: "Large",
    dailyCalories: { min: 1740, max: 2400 },
    mealsPerDay: 2,
    notes: "Higher protein requirements (min 25%). Consider joint health supplements. Feed multiple smaller meals to prevent bloat.",
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80"
  },
  {
    breed: "French Bulldog",
    size: "Small",
    dailyCalories: { min: 650, max: 1000 },
    mealsPerDay: 3,
    notes: "Prone to obesity and respiratory issues. Feed measured portions. Avoid high-fat diets. Consider breed-specific formulas.",
    imageUrl: "https://images.unsplash.com/photo-1593351799227-75df2026356b?q=80"
  },
  {
    breed: "Chihuahua",
    size: "Small",
    dailyCalories: { min: 180, max: 380 },
    mealsPerDay: 3,
    notes: "High metabolism rate per body weight. Risk of hypoglycemia - frequent small meals recommended. Energy dense food advised.",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  },
  {
    breed: "Golden Retriever",
    size: "Large",
    dailyCalories: { min: 1350, max: 2200 },
    mealsPerDay: 2,
    notes: "Monitor weight closely. Prone to food allergies. Consider omega fatty acids for coat health. Active adults may need upper calorie range.",
    imageUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80"
  },
  {
    breed: "Poodle (Standard)",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    mealsPerDay: 2,
    notes: "High energy requirements. Consider coat maintenance needs. Moderate protein (23-28%) recommended. Watch for food sensitivities.",
    imageUrl: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80"
  },
  {
    breed: "Yorkshire Terrier",
    size: "Small",
    dailyCalories: { min: 150, max: 250 },
    mealsPerDay: 3,
    notes: "Prone to dental issues - consider kibble size. High quality protein essential. Risk of hypoglycemia in small specimens.",
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80"
  },
  {
    breed: "Bulldog",
    size: "Medium",
    dailyCalories: { min: 850, max: 1250 },
    mealsPerDay: 2,
    notes: "Moderate exercise needs. High risk of obesity. Consider low-fat diets. Feed elevated to reduce respiratory stress.",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  },
  {
    breed: "Beagle",
    size: "Medium",
    dailyCalories: { min: 740, max: 1300 },
    mealsPerDay: 2,
    notes: "Strong food drive - strict portion control needed. Consider puzzle feeders to slow consumption. Watch for food scavenging.",
    imageUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80"
  },
  {
    breed: "Siberian Husky",
    size: "Large",
    dailyCalories: { min: 1200, max: 2100 },
    mealsPerDay: 2,
    notes: "High protein and fat requirements for active dogs. Seasonal variation in needs. Consider working vs. companion activity levels.",
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80"
  },
  {
    breed: "Rottweiler",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    mealsPerDay: 2,
    notes: "Requires high protein diet, prone to weight gain if inactive",
    imageUrl: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?q=80"
  },
  {
    breed: "Shih Tzu",
    size: "Small",
    dailyCalories: { min: 400, max: 700 },
    mealsPerDay: 3,
    notes: "Low exercise needs, watch for overfeeding",
    imageUrl: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?q=80"
  },
  {
    breed: "Border Collie",
    size: "Medium",
    dailyCalories: { min: 900, max: 1400 },
    mealsPerDay: 2,
    notes: "Very active breed, may need more calories if working",
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80"
  },
  {
    breed: "Great Dane",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    mealsPerDay: 2,
    notes: "Multiple smaller meals recommended to prevent bloat",
    imageUrl: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80"
  },
  {
    breed: "Pomeranian",
    size: "Small",
    dailyCalories: { min: 200, max: 500 },
    mealsPerDay: 3,
    notes: "Small portions to prevent hypoglycemia",
    imageUrl: "https://images.unsplash.com/photo-1577598888374-d7645cd5410b?q=80"
  },
  {
    breed: "Australian Shepherd",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    mealsPerDay: 2,
    notes: "High energy breed, adjust based on activity level",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80"
  },
  {
    breed: "Saint Bernard",
    size: "Large",
    dailyCalories: { min: 1800, max: 2800 },
    mealsPerDay: 2,
    notes: "Watch for rapid growth in puppies",
    imageUrl: "https://images.unsplash.com/photo-1561984142-7f4937dda866?q=80"
  },
  {
    breed: "Dachshund",
    size: "Small",
    dailyCalories: { min: 300, max: 600 },
    mealsPerDay: 2,
    notes: "Prone to obesity, careful portion control needed",
    imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80"
  },
  {
    breed: "Boxer",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    mealsPerDay: 2,
    notes: "Athletic breed, needs protein-rich diet",
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80"
  },
  {
    breed: "Shetland Sheepdog",
    size: "Medium",
    dailyCalories: { min: 600, max: 1000 },
    mealsPerDay: 2,
    notes: "Active breed with moderate caloric needs",
    imageUrl: "https://images.unsplash.com/photo-1548767196-f54c1781c54d?q=80"
  },
  {
    breed: "Maltese",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 3,
    notes: "Small, frequent meals recommended",
    imageUrl: "https://images.unsplash.com/photo-1508532566027-b2032cd8a715?q=80"
  },
  {
    breed: "Doberman Pinscher",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    mealsPerDay: 2,
    notes: "Athletic breed, needs balanced protein and fat",
    imageUrl: "https://images.unsplash.com/photo-1608096299210-88316c441275?q=80"
  },
  {
    breed: "Cavalier King Charles Spaniel",
    size: "Small",
    dailyCalories: { min: 400, max: 650 },
    mealsPerDay: 2,
    notes: "Moderate energy needs, watch for weight gain",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80"
  },
  {
    breed: "Bernese Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    mealsPerDay: 2,
    notes: "Large breed, careful feeding during growth",
    imageUrl: "https://images.unsplash.com/photo-1568572933382-74d440642117?q=80"
  },
  {
    breed: "Corgi",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    mealsPerDay: 2,
    notes: "Prone to obesity, monitor portions carefully",
    imageUrl: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?q=80"
  },
  {
    breed: "Pit Bull",
    size: "Medium",
    dailyCalories: { min: 800, max: 1400 },
    mealsPerDay: 2,
    notes: "High protein needs, active breed requires careful portion control",
    imageUrl: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80"
  },
  {
    breed: "English Bulldog",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    mealsPerDay: 2,
    notes: "Prone to obesity, monitor food intake closely",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80"
  },
  {
    breed: "Cocker Spaniel",
    size: "Medium",
    dailyCalories: { min: 700, max: 1000 },
    mealsPerDay: 2,
    notes: "Moderate exercise needs, watch for weight gain",
    imageUrl: "https://images.unsplash.com/photo-1591769198715-6c1149559028?q=80"
  },
  {
    breed: "Miniature Schnauzer",
    size: "Small",
    dailyCalories: { min: 400, max: 600 },
    mealsPerDay: 2,
    notes: "Active small breed, needs balanced nutrition",
    imageUrl: "https://images.unsplash.com/photo-1530041539828-114de669390e?q=80"
  },
  {
    breed: "Boston Terrier",
    size: "Small",
    dailyCalories: { min: 500, max: 800 },
    mealsPerDay: 2,
    notes: "Energetic breed, monitor portion sizes",
    imageUrl: "https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?q=80"
  },
  {
    breed: "Newfoundland",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    mealsPerDay: 2,
    notes: "Giant breed, needs careful feeding during growth",
    imageUrl: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?q=80"
  },
  {
    breed: "Rhodesian Ridgeback",
    size: "Large",
    dailyCalories: { min: 1800, max: 2400 },
    mealsPerDay: 2,
    notes: "Athletic breed, adjust based on activity level",
    imageUrl: "https://images.unsplash.com/photo-1553882809-a4f57e59501d?q=80"
  },
  {
    breed: "Havanese",
    size: "Small",
    dailyCalories: { min: 300, max: 500 },
    mealsPerDay: 2,
    notes: "Small but active, needs quality nutrition",
    imageUrl: "https://images.unsplash.com/photo-1611611158876-41699b77a059?q=80"
  },
  {
    breed: "Vizsla",
    size: "Medium",
    dailyCalories: { min: 1200, max: 1800 },
    mealsPerDay: 2,
    notes: "High energy breed, needs substantial nutrition",
    imageUrl: "https://images.unsplash.com/photo-1523997359283-6fc87d5f0d88?q=80"
  },
  {
    breed: "Mastiff",
    size: "Large",
    dailyCalories: { min: 2200, max: 3200 },
    mealsPerDay: 2,
    notes: "Giant breed, careful feeding to prevent growth issues",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80"
  },
  {
    breed: "Belgian Malinois",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    mealsPerDay: 2,
    notes: "Working breed, high energy needs",
    imageUrl: "https://images.unsplash.com/photo-1622227056993-6e7f88420855?q=80"
  },
  {
    breed: "Bichon Frise",
    size: "Small",
    dailyCalories: { min: 300, max: 500 },
    mealsPerDay: 2,
    notes: "Low shedding breed, moderate energy needs",
    imageUrl: "https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?q=80"
  },
  {
    breed: "Chow Chow",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    mealsPerDay: 2,
    notes: "Watch for food allergies, moderate exercise needs",
    imageUrl: "https://images.unsplash.com/photo-1530041127323-12726bd7a526?q=80"
  },
  {
    breed: "Basset Hound",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    mealsPerDay: 2,
    notes: "Prone to obesity, careful portion control needed",
    imageUrl: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?q=80"
  },
  {
    breed: "Akita",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    mealsPerDay: 2,
    notes: "Strong food drive, needs measured portions",
    imageUrl: "https://images.unsplash.com/photo-1617895153857-82fe79adfcd4?q=80"
  },
  {
    breed: "Weimaraner",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    mealsPerDay: 2,
    notes: "Very active, high energy requirements",
    imageUrl: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80"
  },
  {
    breed: "Papillon",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 2,
    notes: "Small but active, needs quality small breed food",
    imageUrl: "https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80"
  },
  {
    breed: "Irish Setter",
    size: "Large",
    dailyCalories: { min: 1400, max: 2200 },
    mealsPerDay: 2,
    notes: "Active sporting breed, needs energy-rich diet",
    imageUrl: "https://images.unsplash.com/photo-1588269845464-8993565cac3a?q=80"
  },
  {
    breed: "Pug",
    size: "Small",
    dailyCalories: { min: 400, max: 600 },
    mealsPerDay: 2,
    notes: "Prone to obesity, strict portion control needed",
    imageUrl: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80"
  },
  {
    breed: "Standard Schnauzer",
    size: "Medium",
    dailyCalories: { min: 900, max: 1300 },
    mealsPerDay: 2,
    notes: "Active breed, needs balanced nutrition",
    imageUrl: "https://images.unsplash.com/photo-1530041539828-114de669390e?q=80"
  },
  {
    breed: "English Setter",
    size: "Large",
    dailyCalories: { min: 1300, max: 2000 },
    mealsPerDay: 2,
    notes: "Sporting breed, adjust for activity level",
    imageUrl: "https://images.unsplash.com/photo-1562317305-58a17fe2c09e?q=80"
  },
  {
    breed: "Brussels Griffon",
    size: "Small",
    dailyCalories: { min: 250, max: 400 },
    mealsPerDay: 2,
    notes: "Small portions, quality small breed food recommended",
    imageUrl: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?q=80"
  },
  {
    breed: "Bull Terrier",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    mealsPerDay: 2,
    notes: "Muscular breed, needs protein-rich diet",
    imageUrl: "https://images.unsplash.com/photo-1535506573827-d4518e05cc8e?q=80"
  },
  {
    breed: "Afghan Hound",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    mealsPerDay: 2,
    notes: "Lean breed, needs quality nutrition",
    imageUrl: "https://images.unsplash.com/photo-1588269845464-8993565cac3a?q=80"
  },
  {
    breed: "Chinese Crested",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 2,
    notes: "Small appetite, regular small meals",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80"
  }
];

const Standards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filteredStandards = dogStandards.filter(dog =>
    (selectedSize ? dog.size === selectedSize : true) &&
    (dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.size.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sizes = ["Small", "Medium", "Large"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Dog Breed Feeding Standards</h1>
        </div>

        <div className="space-y-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Search by breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSize === null ? "default" : "outline"}
              onClick={() => setSelectedSize(null)}
              className="rounded-full"
            >
              All Sizes
            </Button>
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                onClick={() => setSelectedSize(size)}
                className="rounded-full"
              >
                {size} Dogs
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStandards.map((standard) => (
            <Card key={standard.breed} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={standard.imageUrl}
                  alt={standard.breed}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{standard.breed}</span>
                  <span className={`text-sm font-normal px-2 py-1 rounded-full ${
                    standard.size === "Small" ? "bg-secondary/20" :
                    standard.size === "Medium" ? "bg-primary/20" :
                    "bg-accent/20"
                  }`}>
                    {standard.size}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Daily Calorie Range</p>
                    <p className="font-semibold">
                      {standard.dailyCalories.min} - {standard.dailyCalories.max} calories
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Recommended Meals</p>
                    <p className="font-semibold">{standard.mealsPerDay} times per day</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-sm">{standard.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStandards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No breeds found matching your search.</p>
          </div>
        )}

        <footer className="mt-12 border-t pt-6 text-xs text-gray-500">
          <p className="mb-2">
            Nutritional information provided is based on general guidelines. Sources include the American College of Veterinary Nutrition (ACVN) and European Society of Veterinary and Comparative Nutrition (ESVCN).
          </p>
          <p>
            Please consult with your veterinarian for personalized feeding recommendations based on your dog's age, weight, activity level, and health conditions.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Standards;
