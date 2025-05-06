
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { corsHeaders } from "./utils/cors.ts";

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
    // Validate API keys
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error("Missing FatSecret API credentials");
      return { error: { message: "FatSecret API credentials are not configured" } };
    }

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
    
    console.log(`Calling FatSecret API method: ${params.method}`);
    
    const response = await fetch(FATSECRET_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });
    
    if (!response.ok) {
      console.error(`FatSecret API HTTP error: ${response.status} ${response.statusText}`);
      return { error: { message: `FatSecret API returned status ${response.status}` } };
    }
    
    const data = await response.json();
    console.log(`FatSecret API response received for ${params.method}`);
    
    if (data.error) {
      console.error("FatSecret API returned an error:", data.error);
      return { error: { message: data.error.message || "Unknown API error" } };
    }
    
    return data;
  } catch (error) {
    console.error("Error calling FatSecret API:", error);
    return { error: { message: error.message || "Failed to call FatSecret API" } };
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
      let requestBody;
      
      try {
        requestBody = await req.json();
      } catch (error) {
        console.error("Failed to parse request body:", error);
        return new Response(
          JSON.stringify({ error: { message: "Invalid request body" } }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const { query, barcode, region, maxResults } = requestBody;
      let result;
      
      switch (action) {
        case "search":
          if (!query) {
            return new Response(
              JSON.stringify({ error: { message: "Query is required" } }),
              { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          
          result = await callFatSecretApi("POST", {
            method: "foods.search",
            search_expression: query,
            max_results: maxResults?.toString() || "20",
            region: region || "US"
          });
          break;
          
        case "barcode":
          if (!barcode) {
            return new Response(
              JSON.stringify({ error: { message: "Barcode is required" } }),
              { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
              JSON.stringify({ error: { message: "Food ID is required" } }),
              { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
              JSON.stringify({ error: { message: "Text description is required" } }),
              { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
            JSON.stringify({ error: { message: "Invalid action" } }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
      }
      
      // Always return a 200 status even if there's an error in the response
      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: { message: "Method not allowed" } }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Fatal error in function:", error);
    return new Response(
      JSON.stringify({ 
        error: { message: error.message || "An unknown error occurred" }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
