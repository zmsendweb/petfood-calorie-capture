
import { useState, useEffect } from "react";
import { PetProfile } from "@/data/types/petTypes";

// Mock data for initial pet profiles
const initialPetProfiles: PetProfile[] = [
  {
    id: "1",
    name: "Max",
    type: "dog",
    breed: "Labrador Retriever",
    age: 3,
    ageUnit: "years",
    weight: 30,
    weightUnit: "kg",
    gender: "male",
    activityLevel: "high",
    photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80",
    notes: "Loves long walks and playing fetch.",
    dailyCalorieTarget: 1800,
    preferredFoods: ["Chicken", "Beef"],
    dietaryRestrictions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function usePetProfiles() {
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>(() => {
    const savedProfiles = localStorage.getItem("petProfiles");
    return savedProfiles ? JSON.parse(savedProfiles) : initialPetProfiles;
  });

  useEffect(() => {
    localStorage.setItem("petProfiles", JSON.stringify(petProfiles));
  }, [petProfiles]);

  const addPetProfile = (newPet: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => {
    const petWithId: PetProfile = {
      ...newPet,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPetProfiles(prev => [...prev, petWithId]);
    return petWithId;
  };

  const updatePetProfile = (id: string, updates: Partial<Omit<PetProfile, "id" | "createdAt">>) => {
    setPetProfiles(prev => 
      prev.map(pet => 
        pet.id === id 
          ? { ...pet, ...updates, updatedAt: new Date() } 
          : pet
      )
    );
  };

  const deletePetProfile = (id: string) => {
    setPetProfiles(prev => prev.filter(pet => pet.id !== id));
  };

  const getPetProfile = (id: string) => {
    return petProfiles.find(pet => pet.id === id);
  };

  return {
    petProfiles,
    addPetProfile,
    updatePetProfile,
    deletePetProfile,
    getPetProfile
  };
}
