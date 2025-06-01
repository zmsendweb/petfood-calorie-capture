
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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState("");

  const generateRecipe = () => {
    // Recipe generation logic would go here
    console.log("Generating recipe for:", recipePrompt);
  };

  const addIngredient = (ingredient: any) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const removeIngredient = (ingredientId: string) => {
    setIngredients(prev => prev.filter(item => item.food_id !== ingredientId));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Search logic would go here
    console.log("Searching for:", searchQuery);
    setIsSearching(false);
  };

  const handlePetTypeChange = (type: "dog" | "cat") => {
    setPetType(type);
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
                isLoading={isLoading}
                recipe={recipe}
                petType={petType}
              />
            </TabsContent>
            <TabsContent value="ingredients">
              <IngredientsTab 
                petType={petType}
                setPetType={handlePetTypeChange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                handleSearch={handleSearch}
                isSearching={isSearching}
                ingredients={ingredients}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
