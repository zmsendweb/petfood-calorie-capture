import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { AddWebsiteDialog } from './AddWebsiteDialog';
import { 
  Globe, 
  Plus, 
  Play, 
  Settings, 
  Trash2,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Website {
  id: string;
  name: string;
  url: string;
  domain: string;
  site_type: string;
  is_active: boolean;
  crawl_preference: string;
  crawl_interval: string;
  last_crawled_at: string | null;
  last_product_count: number | null;
  created_at: string;
  updated_at: string;
}

interface CrawlJob {
  id: string;
  status: string;
  created_at: string;
  total_pages: number;
  pages_crawled: number;
  products_found: number;
  website_id: string;
}

export const WebsitesTab: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [crawlJobs, setCrawlJobs] = useState<CrawlJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [crawlingWebsites, setCrawlingWebsites] = useState<Set<string>>(new Set());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWebsites();
      fetchCrawlJobs();
    }
  }, [user]);

  const fetchWebsites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get last crawl data for each website
      if (data && data.length > 0) {
        const websiteIds = data.map(w => w.id);
        const { data: lastCrawlData } = await supabase
          .from('crawl_jobs')
          .select('website_id, created_at, products_found')
          .in('website_id', websiteIds)
          .eq('status', 'completed')
          .order('created_at', { ascending: false });

        // Create a map of website_id to last crawl info
        const crawlMap = new Map();
        lastCrawlData?.forEach(crawl => {
          if (!crawlMap.has(crawl.website_id)) {
            crawlMap.set(crawl.website_id, {
              last_crawled_at: crawl.created_at,
              last_product_count: crawl.products_found
            });
          }
        });

        // Update websites with last crawl data
        const websitesWithCrawlData = data.map(website => ({
          ...website,
          last_crawled_at: crawlMap.get(website.id)?.last_crawled_at || website.last_crawled_at,
          last_product_count: crawlMap.get(website.id)?.last_product_count || website.last_product_count || 0
        }));

        setWebsites(websitesWithCrawlData);
      } else {
        setWebsites([]);
      }
    } catch (error) {
      console.error('Error fetching websites:', error);
      toast({
        title: "Error",
        description: "Failed to load websites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCrawlJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('crawl_jobs')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['running', 'pending', 'queued'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCrawlJobs(data || []);
    } catch (error) {
      console.error('Error fetching crawl jobs:', error);
    }
  };

  const startCrawl = async (websiteId: string, websiteName: string) => {
    setCrawlingWebsites(prev => new Set([...prev, websiteId]));

    try {
      const { error } = await supabase.functions.invoke('website-crawler', {
        body: { 
          websiteId,
          userId: user?.id,
          jobType: 'manual'
        }
      });

      if (error) throw error;

      toast({
        title: "Crawl Started",
        description: `Manual crawl initiated for ${websiteName}. Check the "Analysis Results" tab to monitor progress and view detailed results.`,
      });

      await fetchCrawlJobs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start crawl",
        variant: "destructive",
      });
    } finally {
      setCrawlingWebsites(prev => {
        const newSet = new Set(prev);
        newSet.delete(websiteId);
        return newSet;
      });
    }
  };

  const deleteWebsite = async (websiteId: string, websiteName: string) => {
    try {
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', websiteId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${websiteName} has been deleted successfully`,
      });

      await fetchWebsites();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete website",
        variant: "destructive",
      });
    }
  };

  const getWebsiteStatus = (website: Website) => {
    const runningJob = crawlJobs.find(job => 
      job.website_id === website.id && 
      ['running', 'pending', 'queued'].includes(job.status)
    );

    if (runningJob) {
      return { 
        status: runningJob.status === 'running' ? 'Crawling' : 'Starting...', 
        color: 'blue' 
      };
    }

    if (!website.is_active) {
      return { status: 'Inactive', color: 'gray' };
    }

    return { status: 'Active', color: 'green' };
  };

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'blue': return 'default';
      case 'green': return 'secondary';
      case 'gray': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading websites...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Websites</h2>
          <p className="text-muted-foreground">
            Manage your tracked websites ({websites.length}/3)
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Website
        </Button>
      </div>

      {websites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No websites added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first website to start crawling and analyzing product pages
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Website
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Website Management Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900">Website Management Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use "Crawl Now" to start an immediate manual crawl</li>
                    <li>• Check the "Analysis Results" tab to monitor crawl progress and results</li>
                    <li>• Products found will be automatically updated after each successful crawl</li>
                    <li>• Last crawled time shows when the most recent crawl completed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Websites Grid */}
          <div className="grid gap-4">
            {websites.map((website) => {
              const websiteStatus = getWebsiteStatus(website);
              const isCrawling = crawlingWebsites.has(website.id) || 
                crawlJobs.some(job => job.website_id === website.id && ['running', 'pending', 'queued'].includes(job.status));

              return (
                <Card key={website.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Globe className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{website.name}</CardTitle>
                            <CardDescription>{website.domain}</CardDescription>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getBadgeVariant(websiteStatus.color)}>
                        {websiteStatus.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Website Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{website.site_type}</div>
                        <div className="text-xs text-muted-foreground">Type</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {website.last_crawled_at 
                            ? new Date(website.last_crawled_at).toLocaleDateString()
                            : 'Never'
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">Last Crawled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-success">
                          {website.last_product_count || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Products Found</div>
                      </div>
                    </div>

                    {/* Crawl Settings */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Crawl Frequency:</span>
                      <span className="font-medium capitalize">{website.crawl_interval}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Crawl Preference:</span>
                      <span className="font-medium">
                        {website.crawl_preference === 'products_only' ? 'Products Only' : 'All Pages'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => startCrawl(website.id, website.name)}
                        disabled={isCrawling}
                        className="flex-1 gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {isCrawling ? 'Starting...' : 'Crawl Now'}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/website/${website.id}`)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteWebsite(website.id, website.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <AddWebsiteDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onWebsiteAdded={fetchWebsites}
      />
    </div>
  );
};
