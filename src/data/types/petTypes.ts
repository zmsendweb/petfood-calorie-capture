
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
  
  // New personality fields
  personality?: string[];
  temperament?: 'calm' | 'balanced' | 'energetic';
  likesAndPreferences?: string[];
  dislikesAndAversions?: string[];
  healthConditions?: string[];
  
  // New aspirational goals
  shortTermGoals?: string[];
  longTermGoals?: string[];
  progressNotes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
