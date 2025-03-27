
export interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  foodName?: string;
  brandName?: string;
  serving?: string;
  timestamp: Date;
  petId?: string;
}
