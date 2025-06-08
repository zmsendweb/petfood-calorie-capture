
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useHailuoImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateBreedImage = async (breedName: string, customPrompt?: string): Promise<string | null> => {
    setIsGenerating(true);
    
    try {
      console.log(`Generating image for breed: ${breedName}`);
      
      const { data, error } = await supabase.functions.invoke('hailuo-image-generation', {
        body: { 
          breedName,
          prompt: customPrompt 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.imageUrl) {
        throw new Error('No image URL received from generation service');
      }

      console.log("Image generated successfully:", data.imageUrl);
      setGeneratedImage(data.imageUrl);
      
      toast.success("Breed image generated!", {
        description: `Generated image for ${breedName}`
      });

      return data.imageUrl;
    } catch (error: any) {
      console.error('Error generating breed image:', error);
      toast.error("Image generation failed", {
        description: error.message || "Failed to generate breed image"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearGeneratedImage = () => {
    setGeneratedImage(null);
  };

  return {
    generateBreedImage,
    isGenerating,
    generatedImage,
    clearGeneratedImage
  };
};
