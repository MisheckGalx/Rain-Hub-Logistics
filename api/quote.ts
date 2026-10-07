// Vercel serverless function: POST /api/quote
// Sends the enquiry to Rain Hub by email via Resend and only reports success
// when the email was actually accepted — no more silent lead loss.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   – from resend.com
//   QUOTE_TO_EMAIL   – where enquiries should land (e.g. info@rainhubsolutions.co.za)
//   QUOTE_FROM_EMAIL – a verified sender on your Resend domain, e.g. "Rain Hub Website <quotes@yourdomain.co.za>"
import { z } from "zod";

const Body = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(60),
  from: z.string().trim().max(160).optional().default(""),
  to: z.string().trim().max(160).optional().default(""),
  details: z.string().trim().max(4000).optional().default(""),
  website: z.string().optional().default(""), // honeypot – real people leave this empty
});

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const parsed = Body.safeParse(typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "Please check your details and try again." });
  }
  const q = parsed.data;

  // Bots fill the hidden field. Pretend it worked, send nothing.
  if (q.website) return res.status(200).json({ ok: true });

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    console.error("[quote] email env vars are not configured");
    return res.status(500).json({ ok: false, error: "We couldn't send that right now. Please call or WhatsApp us." });
  }

  const route = [q.from, q.to].filter(Boolean).join("  →  ");
  const html = `
    <h2 style="margin:0 0 12px">New quote request — ${esc(q.service)}</h2>
    <p style="margin:0 0 4px"><b>${esc(q.name)}</b></p>
    <p style="margin:0 0 4px">Phone / WhatsApp: <a href="tel:${esc(q.phone)}">${esc(q.phone)}</a></p>
    ${q.email ? `<p style="margin:0 0 4px">Email: <a href="mailto:${esc(q.email)}">${esc(q.email)}</a></p>` : ""}
    ${route ? `<p style="margin:12px 0 4px">Route: ${esc(route)}</p>` : ""}
    ${q.details ? `<p style="margin:12px 0 0;white-space:pre-wrap">${esc(q.details)}</p>` : ""}
  `;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: QUOTE_FROM_EMAIL,
        to: [QUOTE_TO_EMAIL],
        reply_to: q.email || undefined,
        subject: `Quote request: ${q.service} — ${q.name}`,
        html,
      }),
    });
    if (!r.ok) {
      console.error("[quote] resend rejected:", r.status, await r.text());
      return res.status(502).json({ ok: false, error: "We couldn't send that right now. Please call or WhatsApp us." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[quote] send failed:", err);
    return res.status(502).json({ ok: false, error: "We couldn't send that right now. Please call or WhatsApp us." });
  }
}
