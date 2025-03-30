
import { CatStandard } from "../../types/catTypes";
import { rareShorthairs } from "./rareShorthairs";
import { rareLonghairs } from "./rareLonghairs";

export const rareCats: CatStandard[] = [
  ...rareShorthairs,
  ...rareLonghairs
];
