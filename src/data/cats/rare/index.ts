
import { CatStandard } from "../../types/catTypes";
import { rareShorthairs } from "./rareShorthairs";
import { rareLonghairs } from "./rareLonghairs";
import { rareExoticBreeds } from "./rareExotic";

export const rareCats: CatStandard[] = [
  ...rareShorthairs,
  ...rareLonghairs,
  ...rareExoticBreeds
];
