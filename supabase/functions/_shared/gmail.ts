// Helpers for calling the Gmail API through the Lovable connector gateway.

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function authHeaders() {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gmailKey = Deno.env.get("GOOGLE_MAIL_API_KEY");
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!gmailKey) throw new Error("GOOGLE_MAIL_API_KEY is not configured (Gmail connector not linked)");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": gmailKey,
  };
}

export async function gmailFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = `${GATEWAY_URL}${path}`;
  const headers = {
    ...authHeaders(),
    "Content-Type": "application/json",
    ...(init.headers || {}),
  } as Record<string, string>;
  return await fetch(url, { ...init, headers });
}

export async function listUnreadMessages(query = "is:unread newer_than:1d", maxResults = 20) {
  const q = encodeURIComponent(query);
  const resp = await gmailFetch(`/users/me/messages?maxResults=${maxResults}&q=${q}`);
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gmail list failed [${resp.status}]: ${t}`);
  }
  const data = await resp.json();
  return (data.messages || []) as { id: string; threadId: string }[];
}

export async function getMessage(id: string) {
  const resp = await gmailFetch(`/users/me/messages/${id}?format=full`);
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gmail get message failed [${resp.status}]: ${t}`);
  }
  return await resp.json();
}

export async function markAsRead(id: string) {
  const resp = await gmailFetch(`/users/me/messages/${id}/modify`, {
    method: "POST",
    body: JSON.stringify({ removeLabelIds: ["UNREAD"] }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gmail mark-read failed [${resp.status}]: ${t}`);
  }
}

function encodeMimeHeader(value: string): string {
  // RFC 2047: only encode if non-ASCII present
  // eslint-disable-next-line no-control-regex
  if (!/[^\x00-\x7F]/.test(value)) return value;
  const utf8 = new TextEncoder().encode(value);
  let binary = "";
  for (let i = 0; i < utf8.length; i++) binary += String.fromCharCode(utf8[i]);
  return `=?UTF-8?B?${btoa(binary)}?=`;
}

export async function sendReply(opts: {
  to: string;
  subject: string;
  bodyText: string;
  threadId?: string;
  inReplyTo?: string;
  references?: string;
}) {
  const headers: string[] = [
    `To: ${opts.to}`,
    `Subject: ${encodeMimeHeader(opts.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
  ];
  if (opts.inReplyTo) headers.push(`In-Reply-To: ${opts.inReplyTo}`);
  if (opts.references) headers.push(`References: ${opts.references}`);
  const raw = headers.join("\r\n") + "\r\n\r\n" + opts.bodyText;

  // Base64url encode (UTF-8 safe)
  const utf8 = new TextEncoder().encode(raw);
  let binary = "";
  for (let i = 0; i < utf8.length; i++) binary += String.fromCharCode(utf8[i]);
  const b64 = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const body: Record<string, unknown> = { raw: b64 };
  if (opts.threadId) body.threadId = opts.threadId;

  const resp = await gmailFetch("/users/me/messages/send", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gmail send failed [${resp.status}]: ${t}`);
  }
  return await resp.json();
}

// ── Helpers for parsing a Gmail message resource ──

export function getHeader(headers: any[], name: string): string {
  if (!Array.isArray(headers)) return "";
  const h = headers.find((x) => x?.name?.toLowerCase() === name.toLowerCase());
  return h?.value || "";
}

export function parseFromAddress(fromHeader: string): { email: string; domain: string; name: string } {
  const match = fromHeader.match(/<([^>]+)>/);
  const email = (match ? match[1] : fromHeader).trim().toLowerCase();
  const nameMatch = fromHeader.match(/^"?([^"<]*?)"?\s*</);
  const name = (nameMatch ? nameMatch[1] : "").trim();
  const domain = email.includes("@") ? email.split("@")[1] : "";
  return { email, domain, name };
}

function decodeBase64Url(data: string): string {
  if (!data) return "";
  let b64 = data.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
}

export function extractPlainTextBody(payload: any): string {
  if (!payload) return "";
  if (payload.mimeType === "text/plain" && payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }
  if (Array.isArray(payload.parts)) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    for (const part of payload.parts) {
      const nested = extractPlainTextBody(part);
      if (nested) return nested;
    }
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body?.data) {
        const html = decodeBase64Url(part.body.data);
        return html
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    }
  }
  if (payload.body?.data) return decodeBase64Url(payload.body.data);
  return "";
}

const SKIP_PATTERNS = [
  /noreply/i,
  /no-reply/i,
  /mailer-daemon/i,
  /postmaster/i,
  /bounces?\+/i,
  /notification/i,
];

export function isSkippableSender(email: string): boolean {
  if (!email) return true;
  return SKIP_PATTERNS.some((re) => re.test(email));
}
