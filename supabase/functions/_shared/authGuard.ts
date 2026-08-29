// Shared access control + CORS helpers for privileged edge functions.
// - Admin/viewer access: password sent as `x-admin-password` header or `password` in body.
// - Scheduled (cron) access: `x-cron-secret` header or `cronSecret` in body.

const STATIC_ALLOWED_ORIGINS = [
  "https://leville.net",
  "https://www.leville.net",
  "https://leville.lovable.app",
];

function resolveOrigin(req: Request): string {
  const origin = req.headers.get("origin") ?? "";
  if (STATIC_ALLOWED_ORIGINS.includes(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)) return origin;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return origin;
  return "https://leville.net";
}

export function corsFor(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": resolveOrigin(req),
    "Vary": "Origin",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-admin-password, x-cron-secret",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

export async function readJsonBody(req: Request): Promise<Record<string, unknown>> {
  try {
    const text = await req.text();
    if (!text) return {};
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function pick(req: Request, header: string, body: Record<string, unknown>, key: string): string | null {
  const fromHeader = req.headers.get(header);
  if (fromHeader) return fromHeader;
  const fromBody = body[key];
  return typeof fromBody === "string" && fromBody.length > 0 ? fromBody : null;
}

export function isCronRequest(req: Request, body: Record<string, unknown> = {}): boolean {
  const secret = Deno.env.get("CRON_SECRET");
  if (!secret) return false;
  const provided = pick(req, "x-cron-secret", body, "cronSecret");
  return provided === secret;
}

export function isAdminRequest(
  req: Request,
  body: Record<string, unknown> = {},
  opts: { allowViewer?: boolean } = {},
): boolean {
  const provided = pick(req, "x-admin-password", body, "password");
  if (!provided) return false;
  const admin = Deno.env.get("ADMIN_PASSWORD");
  if (admin && provided === admin) return true;
  if (opts.allowViewer !== false) {
    const viewer = Deno.env.get("VIEWER_PASSWORD");
    if (viewer && provided === viewer) return true;
  }
  return false;
}

export function unauthorized(req: Request): Response {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsFor(req), "Content-Type": "application/json" },
  });
}
