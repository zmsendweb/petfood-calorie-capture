
import { useState, useEffect, useCallback } from "react";
import { BreedImageStorage } from "@/services/breedImageStorage";
import { useAuth } from "@/hooks/useAuth";

interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

export const useBreedImages = () => {
  const [storedImages, setStoredImages] = useState<Record<string, BreedImage>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadImages = useCallback(() => {
    try {
      const images = BreedImageStorage.getStoredImages();
      setStoredImages(images);
      console.log('useBreedImages: Loaded images:', Object.keys(images).length);
    } catch (error) {
      console.error('useBreedImages: Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadImages();

    // Set up storage listener
    const cleanup = BreedImageStorage.setupStorageListener(loadImages);

    return cleanup;
  }, [loadImages]);

  const saveImage = useCallback((breedName: string, imageUrl: string) => {
    const generatedBy = user?.email || 'admin';
    BreedImageStorage.saveImage(breedName, imageUrl, generatedBy);
    // Immediate update for current tab
    loadImages();
  }, [user?.email, loadImages]);

  const removeImage = useCallback((breedName: string) => {
    BreedImageStorage.removeImage(breedName);
    // Immediate update for current tab
    loadImages();
  }, [loadImages]);

  const clearAllImages = useCallback(() => {
    BreedImageStorage.clearAllImages();
    loadImages();
  }, [loadImages]);

  return {
    storedImages,
    isLoading,
    saveImage,
    removeImage,
    clearAllImages,
    refreshImages: loadImages,
    imageCount: Object.keys(storedImages).length
  };
};
