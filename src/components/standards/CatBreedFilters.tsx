
import { Search, PawPrint } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PetSize, getSizeCategoryStyle } from "@/utils/sizeCategoryImages";
import { CatSize } from "@/data/types/catTypes";

interface CatBreedFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSize: PetSize | null;
  setSelectedSize: (size: PetSize | null) => void;
  showNutritionQuery: boolean;
  setShowNutritionQuery: (show: boolean) => void;
  ageFilter: string;
  setAgeFilter: (age: string) => void;
}

export const CatBreedFilters = ({
  searchTerm,
  setSearchTerm,
  selectedSize,
  setSelectedSize,
  showNutritionQuery,
  setShowNutritionQuery,
  ageFilter,
  setAgeFilter,
}: CatBreedFiltersProps) => {
  
  return (
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSize === null ? "default" : "outline"}
            onClick={() => setSelectedSize(null)}
            className="rounded-full"
          >
            All Sizes
          </Button>
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
        
        <Tabs defaultValue={ageFilter} className="w-full sm:w-auto" onValueChange={setAgeFilter}>
          <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
            <TabsTrigger value="kitten">Kitten</TabsTrigger>
            <TabsTrigger value="adult">Adult</TabsTrigger>
            <TabsTrigger value="senior">Senior</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
