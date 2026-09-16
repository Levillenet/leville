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
