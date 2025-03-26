
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { catStandards } from "@/data/catStandards";
import { NutritionQuery } from "@/components/NutritionQuery";

const CatStandards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);

  const filteredStandards = catStandards.filter(cat =>
    (selectedSize ? cat.size === selectedSize : true) &&
    (cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.size.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-3xl font-bold">Cat Breed Feeding Standards</h1>
        </div>

        <div className="space-y-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10"
                placeholder="Search by breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setShowNutritionQuery(!showNutritionQuery)}
              variant="outline"
              className="whitespace-nowrap"
            >
              {showNutritionQuery ? "Hide Nutrition Assistant" : "Show Nutrition Assistant"}
            </Button>
          </div>

          {showNutritionQuery && (
            <div className="mb-6">
              <NutritionQuery defaultPetType="cat" />
            </div>
          )}

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
                {size} Cats
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
            Nutritional information provided is based on general guidelines. Sources include American College of Veterinary Nutrition (ACVN) and European Society of Veterinary and Comparative Nutrition (ESVCN).
          </p>
          <p>
            Please consult with your veterinarian for personalized feeding recommendations based on your cat's age, weight, activity level, and health conditions.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CatStandards;
