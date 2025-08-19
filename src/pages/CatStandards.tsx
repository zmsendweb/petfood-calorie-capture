
import { CatStandardsHeader } from "@/components/standards/CatStandardsHeader";
import { CatBreedFilters } from "@/components/standards/CatBreedFilters";
import { CatBreedCard } from "@/components/standards/CatBreedCard";
import { StandardsFooter } from "@/components/standards/StandardsFooter";
import { ModernNavigation } from "@/components/navigation/ModernNavigation";
import { useCatStandardsFilter } from "@/hooks/useCatStandardsFilter";
import { useState } from "react";

export default function CatStandards() {
  const {
    filters,
    filteredBreeds,
    updateFilter,
    clearFilters,
    totalBreeds,
    filteredCount
  } = useCatStandardsFilter();

  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <ModernNavigation />
      <div className="container mx-auto px-4 py-8">
        
        <CatStandardsHeader />
        
        <CatBreedFilters
          searchTerm={filters.searchTerm}
          setSearchTerm={(term) => updateFilter('searchTerm', term)}
          selectedSize={null}
          setSelectedSize={() => {}}
          showNutritionQuery={showNutritionQuery}
          setShowNutritionQuery={setShowNutritionQuery}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBreeds.map((breed, index) => (
            <CatBreedCard key={`${breed.breed}-${index}`} cat={breed} ageFilter={ageFilter} />
          ))}
        </div>
        
        {filteredBreeds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cat breeds match your current filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
        
        <StandardsFooter />
      </div>
    </div>
  );
}
