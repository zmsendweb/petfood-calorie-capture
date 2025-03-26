
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://dtaivjcchgvuhpdjqtba.supabase.co';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YWl2amNjaGd2dWhwZGpxdGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTA0MzUsImV4cCI6MjA1NTY4NjQzNX0._jdJikFAm-DjCcWAYUMq3TT7dbz2e9SZzHP9xYrqf8o';
const SUPAVEC_API_KEY = Deno.env.get('SUPAVEC_API_KEY');

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define our nutrition information array
const nutritionInfo = [
  // Cat nutrition information
  {
    id: 1,
    title: "Cat Nutritional Requirements",
    content: "Cats are obligate carnivores that require high protein diets (30-40% on a dry matter basis). They need specific nutrients like taurine, arachidonic acid, vitamin A, and niacin that must come from animal sources. Recommended daily calorie intake varies by size, activity level, and age.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 2,
    title: "Feeding Small Cat Breeds",
    content: "Small cat breeds like Devon Rex and Singapura have higher metabolic rates and require more calories per pound than larger breeds. They benefit from multiple small meals throughout the day with calorie-dense foods to maintain healthy weight and energy levels.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  {
    id: 3,
    title: "Feeding Medium Cat Breeds",
    content: "Medium cat breeds like Persian, Siamese, and British Shorthair need balanced nutrition with moderate protein (30-35%) and careful portion control to prevent obesity. Some breeds have special considerations like face shape (Persians) or higher metabolism (Siamese).",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 4,
    title: "Feeding Large Cat Breeds",
    content: "Large cat breeds like Maine Coon and Ragdoll require joint-supporting nutrients and higher protein levels (35-40%) to maintain muscle mass. Daily calorie needs range from 240-420 calories depending on activity level and specific breed characteristics.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  {
    id: 5,
    title: "Special Dietary Considerations for Cats",
    content: "Hairless breeds like Sphynx have higher energy requirements due to heat loss. Breeds with known genetic predispositions (e.g., Burmese diabetes risk) may benefit from specialized diets. Always consult with a veterinary nutritionist for breed-specific recommendations.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 6,
    title: "Life Stage Nutrition for Cats",
    content: "Nutritional needs change throughout a cat's life. Kittens need higher protein and calories for growth. Adult cats need maintenance diets, while senior cats often benefit from moderate protein, lower phosphorus, and anti-inflammatory nutrients to support aging joints and kidneys.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  {
    id: 7,
    title: "Indoor vs Outdoor Cat Nutrition",
    content: "Indoor cats are more prone to obesity and may need fewer calories and more fiber than outdoor cats. Outdoor cats typically have higher energy requirements but may also benefit from antioxidants to support immune health from environmental exposures.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "cat"
  },
  {
    id: 8,
    title: "Wet vs Dry Food for Cats",
    content: "Wet food provides hydration and is often higher in protein and lower in carbohydrates. Dry food can help with dental health and is more convenient. Many veterinary nutritionists recommend a combination of both to balance benefits, especially for breeds prone to urinary issues.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "cat"
  },
  
  // Dog nutrition information
  {
    id: 9,
    title: "Dog Nutritional Requirements",
    content: "Dogs are omnivores requiring balanced nutrition with moderate protein (18-25% on dry matter basis). Unlike cats, they can synthesize taurine and vitamin A. Their nutritional needs vary significantly based on age, breed size, activity level, and health status.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 10,
    title: "Feeding Small Dog Breeds",
    content: "Small breeds like Chihuahuas and Yorkies have faster metabolisms and require more calories per pound than larger breeds. They benefit from energy-dense, small kibble formulas fed in 3-4 small meals daily to prevent hypoglycemia and support their higher energy needs.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  },
  {
    id: 11,
    title: "Feeding Medium Dog Breeds",
    content: "Medium breeds like Beagles and Border Collies need balanced nutrition with appropriate protein (21-25%) and careful portion control to prevent obesity. Their active lifestyles often require formulas that support joint health and sustained energy levels.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 12,
    title: "Feeding Large Dog Breeds",
    content: "Large breeds like Labradors and German Shepherds need controlled growth in puppyhood to prevent orthopedic issues. Adult maintenance requires moderate protein (22-26%), joint-supporting nutrients, and measured portions to prevent bloat and obesity.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  },
  {
    id: 13,
    title: "Special Dietary Considerations for Dogs",
    content: "Brachycephalic breeds (e.g., Bulldogs) benefit from elevated feeding positions and kibble shapes that reduce respiratory stress. Working breeds need higher calories and protein, while prone-to-obesity breeds require strict portion control and lower-calorie formulas.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 14,
    title: "Life Stage Nutrition for Dogs",
    content: "Puppies need higher protein, fat, and minerals for growth (large breeds need controlled growth). Adult dogs require maintenance formulas based on activity level. Senior dogs often benefit from moderate protein, joint supplements, and lower phosphorus levels.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  },
  {
    id: 15,
    title: "Dog Food Allergies and Sensitivities",
    content: "Common food allergens for dogs include beef, dairy, chicken, and wheat. Limited ingredient diets using novel proteins (e.g., venison, duck) and carbohydrates (e.g., sweet potato) can help identify and manage food sensitivities that manifest as skin or digestive issues.",
    source: "American College of Veterinary Nutrition (ACVN)",
    petType: "dog"
  },
  {
    id: 16,
    title: "Grain-Free Diets for Dogs",
    content: "The FDA has identified potential links between grain-free diets and dilated cardiomyopathy in dogs. Unless medically necessary, most dogs benefit from balanced diets containing whole grains that provide essential nutrients and fiber for gut health.",
    source: "European Society of Veterinary and Comparative Nutrition (ESVCN)",
    petType: "dog"
  }
];

// Create embeddings for our nutrition information
async function createEmbeddings() {
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

// Search for related content based on query
async function semanticSearch(query, petType) {
  try {
    // Get embedding for the query
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
    const queryEmbedding = queryData.embedding;
    
    // Get embeddings for all nutrition info
    const allEmbeddings = await createEmbeddings();
    
    // Filter by pet type if specified
    const filteredEmbeddings = petType 
      ? allEmbeddings.filter(item => item.petType === petType)
      : allEmbeddings;
    
    // Calculate similarity scores
    const resultsWithScores = filteredEmbeddings.map(item => {
      const similarity = cosineSimilarity(queryEmbedding, item.embedding);
      return {
        ...item,
        similarity
      };
    });
    
    // Sort by similarity and return top results
    const sortedResults = resultsWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3); // Return top 3 results
    
    return sortedResults;
  } catch (error) {
    console.error('Error in semanticSearch:', error);
    throw error;
  }
}

// Generate AI response based on retrieved information
async function generateResponse(query, retrievedInfo, petType) {
  try {
    // Prepare context from retrieved information
    const context = retrievedInfo.map(info => 
      `${info.title}: ${info.content} (Source: ${info.source})`
    ).join('\n\n');
    
    // Generate AI response using supavec completion API
    const response = await fetch('https://api.supavec.io/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPAVEC_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a knowledgeable pet nutrition assistant specialized in ${petType || "pet"} nutrition. Use the provided information to answer questions about pet nutrition. If the information provided doesn't cover the question, say so and suggest consulting a veterinarian. Keep answers concise and informative.`
          },
          {
            role: "user",
            content: `I need information about the following: ${query}\n\nHere is relevant information from veterinary nutrition sources:\n\n${context}`
          }
        ],
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error generating response:', errorData);
      throw new Error(`Error generating response: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      answer: data.choices[0].message.content,
      sources: retrievedInfo.map(info => ({ title: info.title, source: info.source }))
    };
  } catch (error) {
    console.error('Error in generateResponse:', error);
    throw error;
  }
}

// Helper function to calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

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
