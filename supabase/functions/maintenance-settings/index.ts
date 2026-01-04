import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify admin access
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Check admin role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!roleData || !['admin', 'super_admin'].includes(roleData.role)) {
        return new Response(JSON.stringify({ error: 'Not an admin' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    const { action, data } = await req.json();

    if (action === 'get_settings') {
      const { data: settings, error } = await supabase
        .from('maintenance_settings')
        .select('*');

      if (error) throw error;

      return new Response(JSON.stringify({ settings }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'update_setting') {
      const { id, value } = data;
      
      const { error } = await supabase
        .from('maintenance_settings')
        .upsert({
          id,
          value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'get_properties') {
      const { data: properties, error } = await supabase
        .from('property_maintenance')
        .select('*')
        .order('property_id');

      if (error) throw error;

      return new Response(JSON.stringify({ properties }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'update_property') {
      const { property_id, owner_email, cleaning_email, notes } = data;

      const { error } = await supabase
        .from('property_maintenance')
        .upsert({
          property_id,
          owner_email,
          cleaning_email,
          notes,
          updated_at: new Date().toISOString()
        }, { onConflict: 'property_id' });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'bulk_update_properties') {
      const { properties } = data;

      for (const prop of properties) {
        const { error } = await supabase
          .from('property_maintenance')
          .upsert({
            property_id: prop.property_id,
            owner_email: prop.owner_email,
            cleaning_email: prop.cleaning_email,
            notes: prop.notes,
            updated_at: new Date().toISOString()
          }, { onConflict: 'property_id' });

        if (error) {
          console.error(`Error updating property ${prop.property_id}:`, error);
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in maintenance-settings:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
