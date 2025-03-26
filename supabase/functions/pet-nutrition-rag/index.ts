
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils/cors.ts";
import { semanticSearch } from "./services/search.ts";
import { generateResponse } from "./services/ai.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, petType } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Processing ${petType || "pet"} nutrition query: ${query}`);
    
    // Retrieve relevant information
    const retrievedInfo = await semanticSearch(query, petType);
    console.log(`Retrieved ${retrievedInfo.length} relevant items for ${petType || "pet"} nutrition`);
    
    // Generate response
    const result = await generateResponse(query, retrievedInfo, petType);
    console.log('Generated response successfully');
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
