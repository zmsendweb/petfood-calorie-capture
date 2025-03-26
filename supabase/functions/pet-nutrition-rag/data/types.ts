
export interface NutritionInfo {
  id: number;
  title: string;
  content: string;
  source: string;
  petType: "dog" | "cat" | string;
  embedding?: number[];
  similarity?: number;
}

export interface RAGResponse {
  answer: string;
  sources: {
    title: string;
    source: string;
  }[];
}
