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
    const { password } = await req.json();
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all logs from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: logs, error } = await supabase
      .from('chatbot_logs')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;

    // Calculate stats
    const total = logs?.length || 0;

    // By date
    const byDate: Record<string, number> = {};
    logs?.forEach(log => {
      const date = new Date(log.created_at).toISOString().split('T')[0];
      byDate[date] = (byDate[date] || 0) + 1;
    });

    // By language
    const byLanguage: Record<string, number> = {};
    logs?.forEach(log => {
      const lang = log.detected_language || 'unknown';
      byLanguage[lang] = (byLanguage[lang] || 0) + 1;
    });

    // Recent logs (last 50)
    const recentLogs = (logs || []).slice(0, 50).map(log => ({
      id: log.id,
      user_message: log.user_message,
      bot_response: log.bot_response?.substring(0, 200),
      detected_language: log.detected_language,
      created_at: log.created_at,
    }));

    return new Response(
      JSON.stringify({ total, byDate, byLanguage, recentLogs }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching chatbot stats:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
