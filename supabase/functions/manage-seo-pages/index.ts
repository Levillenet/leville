import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { action, password, ...params } = await req.json();
    const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD');

    // get_published is public (for frontend routing)
    if (action === 'get_published') {
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .eq('is_published', true)
        .order('sort_order');

      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // All other actions require admin password
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_all') {
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'toggle_publish') {
      const { id, is_published } = params;
      const { error } = await supabase
        .from('seo_pages')
        .update({ is_published, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Toggle publish for all pages sharing the same component_name
    if (action === 'toggle_publish_group') {
      const { component_name, is_published } = params;
      const { error } = await supabase
        .from('seo_pages')
        .update({ is_published, updated_at: new Date().toISOString() })
        .eq('component_name', component_name);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'create_page') {
      const { path, title, component_name, lang, sort_order } = params;
      const { data, error } = await supabase
        .from('seo_pages')
        .insert({ path, title, component_name, lang: lang || 'fi', sort_order: sort_order || 0 })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'delete_page') {
      const { id } = params;
      const { error } = await supabase
        .from('seo_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
