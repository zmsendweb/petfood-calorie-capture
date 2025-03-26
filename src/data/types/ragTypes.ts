
export interface NutritionSource {
  title: string;
  source: string;
}

export interface RAGResponse {
  answer: string;
  sources: NutritionSource[];
}

export interface NutritionInfo {
  id: number;
  title: string;
  content: string;
  source: string;
  embedding?: number[];
  similarity?: number;
}
