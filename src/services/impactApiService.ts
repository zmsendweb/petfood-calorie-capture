// src/services/impactApiService.js
class ImpactAPIService {
  constructor() {
    // These will come from your environment variables
    this.apiKey = process.env.REACT_APP_IMPACT_API_KEY;
    this.accountSid = process.env.REACT_APP_IMPACT_ACCOUNT_SID;
    this.baseURL = 'https://api.impact.com/Mediapartners';
  }

  // Fetch products from Impact.com catalog
  async fetchProducts(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        PageSize: '100', // How many products per page
        Page: '1',
        ...params // Any additional filters
      });

      const response = await fetch(`${this.baseURL}/${this.accountSid}/Catalogs/Items?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${this.accountSid}:${this.apiKey}`)}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Impact API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch products from Impact.com:', error);
      throw error;
    }
  }

  // Process the raw Impact.com data into your app's format
  processProductData(impactData) {
    if (!impactData || !impactData.Items) {
      return [];
    }

    return impactData.Items.map(item => ({
      impact_product_id: item.Id,
      name: item.Name,
      description: item.Description || '',
      price: parseFloat(item.Price) || 0,
      category: item.Category || 'Uncategorized',
      brand: item.Brand || '',
      image_url: item.ImageUrl || '',
      affiliate_url: item.TrackingUrl || item.Url,
      commission_rate: parseFloat(item.CommissionRate) || 0,
      in_stock: item.InStock !== false, // Default to true if not specified
      sku: item.Sku || '',
      original_data: JSON.stringify(item) // Keep original for debugging
    }));
  }

  // Main method to sync products - this is what you'll call
  async syncProducts(filters = {}) {
    try {
      console.log('Starting Impact.com product sync...');
      
      const rawData = await this.fetchProducts(filters);
      const processedProducts = this.processProductData(rawData);
      
      console.log(`Processed ${processedProducts.length} products from Impact.com`);
      
      return {
        success: true,
        products: processedProducts,
        count: processedProducts.length,
        rawData: rawData
      };
    } catch (error) {
      console.error('Product sync failed:', error);
      return {
        success: false,
        error: error.message,
        products: [],
        count: 0
      };
    }
  }

  // Get specific product categories (if Impact.com supports this)
  async fetchCategories() {
    try {
      const response = await fetch(`${this.baseURL}/${this.accountSid}/Catalogs/Categories`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${this.accountSid}:${this.apiKey}`)}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return null;
    }
  }
}

// Export the service
export default ImpactAPIService;

// Also export a singleton instance if you prefer
export const impactApiService = new ImpactAPIService();
