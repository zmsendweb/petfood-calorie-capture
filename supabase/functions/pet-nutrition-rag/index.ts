
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils/cors.ts";
import { semanticSearch } from "./services/search.ts";
import { generateResponse } from "./services/ai.ts";
import { nutritionInfo } from "./data/nutritionInfo.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, petType } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ 
          error: 'Query is required',
          answer: "Please provide a question about pet nutrition."
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Processing ${petType || "pet"} nutrition query: ${query}`);
    
    try {
      // Attempt to retrieve relevant information using semantic search
      const retrievedInfo = await semanticSearch(query, petType);
      console.log(`Retrieved ${retrievedInfo.length} relevant items for ${petType || "pet"} nutrition`);
      
      // Generate response
      const result = await generateResponse(query, retrievedInfo, petType);
      console.log('Generated response successfully');
      
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (searchError) {
      console.error('Error in semantic search or AI generation:', searchError);
      
      // Fallback: Use random nutrition info as context when semantic search fails
      console.log('Using fallback mechanism with random nutrition info');
      
      // Filter by pet type if specified, otherwise get some random info
      let fallbackInfo = nutritionInfo;
      if (petType) {
        fallbackInfo = nutritionInfo.filter(item => 
          item.petType === petType || 
          item.petType === 'both' || 
          !item.petType
        );
      }
      
      // Get 3 random items if we have enough, otherwise use all available
      const randomItems = fallbackInfo.length > 3 
        ? fallbackInfo.sort(() => 0.5 - Math.random()).slice(0, 3)
        : fallbackInfo;
      
      // Generate response with random information
      const fallbackResult = await generateResponse(query, randomItems, petType);
      console.log('Generated fallback response successfully');
      
      return new Response(
        JSON.stringify(fallbackResult),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Fatal error in function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unknown error occurred',
        answer: "I'm sorry, but I'm having trouble accessing nutrition information right now. Please try again later or contact support if this continues.",
        sources: []
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
