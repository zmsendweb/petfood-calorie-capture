
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, breedName } = await req.json();
    
    if (!prompt && !breedName) {
      throw new Error('Either prompt or breedName is required');
    }

    const RUNWARE_API_KEY = Deno.env.get('RUNWARE_API_KEY');
    if (!RUNWARE_API_KEY) {
      throw new Error('Runware API key not configured');
    }

    // Create a detailed prompt for breed images
    // If no custom prompt provided, create a default one
    let imagePrompt = prompt;
    if (!imagePrompt) {
      // Check if this is likely a cat breed by looking for common cat breed names
      const catBreeds = ['Pixie-bob', 'Ragamuffin', 'Siberian', 'Chantilly-Tiffany', 'Persian', 'Maine Coon', 'British Shorthair', 'Russian Blue', 'Bengal', 'Siamese', 'Abyssinian', 'Scottish Fold', 'Ragdoll', 'Sphynx', 'Norwegian Forest Cat', 'American Shorthair', 'Exotic Shorthair', 'Devon Rex', 'Cornish Rex', 'Oriental', 'Burmese', 'Birman', 'Turkish Angora', 'Manx', 'Somali', 'Ocicat', 'Turkish Van', 'Bombay', 'Korat', 'Chartreux', 'Tonkinese', 'Balinese', 'Javanese', 'Havana Brown', 'Singapura', 'Egyptian Mau', 'American Curl', 'LaPerm', 'Selkirk Rex', 'American Wirehair', 'Colorpoint Shorthair', 'European Shorthair', 'Neva Masquerade', 'Kurilian Bobtail', 'Peterbald', 'Cymric'];
      
      const isCatBreed = catBreeds.some(catBreed => 
        breedName.toLowerCase().includes(catBreed.toLowerCase()) || 
        catBreed.toLowerCase().includes(breedName.toLowerCase())
      );
      
      if (isCatBreed) {
        imagePrompt = `Professional studio photograph of a purebred ${breedName} cat, show quality feline, perfect conformation, sitting pose, neutral background, high resolution, detailed fur texture, award-winning cat photography`;
      } else {
        imagePrompt = `Professional studio photograph of a purebred ${breedName} dog, show quality canine, perfect conformation, sitting pose, neutral background, high resolution, detailed fur texture, award-winning dog photography`;
      }
    }

    console.log(`Generating image for: ${imagePrompt}`);

    // Use Runware API
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: "authentication",
          apiKey: RUNWARE_API_KEY
        },
        {
          taskType: "imageInference",
          taskUUID: crypto.randomUUID(),
          positivePrompt: imagePrompt,
          width: 1024,
          height: 1024,
          model: "runware:100@1",
          numberResults: 1,
          outputFormat: "WEBP",
          CFGScale: 1,
          scheduler: "FlowMatchEulerDiscreteScheduler",
          strength: 0.8
        }
      ]),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Runware API error:', errorData);
      throw new Error(`Runware API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Image generated successfully:', data);

    // Extract image URL from Runware response format
    const imageResult = data.data?.find((item: any) => item.taskType === "imageInference");
    const imageUrl = imageResult?.imageURL;
    
    if (!imageUrl) {
      console.error('No image URL in response:', data);
      throw new Error('No image URL received from Runware API');
    }

    return new Response(JSON.stringify({ 
      imageUrl: imageUrl,
      prompt: imagePrompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in image generation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate image' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
