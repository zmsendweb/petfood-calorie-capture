import { supabase } from "@/integrations/supabase/client";

interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

const STORAGE_KEY = 'pet-breed-images-backup';

export class BreedImageStorage {
  // Get images from database with localStorage fallback
  static async getStoredImages(): Promise<Record<string, BreedImage>> {
    console.log('BreedImageStorage: Loading images from database...');
    
    try {
      // First try to get from database
      const { data: dbImages, error } = await supabase
        .from('breed_images')
        .select('*');

      if (error) {
        console.error('BreedImageStorage: Database error:', error);
        // Fall back to localStorage
        return this.getLocalStorageImages();
      }

      // Convert database format to our format
      const images: Record<string, BreedImage> = {};
      if (dbImages) {
        dbImages.forEach(img => {
          images[img.breed_name] = {
            breedName: img.breed_name,
            imageUrl: img.image_url,
            generatedAt: img.created_at,
            generatedBy: img.generated_by || 'user'
          };
        });
      }

      console.log('BreedImageStorage: Found', Object.keys(images).length, 'images in database');
      return images;
    } catch (error) {
      console.error('BreedImageStorage: Error getting images from database:', error);
      // Fall back to localStorage
      return this.getLocalStorageImages();
    }
  }

  // Fallback method for localStorage
  private static getLocalStorageImages(): Record<string, BreedImage> {
    console.log('BreedImageStorage: Falling back to localStorage...');
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return {};

      const parsed = JSON.parse(stored);
      const localImages: Record<string, BreedImage> = {};
      
      if (typeof parsed === 'object' && parsed !== null) {
        Object.keys(parsed).forEach(key => {
          const img = parsed[key];
          if (img && img.breedName && img.imageUrl && img.generatedAt) {
            localImages[key] = {
              breedName: img.breedName,
              imageUrl: img.imageUrl,
              generatedAt: img.generatedAt,
              generatedBy: img.generatedBy || 'user'
            };
          }
        });
      }

      console.log('BreedImageStorage: Found', Object.keys(localImages).length, 'images in localStorage');
      return localImages;
    } catch (error) {
      console.error('BreedImageStorage: Error reading localStorage:', error);
      return {};
    }
  }

  // Save image to database with localStorage backup
  static async saveImage(breedName: string, imageUrl: string, generatedBy: string = 'user'): Promise<void> {
    if (!breedName || !imageUrl) {
      console.error('BreedImageStorage: Invalid parameters for saveImage');
      throw new Error('Breed name and image URL are required');
    }

    console.log(`BreedImageStorage: Saving image for "${breedName}":`, imageUrl.substring(0, 50) + '...');
    
    const trimmedName = breedName.trim();
    
    try {
      // Try to save to database first
      const { error } = await supabase
        .from('breed_images')
        .upsert({
          breed_name: trimmedName,
          image_url: imageUrl,
          generated_by: generatedBy
        }, { 
          onConflict: 'breed_name'
        });

      if (error) {
        console.error('BreedImageStorage: Database save error:', error);
      } else {
        console.log(`BreedImageStorage: Successfully saved image for "${trimmedName}" to database`);
      }
      
      // Also save to localStorage as backup
      await this.saveToLocalStorage(trimmedName, imageUrl, generatedBy);
      
      // Trigger events to notify other components
      this.triggerStorageEvent();
    } catch (error) {
      console.error(`BreedImageStorage: Error saving image for "${breedName}":`, error);
      // Fall back to localStorage only
      await this.saveToLocalStorage(trimmedName, imageUrl, generatedBy);
      this.triggerStorageEvent();
    }
  }

  // Save to localStorage method
  private static async saveToLocalStorage(breedName: string, imageUrl: string, generatedBy: string): Promise<void> {
    try {
      const currentImages = this.getLocalStorageImages();
      
      const newImage: BreedImage = {
        breedName: breedName,
        imageUrl: imageUrl,
        generatedAt: new Date().toISOString(),
        generatedBy: generatedBy
      };

      currentImages[breedName] = newImage;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
      
      console.log(`BreedImageStorage: Saved to localStorage for "${breedName}"`);
    } catch (error) {
      console.error(`BreedImageStorage: Error saving to localStorage for "${breedName}":`, error);
    }
  }

  // Remove image from database and localStorage
  static async removeImage(breedName: string): Promise<void> {
    if (!breedName) {
      console.error('BreedImageStorage: Invalid breed name for removal');
      return;
    }

    const trimmedName = breedName.trim();
    console.log(`BreedImageStorage: Removing image for "${trimmedName}"`);
    
    try {
      // Remove from database
      const { error } = await supabase
        .from('breed_images')
        .delete()
        .eq('breed_name', trimmedName);

      if (error) {
        console.error('BreedImageStorage: Database delete error:', error);
      }

      // Also remove from localStorage
      const currentImages = this.getLocalStorageImages();
      if (currentImages[trimmedName]) {
        delete currentImages[trimmedName];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
      }
      
      console.log(`BreedImageStorage: Successfully removed image for "${trimmedName}"`);
      this.triggerStorageEvent();
    } catch (error) {
      console.error('BreedImageStorage: Error removing image:', error);
    }
  }

  // Clear all images from database and localStorage
  static async clearAllImages(): Promise<void> {
    console.log('BreedImageStorage: Clearing all images');
    
    try {
      // Clear from database (delete all rows)
      const { error } = await supabase
        .from('breed_images')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) {
        console.error('BreedImageStorage: Database clear error:', error);
      }

      // Clear localStorage
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
      
      // Check database directly
      const { data: dbImages, error } = await supabase
        .from('breed_images')
        .select('breed_name, image_url, created_at, generated_by');
      
      if (error) {
        console.error('- Database query error:', error);
      } else {
        console.log('- Database images count:', dbImages?.length || 0);
        console.log('- Database breed names:', dbImages?.map(img => img.breed_name) || []);
      }
      
    } catch (error) {
      console.error('- Debug error:', error);
    }
    
    console.log('=== BreedImageStorage DEBUG END ===');
  }
}