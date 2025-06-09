
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, Mail, Calendar, Shield, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch user roles data which includes user_id references
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
        toast.error("Failed to fetch user data");
        return;
      }

      // Create a map of user roles
      const roleMap = new Map();
      userRoles?.forEach(role => {
        if (!roleMap.has(role.user_id)) {
          roleMap.set(role.user_id, []);
        }
        roleMap.get(role.user_id).push(role.role);
      });

      // For demo purposes, we'll show the admin user and any role data we have
      const mockUsers = [
        {
          id: "admin-user",
          email: "lineupforme2@gmail.com",
          created_at: "2024-01-01T00:00:00Z",
          last_sign_in_at: "2024-06-09T00:00:00Z",
          email_confirmed_at: "2024-01-01T00:00:00Z",
          roles: ["admin"]
        }
      ];

      // Add any users from roles table
      roleMap.forEach((roles, userId) => {
        if (userId !== "admin-user") {
          mockUsers.push({
            id: userId,
            email: `user-${userId.slice(0, 8)}@example.com`,
            created_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            email_confirmed_at: new Date().toISOString(),
            roles: roles
          });
        }
      });

      setUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const createAdminUser = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-admin-user', {
        body: { adminPassword: "Jfgefi$6823hJHDvcdc" }
      });
      
      if (error) throw error;
      toast.success(data.message || "Admin user created successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error creating admin user:", error);
      toast.error("Failed to create admin user");
    }
  };

  const assignRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) throw error;
      toast.success(`Role ${role} assigned successfully`);
      fetchUsers();
    } catch (error) {
      console.error("Error assigning role:", error);
      toast.error("Failed to assign role");
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage platform users and their access levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={createAdminUser} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Create Admin User
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading users...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Sign In</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {user.roles?.map((role: string) => (
                        <Badge key={role} variant={role === 'admin' ? 'default' : 'secondary'}>
                          {role}
                        </Badge>
                      )) || <Badge variant="secondary">user</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.last_sign_in_at ? (
                      new Date(user.last_sign_in_at).toLocaleDateString()
                    ) : (
                      <span className="text-muted-foreground">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.email_confirmed_at ? 'default' : 'destructive'}>
                      {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={(role) => assignRole(user.id, role)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Add role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No users found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
