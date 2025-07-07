
import { useState, useEffect, useCallback } from "react";
import { BreedImageStorage } from "@/services/breedImageStorage";

interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

export const useBreedImages = () => {
  const [storedImages, setStoredImages] = useState<Record<string, BreedImage>>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadImages = useCallback(async () => {
    console.log('useBreedImages: Loading images...');
    try {
      setIsLoading(true);
      const images = await BreedImageStorage.getStoredImages();
      
      console.log('useBreedImages: Successfully loaded images:', Object.keys(images).length);
      
      // Debug individual images
      Object.keys(images).forEach(breedName => {
        const img = images[breedName];
        console.log(`useBreedImages: ${breedName} -> ${img.imageUrl?.substring(0, 50)}...`);
      });
      
      setStoredImages(images);
    } catch (error) {
      console.error('useBreedImages: Error loading images:', error);
      setStoredImages({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('useBreedImages: Effect triggered - initial load');
    
    // Initial load
    loadImages();

    // Set up storage listener for updates
    const cleanup = BreedImageStorage.setupStorageListener(() => {
      console.log('useBreedImages: Storage listener triggered - reloading images');
      loadImages();
    });

    return () => {
      console.log('useBreedImages: Cleaning up listeners');
      cleanup();
    };
  }, [loadImages]);

  const saveImage = useCallback(async (breedName: string, imageUrl: string, generatedBy: string = 'user') => {
    console.log(`useBreedImages: Saving image for "${breedName}":`, imageUrl.substring(0, 50) + '...');
    try {
      await BreedImageStorage.saveImage(breedName, imageUrl, generatedBy);
      console.log(`useBreedImages: Successfully saved image for "${breedName}"`);
      
      // Force immediate update after a short delay
      setTimeout(() => {
        loadImages();
      }, 200);
    } catch (error) {
      console.error(`useBreedImages: Error saving image for "${breedName}":`, error);
    }
  }, [loadImages]);

  const removeImage = useCallback(async (breedName: string) => {
    console.log(`useBreedImages: Removing image for "${breedName}"`);
    try {
      await BreedImageStorage.removeImage(breedName);
      console.log(`useBreedImages: Successfully removed image for "${breedName}"`);
      
      // Force immediate update
      setTimeout(() => {
        loadImages();
      }, 200);
    } catch (error) {
      console.error(`useBreedImages: Error removing image for "${breedName}":`, error);
    }
  }, [loadImages]);

  const clearAllImages = useCallback(async () => {
    console.log('useBreedImages: Clearing all images');
    try {
      await BreedImageStorage.clearAllImages();
      console.log('useBreedImages: Successfully cleared all images');
      
      // Force immediate update
      setTimeout(() => {
        loadImages();
      }, 200);
    } catch (error) {
      console.error('useBreedImages: Error clearing all images:', error);
    }
  }, [loadImages]);

  const hasImage = useCallback((breedName: string) => {
    if (!breedName) return false;
    const trimmedName = breedName.trim();
    const hasImg = !!storedImages[trimmedName];
    console.log(`useBreedImages: hasImage("${trimmedName}") = ${hasImg}`);
    return hasImg;
  }, [storedImages]);

  const getImage = useCallback((breedName: string) => {
    if (!breedName) return null;
    const trimmedName = breedName.trim();
    const image = storedImages[trimmedName] || null;
    console.log(`useBreedImages: getImage("${trimmedName}") =`, image ? 'found' : 'not found');
    return image;
  }, [storedImages]);

  const debugStorage = useCallback(async () => {
    await BreedImageStorage.debugStorage();
  }, []);

  return {
    storedImages,
    isLoading,
    saveImage,
    removeImage,
    clearAllImages,
    refreshImages: loadImages,
    imageCount: Object.keys(storedImages).length,
    hasImage,
    getImage,
    debugStorage
  };
};
