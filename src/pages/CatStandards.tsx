
import { useState } from "react";
import { catStandards } from "@/data/catStandards";
import { PetSize } from "@/utils/sizeCategoryImages";
import { BreedCounter } from "@/components/BreedCounter";
import { NutritionQuery } from "@/components/NutritionQuery";
import { 
  CatBreedCard, 
  CatBreedFilters, 
  CatStandardsHeader,
  StandardsFooter 
} from "@/components/standards";

const CatStandards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<PetSize | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  // Filter cats based on search term and selected size
  const filteredStandards = catStandards.filter(cat => {
    // Check if size matches (null means all sizes)
    const sizeMatches = selectedSize === null || cat.size === selectedSize;
    
    // Check if search term matches breed or size
    const searchMatches = 
      searchTerm === "" || 
      cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.size.toLowerCase().includes(searchTerm.toLowerCase());
    
    return sizeMatches && searchMatches;
  });

  // Create a unique ID for each cat to prevent React key duplications
  const getUniqueId = (cat: (typeof catStandards)[0], index: number) => {
    return `${cat.breed}-${cat.size}-${index}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <CatStandardsHeader />

        {/* Pass the selectedSize and setSelectedSize function to BreedCounter */}
        <BreedCounter 
          petType="cat" 
          selectedSize={selectedSize} 
          onSizeSelect={setSelectedSize} 
        />

        <CatBreedFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          showNutritionQuery={showNutritionQuery}
          setShowNutritionQuery={setShowNutritionQuery}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
        />

        {showNutritionQuery && (
          <div className="mb-6">
            <NutritionQuery defaultPetType="cat" />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStandards.map((standard, index) => (
            <CatBreedCard 
              key={getUniqueId(standard, index)} 
              cat={standard} 
              ageFilter={ageFilter} 
            />
          ))}
        </div>

        {filteredStandards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No breeds found matching your search.</p>
          </div>
        )}

        <StandardsFooter />
      </div>
    </div>
  );
};

export default CatStandards;
