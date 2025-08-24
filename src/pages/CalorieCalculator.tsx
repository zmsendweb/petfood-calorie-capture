
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppNavigation } from "@/components/AppNavigation";
import { Calculator, Dog, Cat } from "lucide-react";
import { dogStandards } from "@/data/dogStandards";
import { catStandards } from "@/data/catStandards";
import { DogStandard } from "@/data/types/dogTypes";
import { CatStandard } from "@/data/types/catTypes";

export default function CalorieCalculator() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [neutered, setNeutered] = useState("");
  const [result, setResult] = useState<{
    calories: number;
    breedInfo: DogStandard | CatStandard | null;
    ageCategory: string;
  } | null>(null);

  const currentBreeds = petType === "dog" ? dogStandards : catStandards;

  const calculateCalories = () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age);
    
    if (!weightNum || !ageNum || !activityLevel || !selectedBreed) return;

    // Find breed-specific information
    const breedInfo = currentBreeds.find(breed => breed.breed === selectedBreed);
    
    if (!breedInfo) return;

    // Determine age category
    let ageCategory = "adult";
    if (petType === "dog") {
      if (ageNum < 1) ageCategory = "puppy";
      else if (ageNum > 7) ageCategory = "senior";
    } else {
      if (ageNum < 1) ageCategory = "kitten";
      else if (ageNum > 7) ageCategory = "senior";
    }

    // Get breed-specific calorie range
    const ageSpecificCalories = breedInfo.ageSpecificCalories[ageCategory as keyof typeof breedInfo.ageSpecificCalories];
    
    // Calculate base calories using breed-specific data
    let baseCalories = (ageSpecificCalories.min + ageSpecificCalories.max) / 2;

    // Activity level adjustments
    const activityMultipliers = {
      sedentary: 0.8,
      light: 0.9,
      moderate: 1.0,
      active: 1.2,
      very_active: 1.4
    };

    // Neuter status adjustment
    const neuterMultiplier = neutered === "yes" ? 0.9 : 1;

    // Weight adjustment (simple linear scaling)
    const weightMultiplier = weightNum / 25; // Assuming 25kg as base weight

    const totalCalories = Math.round(baseCalories * activityMultipliers[activityLevel as keyof typeof activityMultipliers] * neuterMultiplier * weightMultiplier);

    setResult({
      calories: totalCalories,
      breedInfo,
      ageCategory
    });
  };

  const handlePetTypeChange = (type: "dog" | "cat") => {
    setPetType(type);
    setSelectedBreed("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Breed-Specific Pet Calorie Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pet Type */}
            <div className="space-y-2">
              <Label>Pet Type</Label>
              <div className="flex gap-4">
                <Button
                  variant={petType === "dog" ? "default" : "outline"}
                  onClick={() => handlePetTypeChange("dog")}
                  className="flex-1 flex items-center gap-2"
                >
                  <Dog className="h-4 w-4" />
                  Dog
                </Button>
                <Button
                  variant={petType === "cat" ? "default" : "outline"}
                  onClick={() => handlePetTypeChange("cat")}
                  className="flex-1 flex items-center gap-2"
                >
                  <Cat className="h-4 w-4" />
                  Cat
                </Button>
              </div>
            </div>

            {/* Breed Selection */}
            <div className="space-y-2">
              <Label>Breed</Label>
              <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select a ${petType} breed`} />
                </SelectTrigger>
                <SelectContent>
                  {currentBreeds.map((breed) => (
                    <SelectItem key={breed.breed} value={breed.breed}>
                      {breed.breed} ({breed.size})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age in years"
              />
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (mostly resting)</SelectItem>
                  <SelectItem value="light">Light (short walks, indoor play)</SelectItem>
                  <SelectItem value="moderate">Moderate (daily walks, regular play)</SelectItem>
                  <SelectItem value="active">Active (long walks, frequent exercise)</SelectItem>
                  <SelectItem value="very_active">Very Active (working dog, intensive training)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Neutered Status */}
            <div className="space-y-2">
              <Label>Spayed/Neutered</Label>
              <Select value={neutered} onValueChange={setNeutered}>
                <SelectTrigger>
                  <SelectValue placeholder="Select neutering status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={calculateCalories}
              disabled={!weight || !age || !activityLevel || !neutered || !selectedBreed}
              className="w-full"
            >
              Calculate Breed-Specific Daily Calories
            </Button>

            {/* Result */}
            {result && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-green-900">
                      Daily Calorie Requirement for {selectedBreed}
                    </h3>
                    <p className="text-3xl font-bold text-green-700">{result.calories} calories</p>
                    
                    {result.breedInfo && (
                      <div className="bg-white rounded-lg p-4 text-left space-y-2">
                        <h4 className="font-medium text-sm text-gray-700">Breed-Specific Information:</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Size Category:</strong> {result.breedInfo.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Age Category:</strong> {result.ageCategory.charAt(0).toUpperCase() + result.ageCategory.slice(1)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Recommended Meals per Day:</strong> {
                            petType === "dog" 
                              ? result.breedInfo.mealsPerDay[result.ageCategory as keyof typeof result.breedInfo.mealsPerDay]
                              : (result.breedInfo as CatStandard).mealsByAge[result.ageCategory as keyof CatStandard['mealsByAge']]
                          }
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {result.breedInfo.nutritionNotes[result.ageCategory as keyof typeof result.breedInfo.nutritionNotes]}
                        </p>
                      </div>
                    )}
                    
                    <p className="text-sm text-green-600">
                      This calculation is based on breed-specific nutritional requirements. 
                      Consult your veterinarian for specific dietary needs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
