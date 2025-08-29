// src/services/impactApiService.ts

// Type definitions for Impact.com API responses
interface ImpactProduct {
  Id: string;
  Name: string;
  Description?: string;
  Price: string | number;
  Category?: string;
  Brand?: string;
  ImageUrl?: string;
  TrackingUrl?: string;
  Url?: string;
  CommissionRate?: string | number;
  InStock?: boolean;
  Sku?: string;
  [key: string]: any; // For additional fields
}

interface ImpactApiResponse {
  Items: ImpactProduct[];
  TotalCount?: number;
  Page?: number;
  PageSize?: number;
}

// Our internal product type
export interface ProcessedProduct {
  impact_product_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image_url: string;
  affiliate_url: string;
  commission_rate: number;
  in_stock: boolean;
  sku: string;
  original_data: string;
}

// API response wrapper type
export interface ApiSyncResult {
  success: boolean;
  products: ProcessedProduct[];
  count: number;
  error?: string;
  rawData?: ImpactApiResponse;
}

class ImpactAPIService {
  private apiKey: string;
  private accountSid: string;
  private baseURL: string = 'https://api.impact.com/Mediapartners';

  constructor() {
    // These will come from your environment variables
    this.apiKey = import.meta.env.VITE_IMPACT_API_KEY || '';
    this.accountSid = import.meta.env.VITE_IMPACT_ACCOUNT_SID || '';
    
    if (!this.apiKey || !this.accountSid) {
      console.warn('Impact.com API credentials not found in environment variables');
    }
  }

  // Fetch products from Impact.com catalog
  async fetchProducts(params: Record<string, string> = {}): Promise<ImpactApiResponse> {
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

      const data: ImpactApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch products from Impact.com:', error);
      throw error;
    }
  }

  // Process the raw Impact.com data into your app's format
  processProductData(impactData: ImpactApiResponse): ProcessedProduct[] {
    if (!impactData || !impactData.Items) {
      return [];
    }

    return impactData.Items.map((item: ImpactProduct) => ({
      impact_product_id: item.Id,
      name: item.Name,
      description: item.Description || '',
      price: parseFloat(String(item.Price)) || 0,
      category: item.Category || 'Uncategorized',
      brand: item.Brand || '',
      image_url: item.ImageUrl || '',
      affiliate_url: item.TrackingUrl || item.Url || '',
      commission_rate: parseFloat(String(item.CommissionRate)) || 0,
      in_stock: item.InStock !== false, // Default to true if not specified
      sku: item.Sku || '',
      original_data: JSON.stringify(item) // Keep original for debugging
    }));
  }

  // Main method to sync products - this is what you'll call
  async syncProducts(filters: Record<string, string> = {}): Promise<ApiSyncResult> {
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
        error: error instanceof Error ? error.message : 'Unknown error',
        products: [],
        count: 0
      };
    }
  }

  // Get specific product categories (if Impact.com supports this)
  async fetchCategories(): Promise<any | null> {
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
