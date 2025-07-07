
interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

const STORAGE_KEY = 'pet-breed-images-global'; // Global storage key

export class BreedImageStorage {
  static getStoredImages(): Record<string, BreedImage> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('BreedImageStorage: Loaded global images from localStorage:', Object.keys(parsed).length);
        return parsed;
      }
      console.log('BreedImageStorage: No global stored images found');
      return {};
    } catch (error) {
      console.error('BreedImageStorage: Error loading stored images:', error);
      return {};
    }
  }

  static saveImage(breedName: string, imageUrl: string, generatedBy: string = 'user'): void {
    try {
      const currentImages = this.getStoredImages();
      const newBreedImage: BreedImage = {
        breedName,
        imageUrl,
        generatedAt: new Date().toISOString(),
        generatedBy
      };
      
      const updatedImages = {
        ...currentImages,
        [breedName]: newBreedImage
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      console.log(`BreedImageStorage: Saved global image for ${breedName}:`, imageUrl);
      
      // Trigger storage event for cross-tab synchronization
      this.triggerStorageEvent(updatedImages);
    } catch (error) {
      console.error('BreedImageStorage: Error saving image:', error);
    }
  }

  static removeImage(breedName: string): void {
    try {
      const currentImages = this.getStoredImages();
      delete currentImages[breedName];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
      console.log(`BreedImageStorage: Removed global image for ${breedName}`);
      
      // Trigger storage event
      this.triggerStorageEvent(currentImages);
    } catch (error) {
      console.error('BreedImageStorage: Error removing image:', error);
    }
  }

  static clearAllImages(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('BreedImageStorage: Cleared all global images');
      this.triggerStorageEvent({});
    } catch (error) {
      console.error('BreedImageStorage: Error clearing images:', error);
    }
  }

  private static triggerStorageEvent(updatedImages: Record<string, BreedImage>): void {
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('breed-images-updated-global', {
      detail: { images: updatedImages }
    }));
    
    // Also dispatch storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(updatedImages),
      storageArea: localStorage
    }));
  }

  static setupStorageListener(callback: () => void): () => void {
    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        console.log('BreedImageStorage: Global storage change detected from other tab');
        callback();
      }
    };

    // Listen for custom events from same tab
    const handleCustomEvent = (e: CustomEvent) => {
      console.log('BreedImageStorage: Global custom event detected in same tab');
      callback();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('breed-images-updated-global', handleCustomEvent as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('breed-images-updated-global', handleCustomEvent as EventListener);
    };
  }

  static getImageCount(): number {
    return Object.keys(this.getStoredImages()).length;
  }

  static hasImage(breedName: string): boolean {
    const images = this.getStoredImages();
    return breedName in images;
  }

  static getImage(breedName: string): BreedImage | null {
    const images = this.getStoredImages();
    return images[breedName] || null;
  }
}
