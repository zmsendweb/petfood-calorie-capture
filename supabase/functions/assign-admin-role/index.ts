
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    // Get user ID for admin@mypetcal.com
    const { data: users, error: fetchError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (fetchError) {
      console.error('Error fetching users:', fetchError);
      throw fetchError;
    }
    
    const adminUser = users.users.find(user => user.email === 'admin@mypetcal.com');
    
    if (!adminUser) {
      console.log('Admin user not found, creating user first');
      // Create the admin user if it doesn't exist
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: 'admin@mypetcal.com',
        password: 'TempPassword123!',
        email_confirm: true,
        user_metadata: {
          role: 'admin'
        }
      });
      
      if (createError) {
        console.error('Error creating admin user:', createError);
        throw createError;
      }
      
      console.log('Admin user created:', newUser.user?.email);
      
      // Insert admin role for the new user
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: newUser.user!.id,
          role: 'admin'
        });
      
      if (insertError) {
        console.error('Error inserting admin role:', insertError);
        throw insertError;
      }
      
      return new Response(
        JSON.stringify({ 
          message: "Admin user created and role assigned successfully",
          user_id: newUser.user!.id 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if admin role already exists
    const { data: existingRole, error: roleCheckError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', adminUser.id)
      .eq('role', 'admin')
      .single();
    
    if (roleCheckError && roleCheckError.code !== 'PGRST116') {
      console.error('Error checking existing role:', roleCheckError);
      throw roleCheckError;
    }
    
    if (existingRole) {
      console.log('Admin role already exists');
      return new Response(
        JSON.stringify({ message: "Admin role already exists" }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Insert admin role
    const { error: insertError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: adminUser.id,
        role: 'admin'
      });
    
    if (insertError) {
      console.error('Error inserting admin role:', insertError);
      throw insertError;
    }
    
    console.log('Admin role assigned successfully');
    return new Response(
      JSON.stringify({ 
        message: "Admin role assigned successfully",
        user_id: adminUser.id 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in assign-admin-role function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
