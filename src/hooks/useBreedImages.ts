
import { useState, useEffect } from "react";
import { BreedImageStorage } from "@/services/breedImageStorage";

interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
}

export const useBreedImages = () => {
  const [storedImages, setStoredImages] = useState<Record<string, BreedImage>>({});

  const loadImages = () => {
    const images = BreedImageStorage.getStoredImages();
    setStoredImages(images);
    console.log('useBreedImages: Loaded images:', Object.keys(images).length);
  };

  useEffect(() => {
    // Initial load
    loadImages();

    // Set up storage listener
    const cleanup = BreedImageStorage.setupStorageListener(loadImages);

    // Also check periodically for same-tab updates
    const interval = setInterval(loadImages, 2000);

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, []);

  const saveImage = (breedName: string, imageUrl: string) => {
    BreedImageStorage.saveImage(breedName, imageUrl);
    loadImages(); // Immediate update
  };

  const removeImage = (breedName: string) => {
    BreedImageStorage.removeImage(breedName);
    loadImages(); // Immediate update
  };

  return {
    storedImages,
    saveImage,
    removeImage,
    refreshImages: loadImages
  };
};
