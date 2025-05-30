
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
    const { imageData } = await req.json();
    
    if (!imageData) {
      throw new Error('No image data provided');
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing pet image with OpenAI Vision API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a pet analysis expert. Analyze the pet image and provide detailed information in JSON format with these exact fields:
            {
              "type": "dog" | "cat" | "other",
              "breed": "specific breed name or best guess",
              "estimatedAge": "age range like '2-3 years' or '6-8 months'",
              "weight": "estimated weight range",
              "weightUnit": "kg" | "lb",
              "activityLevel": "low" | "moderate" | "high",
              "temperament": "calm" | "balanced" | "energetic",
              "healthIndicators": ["array of health observations"],
              "personalityTraits": ["array of likely personality traits"],
              "nutritionRecommendations": "brief nutrition advice based on breed and condition",
              "confidence": "percentage confidence in breed identification",
              "additionalNotes": "any other interesting observations"
            }
            
            Be specific about breed identification. If uncertain, provide your best guess with confidence level. Focus on visible characteristics that indicate health, age, and temperament.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this pet image and provide detailed information about the animal.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    console.log('Raw OpenAI response:', analysisText);

    // Try to extract JSON from the response
    let analysis;
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new Error('Failed to parse analysis results');
    }

    console.log('Parsed analysis:', analysis);

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in pet-image-analysis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze pet image' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
