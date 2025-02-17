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
}

const dogStandards: DogStandard[] = [
  {
    breed: "Labrador Retriever",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    mealsPerDay: 2,
    notes: "Active breed, adjust based on activity level"
  },
  {
    breed: "German Shepherd",
    size: "Large",
    dailyCalories: { min: 1700, max: 2400 },
    mealsPerDay: 2,
    notes: "High energy breed, needs protein-rich diet"
  },
  {
    breed: "French Bulldog",
    size: "Small",
    dailyCalories: { min: 700, max: 1000 },
    mealsPerDay: 3,
    notes: "Prone to obesity, monitor intake carefully"
  },
  {
    breed: "Chihuahua",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 3,
    notes: "Small portions, frequent meals recommended"
  },
  {
    breed: "Golden Retriever",
    size: "Large",
    dailyCalories: { min: 1300, max: 2100 },
    mealsPerDay: 2,
    notes: "Adjust based on age and activity"
  },
  {
    breed: "Poodle (Standard)",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    mealsPerDay: 2,
    notes: "Highly active, needs balanced nutrition"
  },
  {
    breed: "Yorkshire Terrier",
    size: "Small",
    dailyCalories: { min: 150, max: 300 },
    mealsPerDay: 3,
    notes: "Small frequent meals, avoid overfeeding"
  },
  {
    breed: "Bulldog",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    mealsPerDay: 2,
    notes: "Prone to weight gain, monitor carefully"
  },
  {
    breed: "Beagle",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    mealsPerDay: 2,
    notes: "Tendency to overeat, portion control important"
  },
  {
    breed: "Siberian Husky",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    mealsPerDay: 2,
    notes: "High energy needs, especially in cold weather"
  },
  {
    breed: "Rottweiler",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    mealsPerDay: 2,
    notes: "Requires high protein diet, prone to weight gain if inactive"
  },
  {
    breed: "Shih Tzu",
    size: "Small",
    dailyCalories: { min: 400, max: 700 },
    mealsPerDay: 3,
    notes: "Low exercise needs, watch for overfeeding"
  },
  {
    breed: "Border Collie",
    size: "Medium",
    dailyCalories: { min: 900, max: 1400 },
    mealsPerDay: 2,
    notes: "Very active breed, may need more calories if working"
  },
  {
    breed: "Great Dane",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    mealsPerDay: 2,
    notes: "Multiple smaller meals recommended to prevent bloat"
  },
  {
    breed: "Pomeranian",
    size: "Small",
    dailyCalories: { min: 200, max: 500 },
    mealsPerDay: 3,
    notes: "Small portions to prevent hypoglycemia"
  },
  {
    breed: "Australian Shepherd",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1600 },
    mealsPerDay: 2,
    notes: "High energy breed, adjust based on activity level"
  },
  {
    breed: "Saint Bernard",
    size: "Large",
    dailyCalories: { min: 1800, max: 2800 },
    mealsPerDay: 2,
    notes: "Watch for rapid growth in puppies"
  },
  {
    breed: "Dachshund",
    size: "Small",
    dailyCalories: { min: 300, max: 600 },
    mealsPerDay: 2,
    notes: "Prone to obesity, careful portion control needed"
  },
  {
    breed: "Boxer",
    size: "Large",
    dailyCalories: { min: 1500, max: 2200 },
    mealsPerDay: 2,
    notes: "Athletic breed, needs protein-rich diet"
  },
  {
    breed: "Shetland Sheepdog",
    size: "Medium",
    dailyCalories: { min: 600, max: 1000 },
    mealsPerDay: 2,
    notes: "Active breed with moderate caloric needs"
  },
  {
    breed: "Maltese",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 3,
    notes: "Small, frequent meals recommended"
  },
  {
    breed: "Doberman Pinscher",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    mealsPerDay: 2,
    notes: "Athletic breed, needs balanced protein and fat"
  },
  {
    breed: "Cavalier King Charles Spaniel",
    size: "Small",
    dailyCalories: { min: 400, max: 650 },
    mealsPerDay: 2,
    notes: "Moderate energy needs, watch for weight gain"
  },
  {
    breed: "Bernese Mountain Dog",
    size: "Large",
    dailyCalories: { min: 1700, max: 2500 },
    mealsPerDay: 2,
    notes: "Large breed, careful feeding during growth"
  },
  {
    breed: "Corgi",
    size: "Medium",
    dailyCalories: { min: 700, max: 1100 },
    mealsPerDay: 2,
    notes: "Prone to obesity, monitor portions carefully"
  },
  {
    breed: "Pit Bull",
    size: "Medium",
    dailyCalories: { min: 800, max: 1400 },
    mealsPerDay: 2,
    notes: "High protein needs, active breed requires careful portion control"
  },
  {
    breed: "English Bulldog",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    mealsPerDay: 2,
    notes: "Prone to obesity, monitor food intake closely"
  },
  {
    breed: "Cocker Spaniel",
    size: "Medium",
    dailyCalories: { min: 700, max: 1000 },
    mealsPerDay: 2,
    notes: "Moderate exercise needs, watch for weight gain"
  },
  {
    breed: "Miniature Schnauzer",
    size: "Small",
    dailyCalories: { min: 400, max: 600 },
    mealsPerDay: 2,
    notes: "Active small breed, needs balanced nutrition"
  },
  {
    breed: "Boston Terrier",
    size: "Small",
    dailyCalories: { min: 500, max: 800 },
    mealsPerDay: 2,
    notes: "Energetic breed, monitor portion sizes"
  },
  {
    breed: "Newfoundland",
    size: "Large",
    dailyCalories: { min: 2000, max: 3000 },
    mealsPerDay: 2,
    notes: "Giant breed, needs careful feeding during growth"
  },
  {
    breed: "Rhodesian Ridgeback",
    size: "Large",
    dailyCalories: { min: 1800, max: 2400 },
    mealsPerDay: 2,
    notes: "Athletic breed, adjust based on activity level"
  },
  {
    breed: "Havanese",
    size: "Small",
    dailyCalories: { min: 300, max: 500 },
    mealsPerDay: 2,
    notes: "Small but active, needs quality nutrition"
  },
  {
    breed: "Vizsla",
    size: "Medium",
    dailyCalories: { min: 1200, max: 1800 },
    mealsPerDay: 2,
    notes: "High energy breed, needs substantial nutrition"
  },
  {
    breed: "Mastiff",
    size: "Large",
    dailyCalories: { min: 2200, max: 3200 },
    mealsPerDay: 2,
    notes: "Giant breed, careful feeding to prevent growth issues"
  },
  {
    breed: "Belgian Malinois",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    mealsPerDay: 2,
    notes: "Working breed, high energy needs"
  },
  {
    breed: "Bichon Frise",
    size: "Small",
    dailyCalories: { min: 300, max: 500 },
    mealsPerDay: 2,
    notes: "Low shedding breed, moderate energy needs"
  },
  {
    breed: "Chow Chow",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    mealsPerDay: 2,
    notes: "Watch for food allergies, moderate exercise needs"
  },
  {
    breed: "Basset Hound",
    size: "Medium",
    dailyCalories: { min: 800, max: 1200 },
    mealsPerDay: 2,
    notes: "Prone to obesity, careful portion control needed"
  },
  {
    breed: "Akita",
    size: "Large",
    dailyCalories: { min: 1800, max: 2500 },
    mealsPerDay: 2,
    notes: "Strong food drive, needs measured portions"
  },
  {
    breed: "Weimaraner",
    size: "Large",
    dailyCalories: { min: 1600, max: 2400 },
    mealsPerDay: 2,
    notes: "Very active, high energy requirements"
  },
  {
    breed: "Papillon",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 2,
    notes: "Small but active, needs quality small breed food"
  },
  {
    breed: "Irish Setter",
    size: "Large",
    dailyCalories: { min: 1400, max: 2200 },
    mealsPerDay: 2,
    notes: "Active sporting breed, needs energy-rich diet"
  },
  {
    breed: "Pug",
    size: "Small",
    dailyCalories: { min: 400, max: 600 },
    mealsPerDay: 2,
    notes: "Prone to obesity, strict portion control needed"
  },
  {
    breed: "Standard Schnauzer",
    size: "Medium",
    dailyCalories: { min: 900, max: 1300 },
    mealsPerDay: 2,
    notes: "Active breed, needs balanced nutrition"
  },
  {
    breed: "English Setter",
    size: "Large",
    dailyCalories: { min: 1300, max: 2000 },
    mealsPerDay: 2,
    notes: "Sporting breed, adjust for activity level"
  },
  {
    breed: "Brussels Griffon",
    size: "Small",
    dailyCalories: { min: 250, max: 400 },
    mealsPerDay: 2,
    notes: "Small portions, quality small breed food recommended"
  },
  {
    breed: "Bull Terrier",
    size: "Medium",
    dailyCalories: { min: 1000, max: 1500 },
    mealsPerDay: 2,
    notes: "Muscular breed, needs protein-rich diet"
  },
  {
    breed: "Afghan Hound",
    size: "Large",
    dailyCalories: { min: 1400, max: 2000 },
    mealsPerDay: 2,
    notes: "Lean breed, needs quality nutrition"
  },
  {
    breed: "Chinese Crested",
    size: "Small",
    dailyCalories: { min: 200, max: 400 },
    mealsPerDay: 2,
    notes: "Small appetite, regular small meals"
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
            <Card key={standard.breed} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
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
      </div>
    </div>
  );
};

export default Standards;
