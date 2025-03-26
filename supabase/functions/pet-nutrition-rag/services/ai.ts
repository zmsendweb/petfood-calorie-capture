
import { RAGResponse, NutritionInfo } from "../data/types.ts";

const SUPAVEC_API_KEY = Deno.env.get('SUPAVEC_API_KEY');

// Generate AI response based on retrieved information
export async function generateResponse(query: string, retrievedInfo: NutritionInfo[], petType: string | null): Promise<RAGResponse> {
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
