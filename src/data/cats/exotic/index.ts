
import { CatStandard } from "../../types/catTypes";
import { exoticShorthairs } from "./exoticShorthairs";
import { exoticLonghairs } from "./exoticLonghairs";

export const exoticCats: CatStandard[] = [
  ...exoticShorthairs,
  ...exoticLonghairs
];

// Mark all exotic cats with isExotic flag
exoticCats.forEach(cat => {
  cat.isExotic = true;
});
