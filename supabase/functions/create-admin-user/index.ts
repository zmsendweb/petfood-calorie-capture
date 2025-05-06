
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
    // Get the admin password from the request body
    const { adminPassword } = await req.json();
    
    // Check that the admin password is correct
    if (adminPassword !== "Jfgefi$6823hJHDvcdc") {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Incorrect admin password" }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    // Check if admin already exists
    const { data: existingUsers, error: fetchError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (fetchError) {
      throw fetchError;
    }
    
    const adminExists = existingUsers.users.some(user => user.email === 'admin@mypetcal.com');
    
    if (adminExists) {
      return new Response(
        JSON.stringify({ message: "Admin user already exists" }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Create admin user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@mypetcal.com',
      password: 'Jfgefi$6823hJHDvcdc',
      email_confirm: true,
      user_metadata: {
        is_admin: true
      }
    });
    
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ message: "Admin user created successfully", userId: data.user.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
