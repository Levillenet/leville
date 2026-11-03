/**
 * Admin session handling.
 *
 * The raw admin password is never stored. `verify-admin` returns a short-lived
 * signed session token which lives in sessionStorage only (cleared when the
 * browser session ends).
 */
const TOKEN_KEY = "admin_session_token";
const ROLE_KEY = "admin_role";

export type AdminRole = "admin" | "viewer";

export function setAdminSession(role: AdminRole, token: string | null) {
  try {
    sessionStorage.setItem(ROLE_KEY, role);
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

export function getAdminToken(): string {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

/** Session tokens look like `<role>.<expiryEpochSeconds>.<sig>`. */
export function isAdminTokenExpired(token: string, now: number = Date.now()): boolean {
  const exp = Number(token.split(".")[1]);
  if (!Number.isFinite(exp)) return false; // unknown format: let the server decide
  return exp * 1000 <= now;
}

export const ADMIN_SESSION_EXPIRED_EVENT = "admin-session-expired";

/** Clears the session and tells the admin page to show the login form. */
export function expireAdminSession() {
  clearAdminSession();
  try {
    window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT));
  } catch {
    /* ignore */
  }
}

export function getAdminRole(): AdminRole | null {
  try {
    const role = sessionStorage.getItem(ROLE_KEY);
    return role === "admin" || role === "viewer" ? role : null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ROLE_KEY);
  } catch {
    /* ignore */
  }
  // Remove any legacy plaintext credentials left in localStorage.
  try {
    localStorage.removeItem("admin_password");
    localStorage.removeItem("admin_role");
  } catch {
    /* ignore */
  }
}

/** Clears legacy plaintext credentials from previous versions on app start. */
export function purgeLegacyAdminCredentials() {
  try {
    localStorage.removeItem("admin_password");
    localStorage.removeItem("admin_role");
  } catch {
    /* ignore */
  }
}
