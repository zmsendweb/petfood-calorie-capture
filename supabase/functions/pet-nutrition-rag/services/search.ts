
import { createEmbeddings, getQueryEmbedding } from "./embeddings.ts";
import { cosineSimilarity } from "../utils/similarity.ts";
import { NutritionInfo } from "../data/types.ts";

// Search for related content based on query
export async function semanticSearch(query: string, petType: string | null): Promise<NutritionInfo[]> {
  try {
    // Get embedding for the query
    const queryEmbedding = await getQueryEmbedding(query);
    
    // Get embeddings for all nutrition info
    const allEmbeddings = await createEmbeddings();
    
    // Filter by pet type if specified
    const filteredEmbeddings = petType 
      ? allEmbeddings.filter(item => item.petType === petType)
      : allEmbeddings;
    
    // Calculate similarity scores
    const resultsWithScores = filteredEmbeddings.map(item => {
      const similarity = cosineSimilarity(queryEmbedding, item.embedding!);
      return {
        ...item,
        similarity
      };
    });
    
    // Sort by similarity and return top results
    const sortedResults = resultsWithScores
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
      .slice(0, 3); // Return top 3 results
    
    return sortedResults;
  } catch (error) {
    console.error('Error in semanticSearch:', error);
    throw error;
  }
}
