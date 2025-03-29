
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { toast } from "@/hooks/use-toast";

interface IngredientSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: FoodItem[];
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  addIngredient: (food: FoodItem) => void;
}

export function IngredientSearch({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSearch,
  isSearching,
  addIngredient
}: IngredientSearchProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
