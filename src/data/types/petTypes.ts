
export interface PetProfile {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  age: number;
  ageUnit: 'years' | 'months' | 'weeks';
  weight: number;
  weightUnit: 'kg' | 'lb';
  gender: 'male' | 'female' | 'unknown';
  activityLevel: 'low' | 'moderate' | 'high';
  photo?: string;
  notes?: string;
  dailyCalorieTarget?: number;
  preferredFoods?: string[];
  dietaryRestrictions?: string[];
  lastFed?: Date;
  createdAt: Date;
  updatedAt: Date;
}
