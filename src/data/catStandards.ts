
import { CatStandard } from "./types/catTypes";
import { largeCats } from "./cats/largeCats";
import { mediumCats } from "./cats/mediumCats";
import { smallCats } from "./cats/smallCats";

export type { CatStandard };

export const catStandards: CatStandard[] = [
  ...largeCats,
  ...mediumCats,
  ...smallCats
];
