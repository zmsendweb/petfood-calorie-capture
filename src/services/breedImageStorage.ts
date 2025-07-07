
import { supabase } from "@/integrations/supabase/client";

interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
  generatedBy: string;
}

const STORAGE_KEY = 'pet-breed-images-global';

export class BreedImageStorage {
  // Try to get images from database first, then localStorage as fallback
  static async getStoredImages(): Promise<Record<string, BreedImage>> {
    try {
      // First try to get from database (public access, no auth required)
      const { data: dbImages, error } = await supabase
        .from('breed_images')
        .select('*');

      if (!error && dbImages) {
        const imageMap: Record<string, BreedImage> = {};
        dbImages.forEach((img: any) => {
          imageMap[img.breed_name] = {
            breedName: img.breed_name,
            imageUrl: img.image_url,
            generatedAt: img.created_at,
            generatedBy: img.generated_by || 'unknown'
          };
        });
        console.log('BreedImageStorage: Successfully loaded images from database:', Object.keys(imageMap).length);
        return imageMap;
      }
    } catch (dbError) {
      console.log('BreedImageStorage: Database not available, falling back to localStorage');
    }

    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          console.log('BreedImageStorage: Successfully loaded images from localStorage:', Object.keys(parsed).length);
          return parsed;
        }
      }
      console.log('BreedImageStorage: No stored images found, returning empty object');
      return {};
    } catch (error) {
      console.error('BreedImageStorage: Error loading stored images:', error);
      localStorage.removeItem(STORAGE_KEY);
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

      // Try to save to database first
      try {
        const { error: dbError } = await supabase
          .from('breed_images')
          .upsert({
            breed_name: trimmedBreedName,
            image_url: trimmedImageUrl,
            generated_by: trimmedGeneratedBy,
            created_at: new Date().toISOString()
          }, {
            onConflict: 'breed_name'
          });

        if (!dbError) {
          console.log(`BreedImageStorage: Successfully saved image to database for "${trimmedBreedName}"`);
          this.triggerStorageEvent();
          return;
        }
      } catch (dbError) {
        console.log('BreedImageStorage: Database save failed, falling back to localStorage');
      }

      // Fallback to localStorage
      const currentImages = await this.getStoredImages();
      const newBreedImage: BreedImage = {
        breedName: trimmedBreedName,
        imageUrl: trimmedImageUrl,
        generatedAt: new Date().toISOString(),
        generatedBy: trimmedGeneratedBy
      };
      
      const updatedImages = {
        ...currentImages,
        [trimmedBreedName]: newBreedImage
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      console.log(`BreedImageStorage: Successfully saved image to localStorage for "${trimmedBreedName}"`);
      
      this.triggerStorageEvent();
    } catch (error) {
      console.error('BreedImageStorage: Error saving image:', error);
    }
  }

  static async removeImage(breedName: string): Promise<void> {
    try {
      if (!breedName) {
        console.error('BreedImageStorage: Invalid breed name for removal');
        return;
      }

      const trimmedBreedName = breedName.trim();

      // Try to remove from database first
      try {
        const { error: dbError } = await supabase
          .from('breed_images')
          .delete()
          .eq('breed_name', trimmedBreedName);

        if (!dbError) {
          console.log(`BreedImageStorage: Successfully removed image from database for "${trimmedBreedName}"`);
          this.triggerStorageEvent();
          return;
        }
      } catch (dbError) {
        console.log('BreedImageStorage: Database removal failed, trying localStorage');
      }

      // Fallback to localStorage
      const currentImages = await this.getStoredImages();
      if (currentImages[trimmedBreedName]) {
        delete currentImages[trimmedBreedName];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentImages));
        console.log(`BreedImageStorage: Successfully removed image from localStorage for "${trimmedBreedName}"`);
        this.triggerStorageEvent();
      }
    } catch (error) {
      console.error('BreedImageStorage: Error removing image:', error);
    }
  }

  static async clearAllImages(): Promise<void> {
    try {
      // Try to clear database first
      try {
        const { error: dbError } = await supabase
          .from('breed_images')
          .delete()
          .neq('breed_name', ''); // Delete all records

        if (!dbError) {
          console.log('BreedImageStorage: Successfully cleared all images from database');
        }
      } catch (dbError) {
        console.log('BreedImageStorage: Database clear failed');
      }

      // Also clear localStorage
      localStorage.removeItem(STORAGE_KEY);
      console.log('BreedImageStorage: Successfully cleared all images from localStorage');
      this.triggerStorageEvent();
    } catch (error) {
      console.error('BreedImageStorage: Error clearing images:', error);
    }
  }

  private static triggerStorageEvent(): void {
    try {
      const customEvent = new CustomEvent('breed-images-updated', {
        detail: { 
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(customEvent);
      console.log('BreedImageStorage: Events dispatched successfully');
    } catch (error) {
      console.error('BreedImageStorage: Error dispatching events:', error);
    }
  }

  static setupStorageListener(callback: () => void): () => void {
    console.log('BreedImageStorage: Setting up storage listeners');
    
    const handleCustomEvent = (e: CustomEvent) => {
      console.log('BreedImageStorage: Custom event detected');
      callback();
    };

    window.addEventListener('breed-images-updated', handleCustomEvent as EventListener);
    
    return () => {
      console.log('BreedImageStorage: Cleaning up storage listeners');
      window.removeEventListener('breed-images-updated', handleCustomEvent as EventListener);
    };
  }

  static async getImageCount(): Promise<number> {
    const images = await this.getStoredImages();
    return Object.keys(images).length;
  }

  static async hasImage(breedName: string): Promise<boolean> {
    if (!breedName) return false;
    const images = await this.getStoredImages();
    const hasImg = breedName.trim() in images;
    console.log(`BreedImageStorage: hasImage("${breedName}") = ${hasImg}`);
    return hasImg;
  }

  static async getImage(breedName: string): Promise<BreedImage | null> {
    if (!breedName) return null;
    const images = await this.getStoredImages();
    const image = images[breedName.trim()] || null;
    console.log(`BreedImageStorage: getImage("${breedName}") =`, image ? 'found' : 'not found');
    return image;
  }

  static async debugStorage(): Promise<void> {
    const images = await this.getStoredImages();
    console.log('BreedImageStorage DEBUG:');
    console.log('- Storage key:', STORAGE_KEY);
    console.log('- Total images:', Object.keys(images).length);
    console.log('- Breed names:', Object.keys(images));
    console.log('- Full data:', images);
  }
}
