
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IngredientSearch } from "./IngredientSearch";
import { SelectedIngredients } from "./SelectedIngredients";
import { FoodItem } from "@/hooks/use-fatsecret-api";

interface IngredientsTabProps {
  petType: "dog" | "cat";
  setPetType: (type: "dog" | "cat") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: FoodItem[];
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  ingredients: FoodItem[];
  addIngredient: (food: FoodItem) => void;
  removeIngredient: (foodId: string) => void;
}

export function IngredientsTab({
  petType,
  setPetType,
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSearch,
  isSearching,
  ingredients,
  addIngredient,
  removeIngredient
}: IngredientsTabProps) {
  return (
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
        
        <IngredientSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          handleSearch={handleSearch}
          isSearching={isSearching}
          addIngredient={addIngredient}
        />
      </div>
      
      <SelectedIngredients 
        ingredients={ingredients} 
        removeIngredient={removeIngredient} 
      />
    </div>
  );
}
