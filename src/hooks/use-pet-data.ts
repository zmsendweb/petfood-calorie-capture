
import { useState, useEffect } from 'react';
import { PetProfile } from '@/data/types/petTypes';

// This hook would normally connect to your database/API
// For now, using mock data that represents what would come from user's account
export function usePetData() {
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user's pets
    const fetchPets = async () => {
      setIsLoading(true);
      
      // Mock data - in real implementation, this would be an API call
      const mockPets: PetProfile[] = [
        {
          id: "1",
          name: "Buddy",
          type: "dog",
          breed: "Golden Retriever", 
          age: 3,
          ageUnit: "years",
          weight: 65,
          weightUnit: "lb",
          gender: "male",
          activityLevel: "moderate",
          dailyCalorieTarget: 1200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "2", 
          name: "Whiskers",
          type: "cat",
          breed: "Persian",
          age: 2,
          ageUnit: "years", 
          weight: 10,
          weightUnit: "lb",
          gender: "female",
          activityLevel: "low",
          dailyCalorieTarget: 300,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "3",
          name: "Max",
          type: "dog", 
          breed: "Labrador",
          age: 5,
          ageUnit: "years",
          weight: 70,
          weightUnit: "lb", 
          gender: "male",
          activityLevel: "high",
          dailyCalorieTarget: 1400,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPets(mockPets);
      setIsLoading(false);
    };

    fetchPets();
  }, []);

  return { pets, isLoading };
}
