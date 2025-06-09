
import { PageHeader } from "@/components/PageHeader";
import { CatStandardsHeader } from "@/components/standards/CatStandardsHeader";
import { CatBreedFilters } from "@/components/standards/CatBreedFilters";
import { CatBreedCard } from "@/components/standards/CatBreedCard";
import { StandardsFooter } from "@/components/standards/StandardsFooter";
import { AppNavigation } from "@/components/AppNavigation";
import { useCatStandardsFilter } from "@/hooks/useCatStandardsFilter";

export default function CatStandards() {
  const {
    filters,
    filteredBreeds,
    updateFilter,
    clearFilters,
    totalBreeds,
    filteredCount
  } = useCatStandardsFilter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Cat Breed Standards" 
          subtitle="Comprehensive guide to cat breed characteristics and standards"
        />
        
        <CatStandardsHeader />
        
        <CatBreedFilters
          selectedSizes={filters.size}
          selectedTemperaments={filters.temperament}
          selectedCoatLengths={filters.coatLength}
          selectedCategories={filters.category}
          searchTerm={filters.searchTerm}
          onSizeChange={(sizes) => updateFilter('size', sizes)}
          onTemperamentChange={(temperaments) => updateFilter('temperament', temperaments)}
          onCoatLengthChange={(coatLengths) => updateFilter('coatLength', coatLengths)}
          onCategoryChange={(categories) => updateFilter('category', categories)}
          onSearchChange={(term) => updateFilter('searchTerm', term)}
          onClearFilters={clearFilters}
          totalBreeds={totalBreeds}
          filteredCount={filteredCount}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBreeds.map((breed, index) => (
            <CatBreedCard key={`${breed.name}-${index}`} breed={breed} />
          ))}
        </div>
        
        {filteredBreeds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cat breeds match your current filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
