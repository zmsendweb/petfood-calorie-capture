
import { createEmbeddings, getQueryEmbedding } from "./embeddings.ts";
import { cosineSimilarity } from "../utils/similarity.ts";
import { NutritionInfo } from "../data/types.ts";
import { nutritionInfo } from "../data/nutritionInfo.ts";

// Search for related content based on query
export async function semanticSearch(query: string, petType: string | null): Promise<NutritionInfo[]> {
  try {
    console.log(`[search] Starting semantic search for: "${query}", pet type: ${petType || "general"}`);
    
    // Get embedding for the query
    console.log("[search] Requesting query embedding");
    const queryEmbedding = await getQueryEmbedding(query);
    console.log("[search] Successfully obtained query embedding");
    
    // Get embeddings for all nutrition info
    console.log("[search] Requesting embeddings for nutrition info");
    const allEmbeddings = await createEmbeddings();
    console.log(`[search] Retrieved ${allEmbeddings.length} embeddings for nutrition info`);
    
    // Filter by pet type if specified
    const filteredEmbeddings = petType 
      ? allEmbeddings.filter(item => 
          item.petType === petType || 
          item.petType === 'both' || 
          !item.petType) // Include generic info with no specific pet type
      : allEmbeddings;
    
    console.log(`[search] Filtered to ${filteredEmbeddings.length} relevant items for pet type: ${petType || "all"}`);
    
    if (filteredEmbeddings.length === 0) {
      console.log(`[search] No nutrition information found for pet type: ${petType}`);
      // Return some generic info if no specific info for this pet type
      return allEmbeddings.slice(0, 3);
    }
    
    // Calculate similarity scores
    console.log("[search] Calculating similarity scores");
    const resultsWithScores = filteredEmbeddings.map(item => {
      // Safety check for missing embeddings
      if (!item.embedding || item.embedding.length === 0 || !queryEmbedding || queryEmbedding.length === 0) {
        console.log(`[search] Missing embedding for item: ${item.id} - ${item.title}`);
        return {
          ...item,
          similarity: 0
        };
      }
      
      const similarity = cosineSimilarity(queryEmbedding, item.embedding);
      return {
        ...item,
        similarity
      };
    });
    
    // Sort by similarity and return top results
    const sortedResults = resultsWithScores
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
      .slice(0, 3); // Return top 3 results
    
    console.log(`[search] Returning top ${sortedResults.length} results`);
    // Log the titles of the top results for debugging
    sortedResults.forEach((item, index) => {
      console.log(`[search] Result ${index + 1}: "${item.title}" (similarity: ${item.similarity?.toFixed(4) || 'N/A'})`);
    });
    
    return sortedResults;
  } catch (error) {
    console.error('[search] Error in semanticSearch:', error);
    console.error('[search] Error details:', {
      message: error.message, 
      stack: error.stack,
      cause: error.cause,
      name: error.name
    });
    
    // Return a simple filtered set based on pet type without embeddings
    console.log('[search] Falling back to basic filtering without embeddings');
    const fallbackItems = petType 
      ? nutritionInfo.filter(item => 
          item.petType === petType || 
          item.petType === 'both' || 
          !item.petType)
      : nutritionInfo;
    
    // Get 3 random items
    const randomItems = fallbackItems.length > 3 
      ? fallbackItems.sort(() => 0.5 - Math.random()).slice(0, 3)
      : fallbackItems;
    
    console.log(`[search] Returning ${randomItems.length} fallback items`);
    return randomItems;
  }
}
