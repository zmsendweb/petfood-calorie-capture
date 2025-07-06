
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
      throw fetchError;
    }
    
    const adminUser = users.users.find(user => user.email === 'admin@mypetcal.com');
    
    if (!adminUser) {
      return new Response(
        JSON.stringify({ error: "Admin user not found" }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
      throw roleCheckError;
    }
    
    if (existingRole) {
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
      throw insertError;
    }
    
    return new Response(
      JSON.stringify({ message: "Admin role assigned successfully" }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error assigning admin role:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
