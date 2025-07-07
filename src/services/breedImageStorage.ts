
interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

const STORAGE_KEY = 'pet-breed-images-v2'; // Updated version key for fresh start

export class BreedImageStorage {
  static getStoredImages(): Record<string, BreedImage> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate the structure
        if (typeof parsed === 'object' && parsed !== null) {
          console.log('BreedImageStorage: Successfully loaded images:', Object.keys(parsed).length);
          return parsed;
        }
      }
      console.log('BreedImageStorage: No stored images found, returning empty object');
      return {};
    } catch (error) {
      console.error('BreedImageStorage: Error loading stored images:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  }

  static saveImage(breedName: string, imageUrl: string, generatedBy: string = 'user'): void {
    try {
      // Validate inputs
      if (!breedName || !imageUrl) {
        console.error('BreedImageStorage: Invalid breed name or image URL');
        return;
      }

      const currentImages = this.getStoredImages();
      const newBreedImage: BreedImage = {
        breedName: breedName.trim(),
        imageUrl: imageUrl.trim(),
        generatedAt: new Date().toISOString(),
        generatedBy: generatedBy.trim()
      };
      
      const updatedImages = {
        ...currentImages,
        [breedName.trim()]: newBreedImage
      };
      
      // Save to localStorage
      const serialized = JSON.stringify(updatedImages);
      localStorage.setItem(STORAGE_KEY, serialized);
      
      console.log(`BreedImageStorage: Successfully saved image for "${breedName}":`, imageUrl);
      console.log('BreedImageStorage: Total images stored:', Object.keys(updatedImages).length);
      
      // Trigger events for cross-tab and same-tab updates
      this.triggerStorageEvent(updatedImages);
    } catch (error) {
      console.error('BreedImageStorage: Error saving image:', error);
    }
  }

  static removeImage(breedName: string): void {
    try {
      if (!breedName) {
        console.error('BreedImageStorage: Invalid breed name for removal');
        return;
      }

      const currentImages = this.getStoredImages();
      const trimmedBreedName = breedName.trim();
      
      if (currentImages[trimmedBreedName]) {
        delete currentImages[trimmedBreedName];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
        console.log(`BreedImageStorage: Successfully removed image for "${trimmedBreedName}"`);
        this.triggerStorageEvent(currentImages);
      } else {
        console.log(`BreedImageStorage: No image found for "${trimmedBreedName}" to remove`);
      }
    } catch (error) {
      console.error('BreedImageStorage: Error removing image:', error);
    }
  }

  static clearAllImages(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('BreedImageStorage: Successfully cleared all images');
      this.triggerStorageEvent({});
    } catch (error) {
      console.error('BreedImageStorage: Error clearing images:', error);
    }
  }

  private static triggerStorageEvent(updatedImages: Record<string, BreedImage>): void {
    try {
      // Dispatch custom event for same-tab updates
      const customEvent = new CustomEvent('breed-images-updated', {
        detail: { 
          images: updatedImages,
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(customEvent);
      
      // Also dispatch storage event for cross-tab sync
      const storageEvent = new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(updatedImages),
        oldValue: null,
        storageArea: localStorage,
        url: window.location.href
      });
      window.dispatchEvent(storageEvent);
      
      console.log('BreedImageStorage: Events dispatched successfully');
    } catch (error) {
      console.error('BreedImageStorage: Error dispatching events:', error);
    }
  }

  static setupStorageListener(callback: () => void): () => void {
    console.log('BreedImageStorage: Setting up storage listeners');
    
    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        console.log('BreedImageStorage: Storage change detected from other tab');
        callback();
      }
    };

    // Listen for custom events from same tab
    const handleCustomEvent = (e: CustomEvent) => {
      console.log('BreedImageStorage: Custom event detected in same tab');
      callback();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('breed-images-updated', handleCustomEvent as EventListener);
    
    return () => {
      console.log('BreedImageStorage: Cleaning up storage listeners');
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('breed-images-updated', handleCustomEvent as EventListener);
    };
  }

  static getImageCount(): number {
    return Object.keys(this.getStoredImages()).length;
  }

  static hasImage(breedName: string): boolean {
    if (!breedName) return false;
    const images = this.getStoredImages();
    const hasImg = breedName.trim() in images;
    console.log(`BreedImageStorage: hasImage("${breedName}") = ${hasImg}`);
    return hasImg;
  }

  static getImage(breedName: string): BreedImage | null {
    if (!breedName) return null;
    const images = this.getStoredImages();
    const image = images[breedName.trim()] || null;
    console.log(`BreedImageStorage: getImage("${breedName}") =`, image ? 'found' : 'not found');
    return image;
  }

  // Debug method to inspect current storage
  static debugStorage(): void {
    const images = this.getStoredImages();
    console.log('BreedImageStorage DEBUG:');
    console.log('- Storage key:', STORAGE_KEY);
    console.log('- Total images:', Object.keys(images).length);
    console.log('- Breed names:', Object.keys(images));
    console.log('- Full data:', images);
  }
}
