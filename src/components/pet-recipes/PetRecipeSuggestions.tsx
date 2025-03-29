import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNutritionRAG } from "@/hooks/use-nutrition-rag";
import { Loader2, Dog, Cat } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function PetRecipeSuggestions() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [ingredients, setIngredients] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [recipePrompt, setRecipePrompt] = useState("");
  const [recipe, setRecipe] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { searchFoods, isLoading: isSearching } = useFatSecretAPI();
  const { getAnswer, isLoading: isRagLoading } = useNutritionRAG();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const result = await searchFoods(searchQuery);
    if (result?.foods?.food) {
      const foodArray = Array.isArray(result.foods.food) 
        ? result.foods.food 
        : [result.foods.food];
      setSearchResults(foodArray);
    } else {
      setSearchResults([]);
      toast({
        title: "No results found",
        description: "Try a different search term"
      });
    }
  };

  const addIngredient = (food: FoodItem) => {
    if (!ingredients.some(item => item.food_id === food.food_id)) {
      setIngredients([...ingredients, food]);
      toast({
        title: "Ingredient added",
        description: `${food.food_name} added to your recipe`
      });
    } else {
      toast({
        title: "Ingredient already added",
        description: `${food.food_name} is already in your recipe`
      });
    }
  };

  const removeIngredient = (foodId: string) => {
    setIngredients(ingredients.filter(item => item.food_id !== foodId));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please add at least one ingredient to generate a recipe"
      });
      return;
    }

    setIsLoading(true);
    try {
      const ingredientList = ingredients.map(item => item.food_name).join(", ");
      const customPrompt = recipePrompt.trim() 
        ? recipePrompt 
        : `Create a simple homemade pet food recipe for a ${petType} using some or all of these ingredients: ${ingredientList}`;
      
      const result = await getAnswer(customPrompt, petType);
      
      if (result) {
        setRecipe(result.answer);
        
        const nutritionPrompt = `Analyze the nutritional value of this ${petType} recipe and explain if it meets basic nutritional needs: ${result.answer}`;
        const nutritionResult = await getAnswer(nutritionPrompt, petType);
        
        if (nutritionResult) {
          setNutritionInfo(nutritionResult.answer);
        }
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error generating recipe",
        description: "Something went wrong. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {petType === "dog" ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
          Pet Food Recipe Generator
        </CardTitle>
        <CardDescription>
          Create custom, nutritionally-balanced food recipes for your pets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Select Ingredients</TabsTrigger>
            <TabsTrigger value="recipe">Generate Recipe</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Select value={petType} onValueChange={(value: "dog" | "cat") => setPetType(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Pet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                  </SelectContent>
                </Select>
                
                <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1">
                  <Input
                    placeholder="Search for ingredients..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSearching}>
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                  </Button>
                </form>
              </div>
              
              {searchResults.length > 0 && (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="w-24">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.slice(0, 5).map((food) => (
                        <TableRow key={food.food_id}>
                          <TableCell className="font-medium">{food.food_name}</TableCell>
                          <TableCell>{food.food_type || "Generic"}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addIngredient(food)}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium mb-2">Selected Ingredients:</h3>
                {ingredients.length === 0 ? (
                  <p className="text-muted-foreground">No ingredients selected yet</p>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ingredient</TableHead>
                          <TableHead className="w-24">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ingredients.map((food) => (
                          <TableRow key={food.food_id}>
                            <TableCell className="font-medium">{food.food_name}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => removeIngredient(food.food_id)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recipe">
            <div className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                  Recipe Instructions (Optional)
                </label>
                <Textarea
                  id="prompt"
                  placeholder={`Any specific instructions for this ${petType} recipe? (e.g., "High protein", "Low fat", "For senior dogs", etc.)`}
                  value={recipePrompt}
                  onChange={e => setRecipePrompt(e.target.value)}
                  className="min-h-24"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Selected ingredients: </span>
                  <span className="text-sm text-muted-foreground">
                    {ingredients.length === 0 
                      ? "None" 
                      : ingredients.map(i => i.food_name).join(", ")}
                  </span>
                </div>
                <Button 
                  onClick={generateRecipe} 
                  disabled={isLoading || ingredients.length === 0}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Generate Recipe
                </Button>
              </div>
              
              {recipe && (
                <Card className="mt-4 bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-line">{recipe}</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition">
            {nutritionInfo ? (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Nutritional Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line">{nutritionInfo}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Generate a recipe first to see nutritional analysis</p>
                <Button 
                  variant="outline" 
                  onClick={() => document.querySelector('[data-value="recipe"]')?.dispatchEvent(new Event('click'))}
                >
                  Go to Recipe Generator
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
