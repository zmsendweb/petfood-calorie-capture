
export interface ShowDogBreed {
  name: string;
  size: "Small" | "Medium" | "Large";
  group: string;
  origin: string;
  temperament: string;
  showStandards: string;
  popularityRank: number;
}

export interface ShowCatBreed {
  name: string;
  size: "Small" | "Medium" | "Large";
  coatType: string;
  origin: string;
  temperament: string;
  showStandards: string;
  popularityRank: number;
}
