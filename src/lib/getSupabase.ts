import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let clientPromise: Promise<SupabaseClient<Database>> | null = null;

/**
 * Loads the backend client on first use so its chunk is not part of the
 * startup path (and not modulepreloaded) on pages that never need it.
 */
export function getSupabase(): Promise<SupabaseClient<Database>> {
  if (!clientPromise) {
    clientPromise = import("@/integrations/supabase/client").then((m) => m.supabase);
  }
  return clientPromise;
}
