// Shared admin credential resolution.
//
// Clients no longer store the raw admin/viewer password. `verify-admin` issues a
// short-lived HMAC-signed session token which is sent instead. This module accepts
// either the raw password (only used by the login call itself) or a valid token.

export type AdminRole = "admin" | "viewer";

const TOKEN_TTL_SECONDS = 8 * 60 * 60; // 8 hours

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function signingKeyMaterial(): string | null {
  const admin = Deno.env.get("ADMIN_PASSWORD");
  if (!admin) return null;
  return `leville-admin-session:${admin}`;
}

async function sign(payload: string): Promise<string | null> {
  const material = signingKeyMaterial();
  if (!material) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(material),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return b64url(new Uint8Array(sig));
}

/** Creates a token of the form `<role>.<expiryEpochSeconds>.<signature>`. */
export async function createAdminToken(
  role: AdminRole,
  ttlSeconds: number = TOKEN_TTL_SECONDS,
): Promise<string | null> {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${role}.${exp}`;
  const sig = await sign(payload);
  return sig ? `${payload}.${sig}` : null;
}

async function verifyToken(token: string): Promise<AdminRole | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [role, expRaw, sig] = parts;
  if (role !== "admin" && role !== "viewer") return null;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return null;
  const expected = await sign(`${role}.${expRaw}`);
  if (!expected || expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0 ? (role as AdminRole) : null;
}

/**
 * Resolves the role for a supplied credential (session token or raw password).
 * Returns null when the credential is missing or invalid.
 */
export async function resolveAdminRole(provided?: string | null): Promise<AdminRole | null> {
  if (!provided) return null;

  const admin = Deno.env.get("ADMIN_PASSWORD");
  if (admin && provided === admin) return "admin";
  const viewer = Deno.env.get("VIEWER_PASSWORD");
  if (viewer && provided === viewer) return "viewer";

  return await verifyToken(provided);
}

/** Convenience helper: true when the credential resolves to the admin role. */
export async function isAdminCredential(provided?: string | null): Promise<boolean> {
  return (await resolveAdminRole(provided)) === "admin";
}
