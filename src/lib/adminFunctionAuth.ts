import { supabase } from "@/integrations/supabase/client";

/**
 * Privileged edge functions require the admin/viewer password. Instead of
 * threading it through every call site, we inject it once as a request header
 * for all function invocations made from an authenticated admin session.
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
    let password: string | null = null;
    try {
      password = localStorage.getItem("admin_password");
    } catch {
      password = null;
    }

    if (!password) return originalInvoke(name, options);

    const headers = {
      ...((options.headers as Record<string, string>) || {}),
      "x-admin-password": password,
    };

    return originalInvoke(name, { ...options, headers });
  };
}
