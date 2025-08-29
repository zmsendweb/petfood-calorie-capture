// src/components/Store/ProductSync.tsx
import React from 'react';
import { useImpactProducts, useImpactSync } from '../../hooks/useImpactProducts';
import type { ProcessedProduct } from '../../services/impactApiService';

const ProductSync: React.FC = () => {
  const { products, loading, error, refetch } = useImpactProducts();
  const { syncProducts, syncing, syncResult } = useImpactSync();

  const handleManualSync = async (): Promise<void> => {
    console.log('Starting manual sync...');
    const result = await syncProducts({
      // You can add filters here, like:
      // Category: 'Pet Food',
      // MinPrice: '10',
      // MaxPrice: '100'
    });
    
    if (result.success) {
      console.log(`Successfully synced ${result.count} products`);
      refetch(); // Refresh the displayed products
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.style.display = 'none';
  };

  const handleAffiliateClick = (url: string): void => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Impact.com Product Integration</h2>
      
      {/* Sync Button */}
      <div className="mb-6">
        <button 
          onClick={handleManualSync}
          disabled={syncing || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {syncing ? 'Syncing...' : 'Sync Products from Impact.com'}
        </button>
      </div>

      {/* Sync Result */}
      {syncResult && (
        <div className={`mb-4 p-4 rounded ${
          syncResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {syncResult.success 
            ? `✅ Successfully synced ${syncResult.count} products`
            : `❌ Sync failed: ${syncResult.error}`
          }
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded">
          Loading products...
        </div>
      )}

      {/* Products Display */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Products ({products.length})
        </h3>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: ProcessedProduct, index: number) => (
              <div key={product.impact_product_id || index} className="border rounded p-4 shadow-md">
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-32 object-cover mb-2 rounded"
                    onError={handleImageError}
                  />
                )}
                <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                {product.description && (
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                )}
                <p className="font-bold text-green-600 mb-1">${product.price.toFixed(2)}</p>
                {product.brand && (
                  <p className="text-xs text-gray-500">Brand: {product.brand}</p>
                )}
                {product.category && (
                  <p className="text-xs text-gray-500">Category: {product.category}</p>
                )}
                {product.sku && (
                  <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                )}
                {product.affiliate_url && (
                  <button
                    onClick={() => handleAffiliateClick(product.affiliate_url)}
                    className="w-full mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    View Product
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-500">No products loaded. Try syncing from Impact.com.</p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductSync;
