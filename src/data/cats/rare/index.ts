
import { CatStandard } from "../../types/catTypes";
import { rareShorthairs } from "./rareShorthairs";
import { rareLonghairs } from "./rareLonghairs";
import { rareExoticBreeds } from "./rareExotic";

export const rareCats: CatStandard[] = [
  ...rareShorthairs,
  ...rareLonghairs,
  ...rareExoticBreeds
];

// Mark all rare cats with isRare flag
rareCats.forEach(cat => {
  cat.isRare = true;
});
