
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

  const loadImages = useCallback(() => {
    console.log('useBreedImages: Loading images...');
    try {
      const images = BreedImageStorage.getStoredImages();
      setStoredImages(images);
      console.log('useBreedImages: Successfully loaded images:', Object.keys(images).length);
      
      // Debug individual images
      Object.keys(images).forEach(breedName => {
        console.log(`useBreedImages: ${breedName} -> ${images[breedName].imageUrl.substring(0, 50)}...`);
      });
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

    // Set up storage listener
    const cleanup = BreedImageStorage.setupStorageListener(() => {
      console.log('useBreedImages: Storage listener triggered - reloading images');
      loadImages();
    });

    return () => {
      console.log('useBreedImages: Cleaning up listeners');
      cleanup();
    };
  }, [loadImages]);

  const saveImage = useCallback((breedName: string, imageUrl: string, generatedBy: string = 'user') => {
    console.log(`useBreedImages: Saving image for "${breedName}":`, imageUrl.substring(0, 50) + '...');
    BreedImageStorage.saveImage(breedName, imageUrl, generatedBy);
    // Force immediate update
    setTimeout(() => {
      loadImages();
    }, 100);
  }, [loadImages]);

  const removeImage = useCallback((breedName: string) => {
    console.log(`useBreedImages: Removing image for "${breedName}"`);
    BreedImageStorage.removeImage(breedName);
    // Force immediate update
    setTimeout(() => {
      loadImages();
    }, 100);
  }, [loadImages]);

  const clearAllImages = useCallback(() => {
    console.log('useBreedImages: Clearing all images');
    BreedImageStorage.clearAllImages();
    // Force immediate update
    setTimeout(() => {
      loadImages();
    }, 100);
  }, [loadImages]);

  const hasImage = useCallback((breedName: string) => {
    const hasImg = BreedImageStorage.hasImage(breedName);
    console.log(`useBreedImages: hasImage("${breedName}") = ${hasImg}`);
    return hasImg;
  }, []);

  const getImage = useCallback((breedName: string) => {
    const image = BreedImageStorage.getImage(breedName);
    console.log(`useBreedImages: getImage("${breedName}") =`, image ? 'found' : 'not found');
    return image;
  }, []);

  const debugStorage = useCallback(() => {
    BreedImageStorage.debugStorage();
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
