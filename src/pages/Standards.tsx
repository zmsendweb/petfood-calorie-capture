
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
  }
];

const Standards = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStandards = dogStandards.filter(dog =>
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.size.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Search by breed or size..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStandards.map((standard) => (
            <Card key={standard.breed} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{standard.breed}</span>
                  <span className="text-sm font-normal px-2 py-1 bg-primary/10 rounded-full">
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
