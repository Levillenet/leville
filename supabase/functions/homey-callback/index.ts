import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HomeyToken {
  homeyId: string;
  homeyName: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  token_type?: string;
}

interface StoredTokens {
  tokens: HomeyToken[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      return new Response(
        `<html><body style="font-family: sans-serif; padding: 40px; text-align: center;">
          <h1 style="color: #ef4444;">❌ OAuth Virhe</h1>
          <p>${error}: ${errorDescription || 'Tuntematon virhe'}</p>
          <p><a href="/admin">Takaisin hallintapaneeliin</a></p>
        </body></html>`,
        { 
          headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
          status: 400 
        }
      );
    }

    // Validate code
    if (!code) {
      return new Response(
        `<html><body style="font-family: sans-serif; padding: 40px; text-align: center;">
          <h1 style="color: #ef4444;">❌ Virhe</h1>
          <p>Authorization code puuttuu</p>
          <p><a href="/admin">Takaisin hallintapaneeliin</a></p>
        </body></html>`,
        { 
          headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
          status: 400 
        }
      );
    }

    console.log('Received authorization code, exchanging for token...');

    // Get client credentials from secrets
    const clientId = Deno.env.get('HOMEY_CLIENT_ID');
    const clientSecret = Deno.env.get('HOMEY_CLIENT_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!clientId || !clientSecret) {
      console.error('Missing HOMEY_CLIENT_ID or HOMEY_CLIENT_SECRET');
      throw new Error('Homey credentials not configured');
    }

    // Exchange code for token
    const redirectUri = `${supabaseUrl}/functions/v1/homey-callback`;
    
    const tokenResponse = await fetch('https://api.athom.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', tokenResponse.status, errorText);
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Token exchange successful');

    // Calculate expiry time
    const expiresAt = new Date(Date.now() + (tokenData.expires_in * 1000)).toISOString();

    // Fetch the Homey that was authorized with this token
    const homeyResponse = await fetch('https://api.athom.com/homey', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
    });

    if (!homeyResponse.ok) {
      const errorText = await homeyResponse.text();
      console.error('Failed to get Homey info:', homeyResponse.status, errorText);
      throw new Error('Failed to get Homey information');
    }

    const homeys = await homeyResponse.json();
    console.log('Got Homey info:', JSON.stringify(homeys));

    if (!homeys || homeys.length === 0) {
      throw new Error('No Homey found for this authorization');
    }

    // Get the first (and only) Homey from this OAuth - Athom only allows one per OAuth
    const authorizedHomey = homeys[0];
    const homeyId = authorizedHomey._id || authorizedHomey.id;
    const homeyName = authorizedHomey.name || homeyId;

    console.log(`Authorized Homey: ${homeyName} (${homeyId})`);

    // Create new token object
    const newToken: HomeyToken = {
      homeyId,
      homeyName,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: expiresAt,
      token_type: tokenData.token_type,
    };

    // Store token in database - add to existing tokens array
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // First, get existing tokens
    const { data: existingData } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', 'homey_tokens')
      .single();

    let tokens: HomeyToken[] = [];
    
    if (existingData?.value) {
      // Check if it's old format (single token) or new format (tokens array)
      const value = existingData.value as Record<string, unknown>;
      if (value.tokens && Array.isArray(value.tokens)) {
        tokens = value.tokens as HomeyToken[];
      } else if (value.access_token) {
        // Old format - migrate but it won't have homeyId, so skip migration
        console.log('Found old token format, will be replaced');
      }
    }

    // Check if this Homey already exists in tokens
    const existingIndex = tokens.findIndex(t => t.homeyId === homeyId);
    
    if (existingIndex >= 0) {
      // Update existing token
      tokens[existingIndex] = newToken;
      console.log(`Updated existing token for ${homeyName}`);
    } else {
      // Add new token
      tokens.push(newToken);
      console.log(`Added new token for ${homeyName}`);
    }

    // Save updated tokens
    const storedValue: StoredTokens = { tokens };

    const { error: dbError } = await supabase
      .from('site_settings')
      .upsert({
        id: 'homey_tokens',
        value: storedValue,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (dbError) {
      console.error('Failed to store token:', dbError);
      throw new Error('Failed to store token in database');
    }

    console.log(`Token stored successfully. Total Homeys: ${tokens.length}`);

    // Build list of connected Homeys for display
    const connectedList = tokens.map(t => `<li>✅ ${t.homeyName}</li>`).join('');

    // Success response
    return new Response(
      `<html><body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1 style="color: #22c55e;">✅ Homey yhdistetty onnistuneesti!</h1>
        <p><strong>${homeyName}</strong> lisätty.</p>
        <h3 style="margin-top: 30px;">Yhdistetyt Homeyt (${tokens.length}):</h3>
        <ul style="list-style: none; padding: 0; text-align: center;">${connectedList}</ul>
        <p style="color: #666; margin-top: 20px;">Haluatko lisätä toisen Homeyn? Paina "Lisää Homey" -nappia hallintapaneelissa.</p>
        <p style="margin-top: 30px;"><a href="/admin" style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Takaisin hallintapaneeliin</a></p>
      </body></html>`,
      { 
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
        status: 200 
      }
    );

  } catch (error: unknown) {
    console.error('Error in homey-callback:', error);
    const errorMessage = error instanceof Error ? error.message : 'Tuntematon virhe';
    return new Response(
      `<html><body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1 style="color: #ef4444;">❌ Virhe</h1>
        <p>${errorMessage}</p>
        <p><a href="/admin">Takaisin hallintapaneeliin</a></p>
      </body></html>`,
      { 
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
        status: 500 
      }
    );
  }
});
