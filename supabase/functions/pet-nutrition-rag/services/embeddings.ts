
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0';
import { nutritionInfo } from "../data/nutritionInfo.ts";
import { NutritionInfo } from "../data/types.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://dtaivjcchgvuhpdjqtba.supabase.co';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YWl2amNjaGd2dWhwZGpxdGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTA0MzUsImV4cCI6MjA1NTY4NjQzNX0._jdJikFAm-DjCcWAYUMq3TT7dbz2e9SZzHP9xYrqf8o';
const SUPAVEC_API_KEY = Deno.env.get('SUPAVEC_API_KEY');

// Create embeddings for our nutrition information with improved error handling
export async function createEmbeddings(): Promise<NutritionInfo[]> {
  try {
    if (!SUPAVEC_API_KEY) {
      console.error('SUPAVEC_API_KEY is not defined in environment variables');
      throw new Error('API key not configured');
    }
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Create embeddings for each piece of nutrition information
    const embeddingPromises = nutritionInfo.map(async (info) => {
      try {
        const response = await fetch('https://api.supavec.io/embed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPAVEC_API_KEY}`
          },
          body: JSON.stringify({
            input: `${info.title}: ${info.content}`,
            model: "text-embedding-ada-002"
          })
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error creating embedding:', errorData);
          throw new Error(`Error creating embedding: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.embedding) {
          console.error('No embedding in response:', data);
          throw new Error('Invalid embedding response format');
        }
        
        return {
          ...info,
          embedding: data.embedding
        };
      } catch (error) {
        console.error(`Error creating embedding for item ${info.id}:`, error);
        // Return a placeholder so we don't break the Promise.all
        return null;
      }
    });
    
    // Wait for all promises to resolve (whether successful or not)
    const results = await Promise.allSettled(embeddingPromises);
    
    // Filter out rejected promises and null values
    const embeddings = results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => (result as PromiseFulfilledResult<NutritionInfo>).value);
    
    if (embeddings.length === 0) {
      console.error('Failed to create any valid embeddings');
      throw new Error('No embeddings could be created');
    }
    
    return embeddings;
  } catch (error) {
    console.error('Error in createEmbeddings:', error);
    // In case of a critical failure, return the nutrition info without embeddings
    // This will cause the similarity search to fall back to basic filtering
    throw error;
  }
}

// Get embedding for a query string with improved error handling
export async function getQueryEmbedding(query: string): Promise<number[]> {
  if (!SUPAVEC_API_KEY) {
    console.error('SUPAVEC_API_KEY is not defined in environment variables');
    throw new Error('API key not configured');
  }
  
  try {
    const response = await fetch('https://api.supavec.io/embed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPAVEC_API_KEY}`
      },
      body: JSON.stringify({
        input: query,
        model: "text-embedding-ada-002"
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error creating query embedding:', errorData);
      throw new Error(`Error creating query embedding: ${response.status}`);
    }
    
    const queryData = await response.json();
    
    if (!queryData.embedding) {
      console.error('No embedding in response:', queryData);
      throw new Error('Invalid embedding response format');
    }
    
    return queryData.embedding;
  } catch (error) {
    console.error('Error in getQueryEmbedding:', error);
    throw error;
  }
}
