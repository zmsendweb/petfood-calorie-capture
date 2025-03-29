
/**
 * Utility to get size-based images for pet breeds
 */

type PetSize = "Small" | "Medium" | "Large";

interface SizeCategoryImage {
  imageUrl: string;
  altText: string;
}

// Size-based images for both cats and dogs
const sizeCategoryImages: Record<PetSize, SizeCategoryImage> = {
  "Small": {
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=400&auto=format",
    altText: "Small size pet silhouette"
  },
  "Medium": {
    imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=400&auto=format",
    altText: "Medium size pet silhouette"
  },
  "Large": {
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=400&auto=format",
    altText: "Large size pet silhouette"
  }
};

export const getSizeCategoryImage = (size: PetSize): SizeCategoryImage => {
  return sizeCategoryImages[size];
};
