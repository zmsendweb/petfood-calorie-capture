
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeGenerator } from "@/components/pet-recipes/RecipeGenerator";
import { IngredientsTab } from "@/components/pet-recipes/IngredientsTab";
import { AppNavigation } from "@/components/AppNavigation";
import { ChefHat, Sparkles, Heart } from "lucide-react";

export function PetRecipes() {
  const [activeTab, setActiveTab] = useState("generator");
  const [recipePrompt, setRecipePrompt] = useState("");
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);

  const generateRecipe = () => {
    // Recipe generation logic would go here
    console.log("Generating recipe for:", recipePrompt);
  };

  const addToRecipe = (ingredient: any) => {
    setSelectedIngredients(prev => [...prev, ingredient]);
  };

  const removeFromRecipe = (ingredient: any) => {
    setSelectedIngredients(prev => prev.filter(item => item.id !== ingredient.id));
  };

  const generateNutritionAnalysis = () => {
    // Nutrition analysis logic would go here
    console.log("Generating nutrition analysis");
  };

  const handlePetTypeChange = (type: string) => {
    setPetType(type as "dog" | "cat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Pet Recipe Central
            </CardTitle>
            <Tabs defaultValue={activeTab} className="w-[300px]" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="generator">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generator
                </TabsTrigger>
                <TabsTrigger value="ingredients">
                  <Heart className="mr-2 h-4 w-4" />
                  Ingredients
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="generator" className="space-y-4">
              <RecipeGenerator 
                recipePrompt={recipePrompt}
                setRecipePrompt={setRecipePrompt}
                ingredients={ingredients}
                generateRecipe={generateRecipe}
                petType={petType}
                setPetType={handlePetTypeChange}
                selectedIngredients={selectedIngredients}
                addToRecipe={addToRecipe}
              />
            </TabsContent>
            <TabsContent value="ingredients">
              <IngredientsTab 
                petType={petType}
                setPetType={handlePetTypeChange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedIngredients={selectedIngredients}
                addToRecipe={addToRecipe}
                removeFromRecipe={removeFromRecipe}
                generateNutritionAnalysis={generateNutritionAnalysis}
                nutritionAnalysis={null}
                isGenerating={false}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
