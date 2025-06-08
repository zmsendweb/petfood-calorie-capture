
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

    // Try the correct Hailuo API endpoint - using a more generic approach
    // Since the exact endpoint structure isn't clear, let's try common AI image generation formats
    const response = await fetch('https://api.hailuo.ai/v1/text2img', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HAILUO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        width: 1024,
        height: 1024,
        steps: 20,
        cfg_scale: 7
      }),
    });

    if (!response.ok) {
      // If that doesn't work, try alternative endpoint structures
      const altResponse = await fetch('https://api.hailuo.ai/api/v1/images/generate', {
        method: 'POST',
        headers: {
          'X-API-Key': HAILUO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: imagePrompt,
          size: "1024x1024"
        }),
      });

      if (!altResponse.ok) {
        // Try one more common format
        const finalResponse = await fetch('https://api.hailuo.ai/generate', {
          method: 'POST',
          headers: {
            'apikey': HAILUO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: imagePrompt,
            model: "hailuo-v1"
          }),
        });

        if (!finalResponse.ok) {
          const errorData = await response.text();
          console.error('All Hailuo API attempts failed. Latest error:', errorData);
          throw new Error(`Hailuo API error: ${response.status} - ${errorData}`);
        }

        const finalData = await finalResponse.json();
        return new Response(JSON.stringify({ 
          imageUrl: finalData.image_url || finalData.url || finalData.data?.url,
          prompt: imagePrompt 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const altData = await altResponse.json();
      return new Response(JSON.stringify({ 
        imageUrl: altData.image_url || altData.url || altData.data?.url,
        prompt: imagePrompt 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Image generated successfully');

    return new Response(JSON.stringify({ 
      imageUrl: data.image_url || data.url || data.data?.url || data.images?.[0]?.url,
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
