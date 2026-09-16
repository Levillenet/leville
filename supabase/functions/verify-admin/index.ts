import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createAdminToken } from "../_shared/adminCredential.ts";
import { clientIp, rateLimit, resetRateLimit, tooManyRequests } from "../_shared/rateLimit.ts";
import { checkLimit, clearFailures, recordFailure } from "../_shared/persistentRateLimit.ts";

const LOGIN_WINDOW_SECONDS = 15 * 60;
const LOGIN_MAX_FAILURES = 5;

const STATIC_ALLOWED_ORIGINS = [
  "https://leville.net",
  "https://www.leville.net",
  "https://leville.lovable.app",
];

function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const allowed =
    STATIC_ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin) ||
    /^http:\/\/localhost(:\d+)?$/.test(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://leville.net',
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  const corsHeaders = corsFor(req);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Throttle credential guessing: 5 failed attempts per IP / 15 minutes.
  const rlKey = `verify-admin:${clientIp(req)}`;
  const retryAfter = rateLimit(rlKey, 5, 15 * 60);
  if (retryAfter !== null) return tooManyRequests(retryAfter, corsHeaders);

  try {
    const { password } = await req.json();
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    const viewerPassword = Deno.env.get('VIEWER_PASSWORD');

    if (!adminPassword || !viewerPassword) {
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const role = password === adminPassword
      ? 'admin'
      : password === viewerPassword
        ? 'viewer'
        : null;

    if (role) {
      resetRateLimit(rlKey);
      const token = await createAdminToken(role);
      return new Response(
        JSON.stringify({ success: true, role, token }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Väärä salasana' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid request' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
