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

  // `supabase.functions` is a getter that returns a NEW FunctionsClient on every
  // access, so patching the instance is lost immediately. Patch the prototype.
  type InvokeFn = (name: string, options?: Record<string, unknown>) => Promise<unknown>;
  const proto = Object.getPrototypeOf(supabase.functions) as { invoke: InvokeFn };
  const originalInvoke = proto.invoke;

  proto.invoke = function (this: unknown, name: string, options: Record<string, unknown> = {}) {
    const token = getAdminToken();
    if (!token) return originalInvoke.call(this, name, options);

    const headers = {
      ...((options.headers as Record<string, string>) || {}),
      "x-admin-password": token,
    };

    return originalInvoke.call(this, name, { ...options, headers });
  };
}
