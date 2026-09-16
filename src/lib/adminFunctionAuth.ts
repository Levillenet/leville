import { supabase } from "@/integrations/supabase/client";
import { getAdminToken } from "@/lib/adminSession";

/**
 * Privileged edge functions require an admin/viewer credential. Instead of
 * threading it through every call site, we inject the short-lived signed
 * session token once as a request header for all function invocations made
 * from an authenticated admin session.
 */
let patched = false;

export function installAdminFunctionAuth() {
  if (patched) return;
  patched = true;

  const functionsClient = supabase.functions as unknown as {
    invoke: (name: string, options?: Record<string, unknown>) => Promise<unknown>;
  };
  const originalInvoke = functionsClient.invoke.bind(functionsClient);

  functionsClient.invoke = (name: string, options: Record<string, unknown> = {}) => {
    const token = getAdminToken();
    if (!token) return originalInvoke(name, options);

    const headers = {
      ...((options.headers as Record<string, string>) || {}),
      "x-admin-password": token,
    };

    return originalInvoke(name, { ...options, headers });
  };
}
