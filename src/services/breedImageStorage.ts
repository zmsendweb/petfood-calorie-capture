
interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
}

const STORAGE_KEY = 'admin-breed-images';

export class BreedImageStorage {
  static getStoredImages(): Record<string, BreedImage> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('BreedImageStorage: Loaded images from localStorage:', Object.keys(parsed).length);
        return parsed;
      }
      console.log('BreedImageStorage: No stored images found');
      return {};
    } catch (error) {
      console.error('BreedImageStorage: Error loading stored images:', error);
      return {};
    }
  }

  static saveImage(breedName: string, imageUrl: string): void {
    try {
      const currentImages = this.getStoredImages();
      const newBreedImage: BreedImage = {
        breedName,
        imageUrl,
        generatedAt: new Date().toISOString()
      };
      
      const updatedImages = {
        ...currentImages,
        [breedName]: newBreedImage
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      console.log(`BreedImageStorage: Saved image for ${breedName}:`, imageUrl);
      
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(updatedImages),
        storageArea: localStorage
      }));
    } catch (error) {
      console.error('BreedImageStorage: Error saving image:', error);
    }
  }

  static removeImage(breedName: string): void {
    try {
      const currentImages = this.getStoredImages();
      delete currentImages[breedName];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
      console.log(`BreedImageStorage: Removed image for ${breedName}`);
      
      // Trigger storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(currentImages),
        storageArea: localStorage
      }));
    } catch (error) {
      console.error('BreedImageStorage: Error removing image:', error);
    }
  }

  static setupStorageListener(callback: () => void): () => void {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        console.log('BreedImageStorage: Storage change detected, reloading images');
        callback();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for manual dispatched events (same-tab updates)
    const handleCustomEvent = () => callback();
    window.addEventListener('storage', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage', handleCustomEvent);
    };
  }
}
