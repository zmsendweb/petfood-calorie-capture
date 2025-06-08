
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

    const HAILUO_API_KEY = Deno.env.get('HAILUO_API_KEY');
    if (!HAILUO_API_KEY) {
      throw new Error('Hailuo API key not configured');
    }

    // Create a detailed prompt for breed images
    const imagePrompt = prompt || `Professional studio photograph of a purebred ${breedName}, show quality, perfect conformation, sitting pose, neutral background, high resolution, detailed fur texture, award-winning photography`;

    console.log(`Generating image for: ${imagePrompt}`);

    // Hailuo API call - using a common image generation endpoint format
    const response = await fetch('https://api.hailuo.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HAILUO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        size: "1024x1024",
        quality: "hd",
        n: 1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Hailuo API error:', errorData);
      throw new Error(`Hailuo API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Image generated successfully');

    return new Response(JSON.stringify({ 
      imageUrl: data.data?.[0]?.url || data.url,
      prompt: imagePrompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in hailuo-image-generation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate image' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
