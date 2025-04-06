
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PawPrint } from "lucide-react";
import { catStandards } from "@/data/catStandards";
import { NutritionQuery } from "@/components/NutritionQuery";
import { getSizeCategoryStyle, PetSize } from "@/utils/sizeCategoryImages";
import { BreedCounter } from "@/components/BreedCounter";
import { PageHeader } from "@/components/PageHeader";
import { CatSize } from "@/data/types/catTypes";

const CatStandards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<PetSize | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  console.log("Current selected size:", selectedSize);

  // Filter cats based on search term and selected size
  const filteredStandards = catStandards.filter(cat => {
    // Check if size matches (null means all sizes)
    const sizeMatches = selectedSize === null || cat.size === selectedSize;
    
    // Check if search term matches breed or size
    const searchMatches = 
      searchTerm === "" || 
      cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.size.toLowerCase().includes(searchTerm.toLowerCase());
    
    return sizeMatches && searchMatches;
  });

  console.log("Filtered cat standards count:", filteredStandards.length);
  console.log("Filtered by size:", selectedSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-6">
      <div className="container max-w-6xl">
        <PageHeader 
          title="Cat Breed Standards" 
          backTo="/"
        />

        <div className="mb-4 flex flex-wrap gap-2">
          <Link to="/standards">
            <Button variant="outline">
              Dog Standards
            </Button>
          </Link>
          <Link to="/cat-standards">
            <Button variant="default">
              Cat Standards
            </Button>
          </Link>
        </div>

        {/* Pass the selectedSize and setSelectedSize function to BreedCounter */}
        <BreedCounter 
          petType="cat" 
          selectedSize={selectedSize} 
          onSizeSelect={setSelectedSize} 
        />

        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
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
            <div className="mb-4">
              <NutritionQuery defaultPetType="cat" />
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
              {/* Map over all possible cat sizes from the CatSize type */}
              {(["Small", "Medium", "Large", "Exotic", "Rare"] as CatSize[]).map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="rounded-full flex items-center gap-2"
                >
                  <PawPrint className={`h-4 w-4 ${getSizeCategoryStyle(size).color}`} />
                  {size}
                </Button>
              ))}
            </div>
            
            <Tabs defaultValue="adult" className="w-full sm:w-auto" onValueChange={setAgeFilter}>
              <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
                <TabsTrigger value="kitten">Kitten</TabsTrigger>
                <TabsTrigger value="adult">Adult</TabsTrigger>
                <TabsTrigger value="senior">Senior</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStandards.map((standard) => {
            const sizeStyle = getSizeCategoryStyle(standard.size);
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
                        {ageFilter === "kitten" ? "Kitten" : ageFilter === "adult" ? "Adult" : "Senior"} Daily Calorie Range
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
                        {standard.mealsByAge[ageFilter as keyof typeof standard.mealsByAge]} times per day
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nutrition Notes</p>
                      <p className="text-sm">
                        {standard.nutritionNotes[ageFilter as keyof typeof standard.nutritionNotes]}
                      </p>
                    </div>
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

        <footer className="mt-10 border-t pt-4 text-xs text-gray-500">
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
