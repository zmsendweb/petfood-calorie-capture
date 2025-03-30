
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowLeft, PawPrint } from "lucide-react";
import { NutritionQuery } from "@/components/NutritionQuery";
import { dogStandards } from "@/data/dogStandards";
import { getSizeCategoryStyle, PetSize } from "@/utils/sizeCategoryImages";

const Standards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  const filteredStandards = dogStandards.filter(dog =>
    (selectedSize ? dog.size === selectedSize : true) &&
    (dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.size.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sizes = ["Small", "Medium", "Large"];
  const ageGroups = [
    { id: "puppy", label: "Puppy" },
    { id: "adult", label: "Adult" },
    { id: "senior", label: "Senior" }
  ];

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

        <div className="mb-4 flex flex-wrap gap-2">
          <Link to="/standards">
            <Button variant="default">
              Dog Standards
            </Button>
          </Link>
          <Link to="/cat-standards">
            <Button variant="outline">
              Cat Standards
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
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
              <NutritionQuery defaultPetType="dog" />
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSize === null ? "default" : "outline"}
                onClick={() => setSelectedSize(null)}
                className="rounded-full"
              >
                All Sizes
              </Button>
              {sizes.map((size) => {
                const sizeStyle = getSizeCategoryStyle(size as PetSize);
                return (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="rounded-full flex items-center gap-2"
                  >
                    <PawPrint className={`h-4 w-4 ${sizeStyle.color}`} />
                    {size} Dogs
                  </Button>
                );
              })}
            </div>
            
            <Tabs defaultValue="adult" className="w-full sm:w-auto" onValueChange={setAgeFilter}>
              <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
                <TabsTrigger value="puppy">Puppy</TabsTrigger>
                <TabsTrigger value="adult">Adult</TabsTrigger>
                <TabsTrigger value="senior">Senior</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStandards.map((standard) => {
            const sizeStyle = getSizeCategoryStyle(standard.size as PetSize);
            return (
              <Card key={standard.breed} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-xl">{standard.breed}</span>
                    <span className={`inline-flex items-center gap-2 text-sm font-normal px-3 py-1.5 rounded-full ${sizeStyle.bgColor} ${sizeStyle.color}`}>
                      <PawPrint className="h-4 w-4" />
                      {standard.size}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {ageFilter === "puppy" ? "Puppy" : ageFilter === "adult" ? "Adult" : "Senior"} Daily Calorie Range
                      </p>
                      <p className="font-semibold">
                        {standard.ageSpecificCalories[ageFilter as keyof typeof standard.ageSpecificCalories].min} - {standard.ageSpecificCalories[ageFilter as keyof typeof standard.ageSpecificCalories].max} calories
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Recommended Meals
                      </p>
                      <p className="font-semibold">
                        {standard.mealsPerDay[ageFilter as keyof typeof standard.mealsPerDay]} times per day
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nutrition Notes</p>
                      <p className="text-sm">
                        {standard.nutritionNotes[ageFilter as keyof typeof standard.nutritionNotes]}
                      </p>
                    </div>
                    {/* Source information removed */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
