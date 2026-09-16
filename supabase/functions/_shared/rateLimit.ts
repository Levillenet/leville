// Lightweight in-memory rate limiter for privileged edge functions.
// Keyed per client IP + bucket name. Instance-local (best effort), intended to
// slow down credential guessing and abusive request volume.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ?? "unknown";
}

/**
 * Returns null when the request is allowed, or the number of seconds the
 * caller must wait before retrying.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): number | null {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return null;
  }

  if (existing.count >= limit) {
    return Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  }

  existing.count += 1;
  return null;
}

/** Clears the counter for a key (e.g. after a successful login). */
export function resetRateLimit(key: string) {
  buckets.delete(key);
}

export function tooManyRequests(
  retryAfter: number,
  cors: Record<string, string>,
): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        ...cors,
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    },
  );
}
