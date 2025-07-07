
interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

const STORAGE_KEY = 'pet-breed-images-global-v2';

export class BreedImageStorage {
  // Get images from localStorage with enhanced cross-browser support
  static async getStoredImages(): Promise<Record<string, BreedImage>> {
    try {
      console.log('BreedImageStorage: Loading images from localStorage...');
      
      // Try to get from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          console.log('BreedImageStorage: Successfully loaded images from localStorage:', Object.keys(parsed).length);
          
          // Validate each image entry
          const validatedImages: Record<string, BreedImage> = {};
          Object.keys(parsed).forEach(key => {
            const img = parsed[key];
            if (img && img.breedName && img.imageUrl && img.generatedAt) {
              validatedImages[key] = {
                breedName: img.breedName,
                imageUrl: img.imageUrl,
                generatedAt: img.generatedAt,
                generatedBy: img.generatedBy || 'user'
              };
            }
          });
          
          console.log('BreedImageStorage: Validated images:', Object.keys(validatedImages).length);
          return validatedImages;
        }
      }
      
      console.log('BreedImageStorage: No stored images found, returning empty object');
      return {};
    } catch (error) {
      console.error('BreedImageStorage: Error loading stored images:', error);
      // Clear corrupted data
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (clearError) {
        console.error('BreedImageStorage: Error clearing corrupted data:', clearError);
      }
      return {};
    }
  }

  static async saveImage(breedName: string, imageUrl: string, generatedBy: string = 'user'): Promise<void> {
    try {
      if (!breedName || !imageUrl) {
        console.error('BreedImageStorage: Invalid breed name or image URL');
        return;
      }

      const trimmedBreedName = breedName.trim();
      const trimmedImageUrl = imageUrl.trim();
      const trimmedGeneratedBy = generatedBy.trim();

      console.log(`BreedImageStorage: Saving image for "${trimmedBreedName}"`);

      // Get current images
      const currentImages = await this.getStoredImages();
      
      // Create new breed image entry
      const newBreedImage: BreedImage = {
        breedName: trimmedBreedName,
        imageUrl: trimmedImageUrl,
        generatedAt: new Date().toISOString(),
        generatedBy: trimmedGeneratedBy
      };
      
      // Update the images object
      const updatedImages = {
        ...currentImages,
        [trimmedBreedName]: newBreedImage
      };
      
      // Save to localStorage with error handling
      try {
        const dataToStore = JSON.stringify(updatedImages);
        localStorage.setItem(STORAGE_KEY, dataToStore);
        console.log(`BreedImageStorage: Successfully saved image for "${trimmedBreedName}"`);
        
        // Verify the save worked
        const verification = localStorage.getItem(STORAGE_KEY);
        if (verification) {
          console.log('BreedImageStorage: Save verification successful');
        } else {
          throw new Error('Save verification failed');
        }
      } catch (storageError) {
        console.error('BreedImageStorage: LocalStorage save failed:', storageError);
        throw storageError;
      }
      
      // Trigger storage event for cross-tab communication
      this.triggerStorageEvent();
      
      // Also trigger a custom event for same-tab updates
      setTimeout(() => {
        this.triggerStorageEvent();
      }, 100);
      
    } catch (error) {
      console.error('BreedImageStorage: Error saving image:', error);
      throw error;
    }
  }

  static async removeImage(breedName: string): Promise<void> {
    try {
      if (!breedName) {
        console.error('BreedImageStorage: Invalid breed name for removal');
        return;
      }

      const trimmedBreedName = breedName.trim();
      console.log(`BreedImageStorage: Removing image for "${trimmedBreedName}"`);

      const currentImages = await this.getStoredImages();
      if (currentImages[trimmedBreedName]) {
        delete currentImages[trimmedBreedName];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
        console.log(`BreedImageStorage: Successfully removed image for "${trimmedBreedName}"`);
        this.triggerStorageEvent();
      } else {
        console.log(`BreedImageStorage: No image found for "${trimmedBreedName}" to remove`);
      }
    } catch (error) {
      console.error('BreedImageStorage: Error removing image:', error);
    }
  }

  static async clearAllImages(): Promise<void> {
    try {
      console.log('BreedImageStorage: Clearing all images');
      localStorage.removeItem(STORAGE_KEY);
      console.log('BreedImageStorage: Successfully cleared all images');
      this.triggerStorageEvent();
    } catch (error) {
      console.error('BreedImageStorage: Error clearing images:', error);
    }
  }

  private static triggerStorageEvent(): void {
    try {
      // Dispatch custom event for same-tab updates
      const customEvent = new CustomEvent('breed-images-updated', {
        detail: { 
          timestamp: Date.now(),
          source: 'breed-image-storage'
        }
      });
      window.dispatchEvent(customEvent);
      
      // Also dispatch storage event for cross-tab communication
      const storageEvent = new CustomEvent('storage', {
        detail: {
          key: STORAGE_KEY,
          newValue: localStorage.getItem(STORAGE_KEY),
          url: window.location.href
        }
      });
      window.dispatchEvent(storageEvent);
      
      console.log('BreedImageStorage: Events dispatched successfully');
    } catch (error) {
      console.error('BreedImageStorage: Error dispatching events:', error);
    }
  }

  static setupStorageListener(callback: () => void): () => void {
    console.log('BreedImageStorage: Setting up storage listeners');
    
    const handleCustomEvent = (e: Event) => {
      console.log('BreedImageStorage: Custom event detected', e);
      callback();
    };

    const handleStorageEvent = (e: Event) => {
      console.log('BreedImageStorage: Storage event detected', e);
      callback();
    };

    // Listen for custom events (same tab)
    window.addEventListener('breed-images-updated', handleCustomEvent);
    
    // Listen for storage events (cross-tab)
    window.addEventListener('storage', handleStorageEvent);
    
    return () => {
      console.log('BreedImageStorage: Cleaning up storage listeners');
      window.removeEventListener('breed-images-updated', handleCustomEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }

  static async getImageCount(): Promise<number> {
    const images = await this.getStoredImages();
    const count = Object.keys(images).length;
    console.log(`BreedImageStorage: Image count: ${count}`);
    return count;
  }

  static async hasImage(breedName: string): Promise<boolean> {
    if (!breedName) return false;
    const images = await this.getStoredImages();
    const trimmedName = breedName.trim();
    const hasImg = trimmedName in images;
    console.log(`BreedImageStorage: hasImage("${trimmedName}") = ${hasImg}`);
    return hasImg;
  }

  static async getImage(breedName: string): Promise<BreedImage | null> {
    if (!breedName) return null;
    const images = await this.getStoredImages();
    const trimmedName = breedName.trim();
    const image = images[trimmedName] || null;
    console.log(`BreedImageStorage: getImage("${trimmedName}") =`, image ? 'found' : 'not found');
    return image;
  }

  static async debugStorage(): Promise<void> {
    console.log('=== BreedImageStorage DEBUG START ===');
    console.log('- Storage key:', STORAGE_KEY);
    
    try {
      const images = await this.getStoredImages();
      console.log('- Total images:', Object.keys(images).length);
      console.log('- Breed names:', Object.keys(images));
      
      // Debug each image
      Object.keys(images).forEach(breedName => {
        const img = images[breedName];
        console.log(`- ${breedName}:`, {
          url: img.imageUrl?.substring(0, 50) + '...',
          generatedAt: img.generatedAt,
          generatedBy: img.generatedBy
        });
      });
      
      // Check localStorage directly
      const rawData = localStorage.getItem(STORAGE_KEY);
      console.log('- Raw localStorage data length:', rawData?.length || 0);
      
      // Test localStorage functionality
      const testKey = 'breed-storage-test';
      const testValue = 'test-' + Date.now();
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      console.log('- LocalStorage test passed:', retrieved === testValue);
      
    } catch (error) {
      console.error('- Debug error:', error);
    }
    
    console.log('=== BreedImageStorage DEBUG END ===');
  }
}
