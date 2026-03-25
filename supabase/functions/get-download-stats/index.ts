import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    if (!adminPassword || password !== adminPassword) {
      console.log('Unauthorized access attempt to download stats');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all download logs
    const { data: logs, error } = await supabase
      .from('download_logs')
      .select('*')
      .order('downloaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching download logs:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch logs' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate stats by document type
    const byDocumentType: Record<string, number> = {};
    const byLanguage: Record<string, number> = {};
    const byDate: Record<string, number> = {};

    logs?.forEach((log) => {
      // By document type
      byDocumentType[log.document_type] = (byDocumentType[log.document_type] || 0) + 1;
      
      // By language
      const lang = log.language || 'unknown';
      byLanguage[lang] = (byLanguage[lang] || 0) + 1;
      
      // By date (last 30 days)
      const date = new Date(log.downloaded_at).toISOString().split('T')[0];
      byDate[date] = (byDate[date] || 0) + 1;
    });

    console.log('Download stats fetched successfully');
    
    return new Response(
      JSON.stringify({
        total: logs?.length || 0,
        byDocumentType,
        byLanguage,
        byDate,
        recentLogs: logs?.slice(0, 20) || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-download-stats:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
