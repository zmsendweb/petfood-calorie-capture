
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PetSize } from "@/utils/sizeCategoryImages";

interface DogBreedFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSize: PetSize | null;
  setSelectedSize: (size: PetSize | null) => void;
  showNutritionQuery: boolean;
  setShowNutritionQuery: (show: boolean) => void;
  ageFilter: string;
  setAgeFilter: (age: string) => void;
}

export const DogBreedFilters = ({
  searchTerm,
  setSearchTerm,
  selectedSize,
  setSelectedSize,
  showNutritionQuery,
  setShowNutritionQuery,
  ageFilter,
  setAgeFilter
}: DogBreedFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search breeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        
        <Select 
          value={selectedSize || "all"} 
          onValueChange={(val) => setSelectedSize(val === "all" ? null : val as PetSize)}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Filter by size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="Small">Small</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Large">Large</SelectItem>
            <SelectItem value="Specialty">Specialty</SelectItem>
            <SelectItem value="Rare">Rare</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={ageFilter} 
          onValueChange={setAgeFilter}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select age group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="puppy">Puppy</SelectItem>
            <SelectItem value="adult">Adult</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end">
        <Button
          variant={showNutritionQuery ? "default" : "outline"}
          onClick={() => setShowNutritionQuery(!showNutritionQuery)}
        >
          {showNutritionQuery ? "Hide Nutrition Search" : "Show Nutrition Search"}
        </Button>
      </div>
    </div>
  );
};
