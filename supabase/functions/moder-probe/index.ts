import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// TEMPORARY diagnostic function: inspects which Beds24 booking fields are
// available for upcoming arrivals (add-on services = invoice items, internal
// notes/comments). Returns only field NAMES and non-personal values.

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok");
  const token = Deno.env.get("BEDS24_API_TOKEN");
  if (!token) return new Response(JSON.stringify({ error: "no token" }), { status: 500 });

  const from = new Date().toISOString().split("T")[0];
  const to = new Date(Date.now() + 21 * 86400000).toISOString().split("T")[0];

  const url =
    `https://beds24.com/api/v2/bookings?arrivalFrom=${from}&arrivalTo=${to}` +
    `&includeInvoiceItems=true&includeInfoItems=true&includeGuests=false`;

  const res = await fetch(url, { headers: { "Content-Type": "application/json", token } });
  const status = res.status;
  const json = await res.json().catch(() => null);
  const arr = (json as any)?.data ?? (Array.isArray(json) ? json : []);

  const summary = (Array.isArray(arr) ? arr : []).slice(0, 6).map((b: any) => ({
    keys: Object.keys(b),
    roomId: b.roomId,
    arrival: b.arrival,
    numAdult: b.numAdult,
    numChild: b.numChild,
    apiSource: b.apiSource,
    comments: typeof b.comments === "string" ? b.comments.slice(0, 200) : b.comments,
    notes: typeof b.notes === "string" ? b.notes.slice(0, 200) : b.notes,
    message: typeof b.message === "string" ? `len:${b.message.length}` : b.message,
    flagText: b.flagText,
    invoiceItems: Array.isArray(b.invoiceItems)
      ? b.invoiceItems.map((i: any) => ({ type: i.type, description: i.description, qty: i.qty, amount: i.amount }))
      : b.invoiceItems,
    infoItems: Array.isArray(b.infoItems)
      ? b.infoItems.map((i: any) => ({ code: i.code, text: typeof i.text === "string" ? i.text.slice(0, 120) : i.text }))
      : b.infoItems,
  }));

  return new Response(JSON.stringify({ status, count: Array.isArray(arr) ? arr.length : 0, summary }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});
