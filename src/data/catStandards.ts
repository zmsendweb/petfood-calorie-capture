
import { CatStandard } from "./types/catTypes";
import { largeCats } from "./cats/largeCats";
import { mediumCats } from "./cats/medium";
import { smallCats } from "./cats/smallCats";
import { exoticCats } from "./cats/exotic";
import { rareCats } from "./cats/rare";

export type { CatStandard };

export const catStandards: CatStandard[] = [
  ...largeCats,
  ...mediumCats,
  ...smallCats,
  ...exoticCats,
  ...rareCats
];

// For convenience when querying the library by size
export const smallCatBreeds = smallCats;
export const mediumCatBreeds = mediumCats;
export const largeCatBreeds = largeCats;
export const exoticCatBreeds = exoticCats;
export const rareCatBreeds = rareCats;

// Utility function to get total count
export const getCatBreedCount = () => {
  return {
    small: smallCats.length,
    medium: mediumCats.length,
    large: largeCats.length,
    exotic: exoticCats.length,
    rare: rareCats.length,
    total: catStandards.length
  };
};
