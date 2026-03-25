import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, password, template } = await req.json();
    
    // Verify admin password for write operations
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    const viewerPassword = Deno.env.get('VIEWER_PASSWORD');
    const isAdmin = password === adminPassword;
    const isViewer = password === viewerPassword;
    
    if (!isAdmin && !isViewer) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Only admins can modify templates
    if (action !== 'list' && !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Viewer cannot modify templates' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (action) {
      case 'list': {
        const { data, error } = await supabase
          .from('message_templates')
          .select('*')
          .order('is_default', { ascending: false })
          .order('created_at', { ascending: true });

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true, templates: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create': {
        if (!template?.name || !template?.message) {
          return new Response(
            JSON.stringify({ error: 'Name and message are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data, error } = await supabase
          .from('message_templates')
          .insert({
            name: template.name,
            message: template.message,
            is_default: false,
          })
          .select()
          .single();

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true, template: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update': {
        if (!template?.id || !template?.name || !template?.message) {
          return new Response(
            JSON.stringify({ error: 'ID, name and message are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data, error } = await supabase
          .from('message_templates')
          .update({
            name: template.name,
            message: template.message,
          })
          .eq('id', template.id)
          .select()
          .single();

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true, template: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'delete': {
        if (!template?.id) {
          return new Response(
            JSON.stringify({ error: 'ID is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check if it's a default template
        const { data: existing } = await supabase
          .from('message_templates')
          .select('is_default')
          .eq('id', template.id)
          .single();

        if (existing?.is_default) {
          return new Response(
            JSON.stringify({ error: 'Cannot delete default templates' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await supabase
          .from('message_templates')
          .delete()
          .eq('id', template.id);

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

  } catch (error) {
    console.error('Error managing templates:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
