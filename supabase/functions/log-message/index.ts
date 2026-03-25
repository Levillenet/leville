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
    const { password, guestName, phone, apartmentName, templateName, messageContent } = await req.json();
    
    // Verify admin password
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    
    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!guestName || !phone || !messageContent) {
      return new Response(
        JSON.stringify({ error: 'Guest name, phone and message content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mask phone number for privacy (show only last 3 digits)
    const maskPhone = (phoneNumber: string): string => {
      const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
      if (cleaned.length <= 3) return '***';
      return '*'.repeat(cleaned.length - 3) + cleaned.slice(-3);
    };

    const maskedPhone = maskPhone(phone);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('message_logs')
      .insert({
        guest_name: guestName,
        phone: maskedPhone, // Store masked phone for privacy
        apartment_name: apartmentName || null,
        template_name: templateName || null,
        message_content: messageContent,
        sent_by: 'admin',
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, log: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error logging message:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
