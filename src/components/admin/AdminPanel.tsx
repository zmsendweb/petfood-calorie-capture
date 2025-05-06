
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminPanel() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfiles: 0,
    totalMeals: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { count: usersCount, error: usersError } = await supabase
          .from('auth.users')
          .select('*', { count: 'exact', head: true });
          
        if (usersError) throw usersError;
        
        // Since we don't have actual tables yet, we'll just show the user count
        // In a real app, you would fetch data from your actual tables
        
        setStats({
          totalUsers: usersCount || 0,
          totalProfiles: 0,
          totalMeals: 0
        });
        
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{loading ? "..." : stats.totalUsers}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pet Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{loading ? "..." : stats.totalProfiles}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{loading ? "..." : stats.totalMeals}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>List of all registered users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading user data...</p>
              ) : (
                <p>User data would display here in a real implementation</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage site content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content management would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Configure global site settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Site settings would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
