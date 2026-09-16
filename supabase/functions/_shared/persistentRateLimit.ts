// Durable rate limiting backed by the database, so limits hold across
// edge function instances (the in-memory limiter is per-instance only).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function admin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

/**
 * Returns the number of seconds the caller must wait, or null when allowed.
 * The counter is only incremented on failures (call `recordFailure`).
 */
export async function checkLimit(
  bucket: string,
  clientKey: string,
  limit: number,
  windowSeconds: number,
): Promise<number | null> {
  try {
    const { data } = await admin()
      .from("rate_limit_attempts")
      .select("attempts, window_started_at")
      .eq("bucket", bucket)
      .eq("client_key", clientKey)
      .maybeSingle();

    if (!data) return null;

    const started = new Date(data.window_started_at).getTime();
    const elapsed = (Date.now() - started) / 1000;
    if (elapsed >= windowSeconds) return null;
    if (data.attempts < limit) return null;

    return Math.max(1, Math.ceil(windowSeconds - elapsed));
  } catch {
    return null; // never lock out on infrastructure errors
  }
}

export async function recordFailure(
  bucket: string,
  clientKey: string,
  windowSeconds: number,
): Promise<void> {
  try {
    const supabase = admin();
    const { data } = await supabase
      .from("rate_limit_attempts")
      .select("id, attempts, window_started_at")
      .eq("bucket", bucket)
      .eq("client_key", clientKey)
      .maybeSingle();

    const now = new Date().toISOString();

    if (!data) {
      await supabase
        .from("rate_limit_attempts")
        .insert({ bucket, client_key: clientKey, attempts: 1, window_started_at: now, updated_at: now });
      return;
    }

    const expired = (Date.now() - new Date(data.window_started_at).getTime()) / 1000 >= windowSeconds;
    await supabase
      .from("rate_limit_attempts")
      .update({
        attempts: expired ? 1 : data.attempts + 1,
        window_started_at: expired ? now : data.window_started_at,
        updated_at: now,
      })
      .eq("id", data.id);
  } catch {
    /* best effort */
  }
}

export async function clearFailures(bucket: string, clientKey: string): Promise<void> {
  try {
    await admin()
      .from("rate_limit_attempts")
      .delete()
      .eq("bucket", bucket)
      .eq("client_key", clientKey);
  } catch {
    /* best effort */
  }
}
