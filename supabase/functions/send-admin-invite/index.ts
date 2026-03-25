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
    const { email, inviterUserId, siteUrl } = await req.json();
    const normalizedEmail = (email ?? '').toString().trim().toLowerCase();
    console.log('Sending admin invite to:', normalizedEmail);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if caller is super_admin
    const { data: callerRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', inviterUserId)
      .single();

    if (callerRole?.role !== 'super_admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Vain super_admin voi lähettää kutsuja' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get inviter's email for the invitation message
    const { data: inviterData } = await supabase.auth.admin.getUserById(inviterUserId);
    const inviterEmail = inviterData?.user?.email || 'Admin';

    // Create or update invitation in database
    const { error: inviteError } = await supabase
      .from('admin_invitations')
      .upsert({ 
        email: normalizedEmail, 
        invited_by: inviterUserId,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        used_at: null
      }, { onConflict: 'email' });

    if (inviteError) {
      console.error('Error creating invitation:', inviteError);
      return new Response(
        JSON.stringify({ success: false, error: 'Kutsun luonti epäonnistui' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email if Resend API key is available
    if (resendApiKey) {
      const adminUrl = `${siteUrl}/admin`;
      
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Leville Admin <admin@m.leville.net>',
          to: [normalizedEmail],
          subject: 'Kutsu Leville Admin-paneeliin',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Tervetuloa Leville Admin-paneeliin</h1>
              <p>Sinut on kutsuttu Leville Admin-paneelin käyttäjäksi.</p>
              <p>Kutsuja: ${inviterEmail}</p>
              <p>Kirjaudu sisään alla olevasta linkistä:</p>
              <p style="margin: 30px 0;">
                <a href="${adminUrl}" 
                   style="background: #2563eb; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 6px; display: inline-block;">
                  Siirry Admin-paneeliin
                </a>
              </p>
              <p style="color: #666; font-size: 14px;">
                Kutsu on voimassa 7 päivää. Kirjaudu sisään sähköpostiosoitteellasi ${normalizedEmail} 
                käyttämällä magic link -kirjautumista.
              </p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Resend error:', errorText);
        // Don't fail the whole request, invitation is created
        return new Response(
          JSON.stringify({ 
            success: true, 
            emailSent: false, 
            warning: 'Kutsu luotu, mutta sähköpostin lähetys epäonnistui' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Invitation email sent to:', normalizedEmail);
      return new Response(
        JSON.stringify({ success: true, emailSent: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // No Resend API key, just create the invitation
    console.log('No RESEND_API_KEY, invitation created without email');
    return new Response(
      JSON.stringify({ 
        success: true, 
        emailSent: false,
        message: 'Kutsu luotu. Kerro kutsuttavalle, että hän voi kirjautua osoitteessa /admin'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-admin-invite:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
