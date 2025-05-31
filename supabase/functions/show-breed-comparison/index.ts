
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
    const { imageData, breedName, showStandards, expectedTraits } = await req.json();
    
    if (!imageData || !breedName || !showStandards) {
      throw new Error('Missing required parameters');
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`Comparing pet to ${breedName} show standards...`);

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
            content: `You are a professional dog/cat show judge with expertise in breed standards. Analyze the pet image and compare it to official show standards for the specified breed. Provide detailed scoring and feedback in JSON format with these exact fields:
            {
              "overallScore": number (0-100),
              "detailedScores": [
                {
                  "category": "string (e.g., 'Head & Expression', 'Body Structure', 'Coat Quality', 'Movement', 'Temperament')",
                  "score": number (0-100),
                  "notes": "detailed assessment for this category"
                }
              ],
              "strengths": ["array of specific strengths that align with breed standards"],
              "areasForImprovement": ["array of areas that could be improved for show quality"],
              "judgeNotes": "professional judge's overall assessment and recommendations"
            }
            
            Be thorough and specific about breed standards. Consider conformation, breed-specific traits, overall quality, and show potential. Score fairly but be detailed about both strengths and areas for improvement.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Please analyze this pet against ${breedName} show standards. 

Breed: ${breedName}
Official Standards: ${showStandards}
Expected Size: ${expectedTraits.size}
Expected Temperament: ${expectedTraits.temperament}

Evaluate the pet's conformity to official breed standards and provide detailed scoring for show quality assessment.`
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
        max_tokens: 1500
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const comparisonText = data.choices[0].message.content;

    console.log('Raw OpenAI response:', comparisonText);

    // Try to extract JSON from the response
    let comparison;
    try {
      const jsonMatch = comparisonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        comparison = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      throw new Error('Failed to parse comparison results');
    }

    console.log('Parsed comparison:', comparison);

    return new Response(JSON.stringify({ comparison }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in show-breed-comparison function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to compare to show standards' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
