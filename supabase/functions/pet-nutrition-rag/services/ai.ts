
import { RAGResponse, NutritionInfo } from "../data/types.ts";

const SUPAVEC_API_KEY = Deno.env.get('SUPAVEC_API_KEY');

// Generate AI response based on retrieved information
export async function generateResponse(query: string, retrievedInfo: NutritionInfo[], petType: string | null): Promise<RAGResponse> {
  try {
    console.log(`[ai] Generating response for query: "${query}", pet type: ${petType || "general"}`);
    console.log(`[ai] Using ${retrievedInfo.length} nutrition info items as context`);
    
    if (!SUPAVEC_API_KEY) {
      console.error('[ai] SUPAVEC_API_KEY is not defined in environment variables');
      console.log('[ai] Using fallback response generation');
      return generateFallbackResponse(query, retrievedInfo, petType);
    }
    
    // Prepare context from retrieved information
    const context = retrievedInfo.length > 0 
      ? retrievedInfo.map(info => 
          `${info.title}: ${info.content} (Source: ${info.source})`
        ).join('\n\n')
      : "No specific information found for this query.";
    
    console.log('[ai] Context prepared, sending request to AI service');
    
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
      console.error('[ai] Error from AI API:', errorData);
      console.error(`[ai] Response status: ${response.status}, status text: ${response.statusText}`);
      console.log('[ai] Using fallback response generation');
      return generateFallbackResponse(query, retrievedInfo, petType);
    }
    
    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('[ai] Unexpected API response format:', data);
      console.log('[ai] Using fallback response generation');
      return generateFallbackResponse(query, retrievedInfo, petType);
    }
    
    console.log('[ai] Successfully generated AI response');
    return {
      answer: data.choices[0].message.content,
      sources: retrievedInfo.map(info => ({ title: info.title, source: info.source }))
    };
  } catch (error) {
    console.error('[ai] Error in generateResponse:', error);
    console.error('[ai] Error details:', {
      message: error.message, 
      stack: error.stack,
      cause: error.cause,
      name: error.name
    });
    console.log('[ai] Using fallback response generation due to error');
    return generateFallbackResponse(query, retrievedInfo, petType);
  }
}

// Generate a fallback response when AI service is unavailable
function generateFallbackResponse(query: string, retrievedInfo: NutritionInfo[], petType: string | null): RAGResponse {
  console.log('[ai] Generating fallback response');
  // Extract keywords from the query to match with our info
  const keywords = query.toLowerCase().split(/\s+/);
  const petTypeStr = petType || "pet";
  
  // Basic canned response based on query keywords
  let answer = `Based on general nutrition guidelines for ${petTypeStr}s, `;
  
  if (keywords.some(k => k.includes("protein") || k.includes("meat"))) {
    answer += `high-quality protein is essential for ${petTypeStr}s. Good sources include lean meats, fish, and eggs. ${petTypeStr === 'dog' ? 'Dogs' : 'Cats'} typically need about 25-30% protein in their diet.`;
  } else if (keywords.some(k => k.includes("fat") || k.includes("oil"))) {
    answer += `healthy fats are important for energy and coat health. Good sources include fish oil and flaxseed. Too much fat can lead to obesity, so moderation is key.`;
  } else if (keywords.some(k => k.includes("vitamin") || k.includes("mineral") || k.includes("supplement"))) {
    answer += `vitamins and minerals are crucial for overall health. A balanced diet typically provides all necessary nutrients, but some ${petTypeStr}s may benefit from supplements based on veterinary advice.`;
  } else if (keywords.some(k => k.includes("grain") || k.includes("carb") || k.includes("rice") || k.includes("wheat"))) {
    answer += `${petTypeStr === 'dog' ? 'dogs can digest grains and carbohydrates, which provide energy and fiber.' : 'cats are obligate carnivores and don\'t require grains, though some can tolerate small amounts.'} The debate about grain-free diets is ongoing, so consult your veterinarian for specific advice.`;
  } else if (keywords.some(k => k.includes("raw") || k.includes("barf") || k.includes("natural"))) {
    answer += `raw diets have both advocates and critics. They may provide benefits but also carry risks of bacterial contamination and nutritional imbalances. Always consult a veterinarian before starting a raw diet.`;
  } else if (keywords.some(k => k.includes("treat") || k.includes("snack"))) {
    answer += `treats should make up no more than 10% of a ${petTypeStr}'s daily caloric intake. Healthy options include small pieces of lean meat, carrots (for dogs), or commercial treats formulated for ${petTypeStr}s.`;
  } else if (keywords.some(k => k.includes("water") || k.includes("hydration"))) {
    answer += `proper hydration is essential. Always provide fresh, clean water. ${petTypeStr === 'cat' ? 'Cats often have a low thirst drive, so wet food can help with hydration.' : 'Dogs need about 1 ounce of water per pound of body weight daily.'}`;
  } else {
    answer += `a balanced diet is essential. Look for foods that meet AAFCO standards and consult with your veterinarian about specific nutritional needs based on age, breed, and health status.`;
  }
  
  answer += "\n\nPlease note: This is general information. For specific dietary advice, consult with your veterinarian.";
  
  console.log('[ai] Successfully generated fallback response');
  return {
    answer,
    sources: retrievedInfo.map(info => ({ title: info.title, source: info.source }))
  };
}
