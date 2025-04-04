
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
    
    console.log(`[pet-nutrition-rag] Processing request - Query: "${query}", Pet type: ${petType || "general"}`);
    
    if (!query) {
      console.log("[pet-nutrition-rag] Error: Empty query received");
      return new Response(
        JSON.stringify({ 
          error: 'Query is required',
          answer: "Please provide a question about pet nutrition."
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    try {
      // Attempt to retrieve relevant information using semantic search
      console.log(`[pet-nutrition-rag] Performing semantic search for: ${query}`);
      const retrievedInfo = await semanticSearch(query, petType);
      console.log(`[pet-nutrition-rag] Retrieved ${retrievedInfo.length} relevant items for ${petType || "pet"} nutrition`);
      
      // Generate response
      console.log("[pet-nutrition-rag] Generating AI response based on retrieved information");
      const result = await generateResponse(query, retrievedInfo, petType);
      console.log('[pet-nutrition-rag] Generated response successfully');
      
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (searchError) {
      // Log detailed error information for semantic search or AI generation issues
      console.error('[pet-nutrition-rag] Error in search/generation process:', searchError);
      console.error('[pet-nutrition-rag] Error details:', {
        message: searchError.message, 
        stack: searchError.stack,
        cause: searchError.cause
      });
      
      // Fallback: Use random nutrition info as context when semantic search fails
      console.log('[pet-nutrition-rag] Using fallback mechanism with random nutrition info');
      
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
      console.log('[pet-nutrition-rag] Generated fallback response successfully');
      
      return new Response(
        JSON.stringify(fallbackResult),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    // Log critical errors in the main request handling
    console.error('[pet-nutrition-rag] Fatal error in function:', error);
    console.error('[pet-nutrition-rag] Error details:', {
      message: error.message, 
      stack: error.stack,
      cause: error.cause,
      name: error.name
    });
    
    // Always return a 200 status with error information in the body
    // This prevents the edge function from returning a non-200 status code
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
