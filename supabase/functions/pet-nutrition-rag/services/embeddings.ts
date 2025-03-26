
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0';
import { nutritionInfo } from "../data/nutritionInfo.ts";
import { NutritionInfo } from "../data/types.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://dtaivjcchgvuhpdjqtba.supabase.co';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YWl2amNjaGd2dWhwZGpxdGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTA0MzUsImV4cCI6MjA1NTY4NjQzNX0._jdJikFAm-DjCcWAYUMq3TT7dbz2e9SZzHP9xYrqf8o';
const SUPAVEC_API_KEY = Deno.env.get('SUPAVEC_API_KEY');

// Create embeddings for our nutrition information
export async function createEmbeddings(): Promise<NutritionInfo[]> {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Create embeddings for each piece of nutrition information
    const embeddings = await Promise.all(
      nutritionInfo.map(async (info) => {
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
        return {
          ...info,
          embedding: data.embedding
        };
      })
    );
    
    return embeddings;
  } catch (error) {
    console.error('Error in createEmbeddings:', error);
    throw error;
  }
}

// Get embedding for a query string
export async function getQueryEmbedding(query: string): Promise<number[]> {
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
  return queryData.embedding;
}
