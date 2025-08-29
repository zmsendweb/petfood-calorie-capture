// components/Store/ProductCard.tsx
export const ProductCard = ({ product }) => {
  const handleAffiliateClick = () => {
    // Track click for analytics
    trackAffiliateClick(product.id);
    // Open affiliate link
    window.open(product.affiliate_url, '_blank');
  };

  return (
    <div className="product-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />
      
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-xl font-bold text-green-600 mb-3">${product.price}</p>
      
      <button 
        onClick={handleAffiliateClick}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
};
