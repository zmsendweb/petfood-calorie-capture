
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeGenerator } from "@/components/pet-recipes/RecipeGenerator";
import { IngredientsTab } from "@/components/pet-recipes/IngredientsTab";
import { AppNavigation } from "@/components/AppNavigation";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { useRecipeGenerator } from "@/hooks/use-recipe-generator";
import { ChefHat, Sparkles, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllDogBreedNames, getAllCatBreedNames } from "@/utils/breedNames";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritional_benefits: string;
  serving_size: string;
  storage: string;
  breed: string;
  petType: "dog" | "cat";
}

export function PetRecipes() {
  const [activeTab, setActiveTab] = useState("generator");
  const [recipePrompt, setRecipePrompt] = useState("");
  const [ingredients, setIngredients] = useState<FoodItem[]>([]);
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [recipeLibrary, setRecipeLibrary] = useState<Recipe[]>([]);
  const [isGeneratingLibrary, setIsGeneratingLibrary] = useState(false);
  
  const { searchFoods, isLoading: isFoodSearchLoading } = useFatSecretAPI();
  const { generateRecipes, isLoading: isRecipeGenerating } = useRecipeGenerator();

  // Popular breeds (top 5 for each)
  const popularDogBreeds = ["Labrador Retriever", "Golden Retriever", "German Shepherd", "Bulldog", "Poodle"];
  const popularCatBreeds = ["Persian", "Maine Coon", "Ragdoll", "British Shorthair", "Siamese"];
  
  const dogBreeds = getAllDogBreedNames().slice(0, 20); // Top 20 for selection
  const catBreeds = getAllCatBreedNames().slice(0, 20); // Top 20 for selection

  const generateRecipe = async () => {
    if (!selectedBreed) {
      return;
    }
    
    const ingredientNames = ingredients.map(ingredient => ingredient.food_name);
    const result = await generateRecipes({
      petType,
      breed: selectedBreed,
      ingredients: ingredientNames,
      dietaryNeeds: recipePrompt || undefined
    });
    
    if (result && result.recipes) {
      const recipesWithMeta = result.recipes.map(recipe => ({
        ...recipe,
        breed: selectedBreed,
        petType
      }));
      setGeneratedRecipes(recipesWithMeta);
    }
  };

  const generateRecipeLibrary = async () => {
    setIsGeneratingLibrary(true);
    const library: Recipe[] = [];
    
    try {
      // Generate for popular dog breeds
      for (const breed of popularDogBreeds) {
        const result = await generateRecipes({
          petType: "dog",
          breed,
          ingredients: [], // Use common healthy ingredients
          dietaryNeeds: "Nutritionally balanced for optimal health"
        });
        
        if (result && result.recipes) {
          const breedRecipes = result.recipes.map(recipe => ({
            ...recipe,
            breed,
            petType: "dog" as const
          }));
          library.push(...breedRecipes);
        }
      }

      // Generate for popular cat breeds
      for (const breed of popularCatBreeds) {
        const result = await generateRecipes({
          petType: "cat",
          breed,
          ingredients: [], // Use common healthy ingredients
          dietaryNeeds: "Nutritionally balanced for optimal health"
        });
        
        if (result && result.recipes) {
          const breedRecipes = result.recipes.map(recipe => ({
            ...recipe,
            breed,
            petType: "cat" as const
          }));
          library.push(...breedRecipes);
        }
      }

      setRecipeLibrary(library);
      setActiveTab("library");
    } catch (error) {
      console.error("Error generating recipe library:", error);
    } finally {
      setIsGeneratingLibrary(false);
    }
  };

  const addIngredient = (ingredient: FoodItem) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const removeIngredient = (ingredientId: string) => {
    setIngredients(prev => prev.filter(item => item.food_id !== ingredientId));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const result = await searchFoods(searchQuery);
      if (result && result.foods) {
        const foods = Array.isArray(result.foods.food) ? result.foods.food : [result.foods.food];
        setSearchResults(foods || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handlePetTypeChange = (type: "dog" | "cat") => {
    setPetType(type);
    setSelectedBreed("");
    setGeneratedRecipes([]);
  };

  const filteredLibraryRecipes = recipeLibrary.filter(recipe => 
    petType === "dog" ? recipe.petType === "dog" : recipe.petType === "cat"
  );

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
            <Tabs defaultValue={activeTab} className="w-[400px]" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="generator">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generator
                </TabsTrigger>
                <TabsTrigger value="ingredients">
                  <Heart className="mr-2 h-4 w-4" />
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="library">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Recipe Library
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
                isLoading={isRecipeGenerating}
                recipe=""
                petType={petType}
                selectedBreed={selectedBreed}
                setSelectedBreed={setSelectedBreed}
                dogBreeds={dogBreeds}
                catBreeds={catBreeds}
                generatedRecipes={generatedRecipes}
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
                isSearching={isFoodSearchLoading || isSearching}
                ingredients={ingredients}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
              />
            </TabsContent>
            <TabsContent value="library">
              <div className="space-y-6">
                {recipeLibrary.length === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Recipe Library</h3>
                      <p className="text-muted-foreground mb-4">
                        Generate a comprehensive recipe library for the top 5 most popular dog and cat breeds using our AI-powered recipe generator.
                      </p>
                      <Button 
                        onClick={generateRecipeLibrary}
                        disabled={isGeneratingLibrary}
                        className="w-full max-w-md"
                      >
                        {isGeneratingLibrary ? (
                          <>Generating Recipe Library... (This may take a few minutes)</>
                        ) : (
                          <>Generate Recipe Library (10 recipes × 10 breeds = 100 recipes)</>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Recipe Library ({filteredLibraryRecipes.length} {petType} recipes)
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant={petType === "dog" ? "default" : "outline"}
                          onClick={() => setPetType("dog")}
                          size="sm"
                        >
                          Dog Recipes
                        </Button>
                        <Button
                          variant={petType === "cat" ? "default" : "outline"}
                          onClick={() => setPetType("cat")}
                          size="sm"
                        >
                          Cat Recipes
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      {filteredLibraryRecipes.map((recipe, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center justify-between">
                              <span>{recipe.name}</span>
                              <span className="text-sm font-normal text-muted-foreground">
                                {recipe.breed}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">INGREDIENTS</h4>
                              <ul className="text-sm space-y-1">
                                {recipe.ingredients.map((ingredient, i) => (
                                  <li key={i}>• {ingredient}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">INSTRUCTIONS</h4>
                              <ol className="text-sm space-y-1">
                                {recipe.instructions.map((instruction, i) => (
                                  <li key={i}>{i + 1}. {instruction}</li>
                                ))}
                              </ol>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4 pt-2 border-t">
                              <div>
                                <h4 className="font-medium text-xs text-muted-foreground mb-1">BENEFITS</h4>
                                <p className="text-xs">{recipe.nutritional_benefits}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-xs text-muted-foreground mb-1">SERVING SIZE</h4>
                                <p className="text-xs">{recipe.serving_size}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-xs text-muted-foreground mb-1">STORAGE</h4>
                                <p className="text-xs">{recipe.storage}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
