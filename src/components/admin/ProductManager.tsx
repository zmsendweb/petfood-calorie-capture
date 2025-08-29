// components/Admin/ProductManager.tsx
export const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleManualAdd = async (productData) => {
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    // Refresh products list
    fetchProducts();
  };

  const handleCSVUpload = async (file) => {
    const formData = new FormData();
    formData.append('csv', file);
    
    await fetch('/api/admin/products/import', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <div className="admin-panel p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      
      <div className="mb-6 flex gap-4">
        <button onClick={() => setShowAddForm(true)}>
          Add Product Manually
        </button>
        <input 
          type="file" 
          accept=".csv"
          onChange={(e) => handleCSVUpload(e.target.files[0])}
        />
        <button onClick={handleImpactSync}>
          Sync from Impact.com
        </button>
      </div>
      
      <ProductTable products={products} />
    </div>
  );
};
