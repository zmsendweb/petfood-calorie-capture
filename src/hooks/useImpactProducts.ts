// src/hooks/useImpactProducts.js
import { useState, useEffect } from 'react';
import { impactApiService } from '../services/impactApiService';

export const useImpactProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await impactApiService.syncProducts(filters);
      
      if (result.success) {
        setProducts(result.products);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
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
export const useImpactSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);

  const syncProducts = async (filters = {}) => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const result = await impactApiService.syncProducts(filters);
      setSyncResult(result);
      return result;
    } catch (error) {
      setSyncResult({
        success: false,
        error: error.message
      });
      return { success: false, error: error.message };
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
