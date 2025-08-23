import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecipeRequest {
  petType: "dog" | "cat";
  breed: string;
  ingredients?: string[];
  dietaryNeeds?: string;
}

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === 'POST') {
    try {
      const { petType, breed, ingredients, dietaryNeeds }: RecipeRequest = await req.json();

      if (!ANTHROPIC_API_KEY) {
        return new Response(
          JSON.stringify({ error: 'Anthropic API key not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create prompt for recipe generation
      const ingredientText = ingredients && ingredients.length > 0 
        ? `using these specific ingredients: ${ingredients.join(', ')}`
        : 'using common, healthy ingredients suitable for pets';

      const dietaryText = dietaryNeeds ? ` with specific dietary considerations: ${dietaryNeeds}` : '';

      const prompt = `Create 10 healthy, nutritious homemade recipes for a ${breed} ${petType} ${ingredientText}${dietaryText}. 

For each recipe, please provide:
1. Recipe name
2. Ingredients list with measurements
3. Step-by-step cooking instructions
4. Nutritional benefits
5. Serving size recommendations
6. Storage instructions

Make sure all recipes are:
- Safe for ${petType}s (no toxic ingredients like onions, garlic, chocolate, etc.)
- Balanced in nutrition
- Easy to prepare at home
- Appropriate for the breed size and characteristics of ${breed}
- Include protein, carbohydrates, and healthy fats

Format as JSON with this structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": [
        "ingredient 1 - measurement",
        "ingredient 2 - measurement"
      ],
      "instructions": [
        "Step 1",
        "Step 2"
      ],
      "nutritional_benefits": "Description of nutritional benefits",
      "serving_size": "Recommended serving size",
      "storage": "Storage instructions"
    }
  ]
}`;

      console.log('Generating recipes for:', { petType, breed, ingredients, dietaryNeeds });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Anthropic API error:', response.status, errorText);
        return new Response(
          JSON.stringify({ error: `Anthropic API error: ${response.status}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Try to parse the JSON response
      let recipes;
      try {
        recipes = JSON.parse(content);
      } catch (parseError) {
        console.error('Failed to parse recipe JSON:', parseError);
        // If JSON parsing fails, return the raw content
        recipes = { rawContent: content };
      }

      console.log('Successfully generated recipes');

      return new Response(
        JSON.stringify({
          success: true,
          recipes: recipes.recipes || recipes,
          petType,
          breed
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );

    } catch (error) {
      console.error('Error generating recipes:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate recipes' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});