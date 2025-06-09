
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
        breed.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        breed.origin.toLowerCase().includes(filters.searchTerm.toLowerCase())
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
          
          return breedSize.includes(filterSize);
        })
      );
    }

    // Apply temperament filter
    if (filters.temperament.length > 0) {
      filtered = filtered.filter(breed =>
        filters.temperament.some(temp =>
          breed.temperament.some(breedTemp =>
            breedTemp.toLowerCase().includes(temp.toLowerCase())
          )
        )
      );
    }

    // Apply coat length filter
    if (filters.coatLength.length > 0) {
      filtered = filtered.filter(breed =>
        filters.coatLength.some(coat => {
          const breedCoat = breed.coatLength.toLowerCase();
          const filterCoat = coat.toLowerCase();
          
          // Handle coat length variations
          if (filterCoat === 'short' && (breedCoat.includes('short') || breedCoat.includes('shorthair'))) return true;
          if (filterCoat === 'long' && (breedCoat.includes('long') || breedCoat.includes('longhair'))) return true;
          if (filterCoat === 'medium' && breedCoat.includes('medium')) return true;
          
          return breedCoat.includes(filterCoat);
        })
      );
    }

    // Apply category filter (exotic/rare handling)
    if (filters.category.length > 0) {
      filtered = filtered.filter(breed => {
        return filters.category.some(category => {
          const cat = category.toLowerCase();
          const breedOrigin = breed.origin.toLowerCase();
          const breedName = breed.name.toLowerCase();
          
          // Define exotic breeds
          const exoticBreeds = [
            'bengal', 'savannah', 'serval', 'egyptian mau', 'ocicat', 
            'toyger', 'chausie', 'pixie-bob', 'highlander', 'safari'
          ];
          
          // Define rare breeds
          const rareBreeds = [
            'lykoi', 'peterbald', 'donskoy', 'ukrainian levkoy', 'minskin',
            'bambino', 'dwelf', 'elf cat', 'korat', 'khao manee', 'lapenotiere'
          ];
          
          if (cat === 'exotic') {
            return exoticBreeds.some(exotic => 
              breedName.includes(exotic) || breedOrigin.includes('wild') || breedOrigin.includes('hybrid')
            );
          }
          
          if (cat === 'rare') {
            return rareBreeds.some(rare => breedName.includes(rare)) || 
                   breedOrigin.includes('experimental') || 
                   breedOrigin.includes('developing');
          }
          
          // For other categories, check if it matches breed characteristics
          return breedName.includes(cat) || breedOrigin.includes(cat);
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
