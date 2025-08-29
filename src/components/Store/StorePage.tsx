// components/Store/StorePage.tsx
import { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

export const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(filters).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className="store-container p-6">
      <h1 className="text-3xl font-bold mb-6">Pet Products Store</h1>
      
      <div className="flex gap-6">
        <aside className="w-1/4">
          <CategoryFilter onFilterChange={setFilters} />
        </aside>
        
        <main className="w-3/4">
          <SearchBar onSearch={handleSearch} />
          <ProductGrid products={products} loading={loading} />
        </main>
      </div>
    </div>
  );
};
