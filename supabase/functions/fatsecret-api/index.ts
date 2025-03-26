
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { corsHeaders } from "../pet-nutrition-rag/utils/cors.ts";

// FatSecret API credentials from environment variables
const CONSUMER_KEY = Deno.env.get("FATSECRET_CONSUMER_KEY");
const CONSUMER_SECRET = Deno.env.get("FATSECRET_CONSUMER_SECRET");

// Base URL for FatSecret API
const FATSECRET_API_URL = "https://platform.fatsecret.com/rest/server.api";

// Generate OAuth 1.0a signature
function generateOAuthSignature(method: string, url: string, params: Record<string, string>): string {
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    acc[key] = params[key];
    return acc;
  }, {} as Record<string, string>);

  // Create signature base string
  const paramString = Object.entries(sortedParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  
  const signatureBaseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(paramString)}`;
  
  // Generate signature using HMAC-SHA1
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET!)}&`;
  const hmac = createHmac("sha1", signingKey);
  hmac.update(signatureBaseString);
  return hmac.toString("base64");
}

// Create OAuth parameters
function createOAuthParams(): Record<string, string> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
  
  return {
    oauth_consumer_key: CONSUMER_KEY!,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_version: "1.0",
    format: "json"
  };
}

// Call FatSecret API
async function callFatSecretApi(method: string, params: Record<string, string>) {
  try {
    // Create base params
    const baseParams = createOAuthParams();
    const allParams = { ...baseParams, ...params };
    
    // Generate signature
    const signature = generateOAuthSignature("POST", FATSECRET_API_URL, allParams);
    allParams.oauth_signature = signature;
    
    // Make API request
    const formData = new URLSearchParams();
    Object.entries(allParams).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    const response = await fetch(FATSECRET_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });
    
    if (!response.ok) {
      throw new Error(`FatSecret API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error calling FatSecret API:", error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const url = new URL(req.url);
    const action = url.pathname.split("/").pop();
    
    if (req.method === "POST") {
      const { query, barcode, region, maxResults } = await req.json();
      let result;
      
      switch (action) {
        case "search":
          if (!query) {
            return new Response(
              JSON.stringify({ error: "Query is required" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          
          result = await callFatSecretApi("POST", {
            method: "foods.search",
            search_expression: query,
            max_results: maxResults?.toString() || "10",
            region: region || "US"
          });
          break;
          
        case "barcode":
          if (!barcode) {
            return new Response(
              JSON.stringify({ error: "Barcode is required" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          
          result = await callFatSecretApi("POST", {
            method: "food.find_id_for_barcode",
            barcode: barcode
          });
          break;
          
        case "food":
          if (!query) {
            return new Response(
              JSON.stringify({ error: "Food ID is required" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          
          result = await callFatSecretApi("POST", {
            method: "food.get",
            food_id: query
          });
          break;
          
        case "nlp":
          if (!query) {
            return new Response(
              JSON.stringify({ error: "Text description is required" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          
          result = await callFatSecretApi("POST", {
            method: "natural_language.parse_food_description",
            description: query,
            region: region || "US"
          });
          break;
          
        default:
          return new Response(
            JSON.stringify({ error: "Invalid action" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
      }
      
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
