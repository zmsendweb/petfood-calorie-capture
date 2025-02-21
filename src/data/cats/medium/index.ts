
import { CatStandard } from "../../types/catTypes";
import { traditionalMediumBreeds } from "./traditionalBreeds";
import { specialtyMediumBreeds } from "./specialtyBreeds";
import { modernMediumBreeds } from "./modernBreeds";

export const mediumCats: CatStandard[] = [
  ...traditionalMediumBreeds,
  ...specialtyMediumBreeds,
  ...modernMediumBreeds
];
