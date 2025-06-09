
import { useState, useMemo } from 'react';
import { catStandards } from '@/data/catStandards';

export interface CatStandardsFilters {
  size: string[];
  temperament: string[];
  coatLength: string[];
  category: string[];
  searchTerm: string;
}

export function useCatStandardsFilter() {
  const [filters, setFilters] = useState<CatStandardsFilters>({
    size: [],
    temperament: [],
    coatLength: [],
    category: [],
    searchTerm: ''
  });

  const filteredBreeds = useMemo(() => {
    let filtered = [...catStandards];

    // Apply search term filter
    if (filters.searchTerm) {
      filtered = filtered.filter(breed =>
        breed.breed.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply size filter
    if (filters.size.length > 0) {
      filtered = filtered.filter(breed =>
        filters.size.some(size => {
          const breedSize = breed.size.toLowerCase();
          const filterSize = size.toLowerCase();
          
          // Handle size mapping
          if (filterSize === 'small' && (breedSize.includes('small') || breedSize.includes('petite'))) return true;
          if (filterSize === 'medium' && breedSize.includes('medium')) return true;
          if (filterSize === 'large' && (breedSize.includes('large') || breedSize.includes('substantial'))) return true;
          if (filterSize === 'exotic' && breed.isExotic) return true;
          if (filterSize === 'rare' && breed.isRare) return true;
          
          return breedSize.includes(filterSize);
        })
      );
    }

    // Apply temperament filter - search in breed name since temperament data structure varies
    if (filters.temperament.length > 0) {
      filtered = filtered.filter(breed =>
        filters.temperament.some(temp => {
          const tempLower = temp.toLowerCase();
          const breedLower = breed.breed.toLowerCase();
          
          // Common temperament keywords to search for in breed names
          if (tempLower === 'gentle' && (breedLower.includes('gentle') || breedLower.includes('calm'))) return true;
          if (tempLower === 'active' && (breedLower.includes('active') || breedLower.includes('energetic'))) return true;
          if (tempLower === 'friendly' && (breedLower.includes('friendly') || breedLower.includes('social'))) return true;
          
          return breedLower.includes(tempLower);
        })
      );
    }

    // Apply coat length filter - search in breed name for coat indicators
    if (filters.coatLength.length > 0) {
      filtered = filtered.filter(breed =>
        filters.coatLength.some(coat => {
          const breedName = breed.breed.toLowerCase();
          const filterCoat = coat.toLowerCase();
          
          // Handle coat length variations in breed name
          if (filterCoat === 'short' && (breedName.includes('short') || breedName.includes('shorthair'))) return true;
          if (filterCoat === 'long' && (breedName.includes('long') || breedName.includes('longhair'))) return true;
          if (filterCoat === 'medium' && breedName.includes('medium')) return true;
          
          return breedName.includes(filterCoat);
        })
      );
    }

    // Apply category filter (exotic/rare handling)
    if (filters.category.length > 0) {
      filtered = filtered.filter(breed => {
        return filters.category.some(category => {
          const cat = category.toLowerCase();
          const breedName = breed.breed.toLowerCase();
          
          // Check for exotic and rare flags
          if (cat === 'exotic' && breed.isExotic) return true;
          if (cat === 'rare' && breed.isRare) return true;
          
          // For other categories, check if it matches breed characteristics
          return breedName.includes(cat);
        });
      });
    }

    return filtered;
  }, [filters]);

  const updateFilter = (key: keyof CatStandardsFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      size: [],
      temperament: [],
      coatLength: [],
      category: [],
      searchTerm: ''
    });
  };

  return {
    filters,
    filteredBreeds,
    updateFilter,
    clearFilters,
    totalBreeds: catStandards.length,
    filteredCount: filteredBreeds.length
  };
}
