import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { document_type, language } = await req.json();

    // Validate document_type
    if (!document_type || !['welcome_letter', 'sauna_instructions'].includes(document_type)) {
      console.error('Invalid document_type:', document_type);
      return new Response(
        JSON.stringify({ error: 'Invalid document_type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate language if provided
    if (language && !['fi', 'en'].includes(language)) {
      console.error('Invalid language:', language);
      return new Response(
        JSON.stringify({ error: 'Invalid language' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const userAgent = req.headers.get('user-agent') || null;

    console.log(`Logging download: ${document_type}, language: ${language}, user-agent: ${userAgent?.substring(0, 50)}...`);

    const { error } = await supabase
      .from('download_logs')
      .insert({
        document_type,
        user_agent: userAgent,
        language: language || null,
      });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to log download' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Download logged successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
