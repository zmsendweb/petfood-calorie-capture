
import { CatStandard } from "../../types/catTypes";
import { exoticShorthairs } from "./exoticShorthairs";
import { exoticLonghairs } from "./exoticLonghairs";

export const exoticCats: CatStandard[] = [
  ...exoticShorthairs,
  ...exoticLonghairs
];
