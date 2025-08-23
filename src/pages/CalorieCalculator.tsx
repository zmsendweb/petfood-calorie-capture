import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppNavigation } from "@/components/AppNavigation";
import { Calculator, Dog, Cat } from "lucide-react";

export default function CalorieCalculator() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [neutered, setNeutered] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateCalories = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum || !activityLevel) return;

    // Basic RER (Resting Energy Requirement) calculation
    const rer = 70 * Math.pow(weightNum, 0.75);
    
    // Activity multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.4,
      moderate: 1.6,
      active: 1.8,
      very_active: 2.0
    };

    // Age adjustments
    const ageNum = parseInt(age);
    let ageMultiplier = 1;
    if (ageNum < 1) {
      ageMultiplier = petType === "dog" ? 2.5 : 2.0; // Puppy/kitten
    } else if (ageNum > 7) {
      ageMultiplier = 0.8; // Senior pets
    }

    // Neuter status adjustment
    const neuterMultiplier = neutered === "yes" ? 0.8 : 1;

    const totalCalories = rer * multipliers[activityLevel as keyof typeof multipliers] * ageMultiplier * neuterMultiplier;
    setResult(Math.round(totalCalories));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Pet Calorie Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pet Type */}
            <div className="space-y-2">
              <Label>Pet Type</Label>
              <div className="flex gap-4">
                <Button
                  variant={petType === "dog" ? "default" : "outline"}
                  onClick={() => setPetType("dog")}
                  className="flex-1 flex items-center gap-2"
                >
                  <Dog className="h-4 w-4" />
                  Dog
                </Button>
                <Button
                  variant={petType === "cat" ? "default" : "outline"}
                  onClick={() => setPetType("cat")}
                  className="flex-1 flex items-center gap-2"
                >
                  <Cat className="h-4 w-4" />
                  Cat
                </Button>
              </div>
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
              disabled={!weight || !age || !activityLevel || !neutered}
              className="w-full"
            >
              Calculate Daily Calories
            </Button>

            {/* Result */}
            {result && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-900">Daily Calorie Requirement</h3>
                    <p className="text-3xl font-bold text-green-700 mt-2">{result} calories</p>
                    <p className="text-sm text-green-600 mt-2">
                      This is an estimate. Consult your veterinarian for specific dietary needs.
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