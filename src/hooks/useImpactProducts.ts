// src/hooks/useImpactProducts.ts
import { useState, useEffect } from 'react';
import { impactApiService } from '../services/impactApiService';
import type { ProcessedProduct, ApiSyncResult } from '../services/impactApiService';

// Hook return types
interface UseImpactProductsReturn {
  products: ProcessedProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseImpactSyncReturn {
  syncProducts: (filters?: Record<string, string>) => Promise<ApiSyncResult>;
  syncing: boolean;
  syncResult: ApiSyncResult | null;
}

export const useImpactProducts = (filters: Record<string, string> = {}): UseImpactProductsReturn => {
  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await impactApiService.syncProducts(filters);
      
      if (result.success) {
        setProducts(result.products);
      } else {
        setError(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when component mounts or filters change
  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};

// Hook for manual sync (for admin use)
export const useImpactSync = (): UseImpactSyncReturn => {
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<ApiSyncResult | null>(null);

  const syncProducts = async (filters: Record<string, string> = {}): Promise<ApiSyncResult> => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const result = await impactApiService.syncProducts(filters);
      setSyncResult(result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const failResult: ApiSyncResult = {
        success: false,
        error: errorMessage,
        products: [],
        count: 0
      };
      setSyncResult(failResult);
      return failResult;
    } finally {
      setSyncing(false);
    }
  };

  return {
    syncProducts,
    syncing,
    syncResult
  };
};
