// Vercel serverless function: POST /api/quote
// Emails the enquiry to Rain Hub (Resend) and, if the visitor gave an email address, sends them a short
// "we got it" confirmation. Only reports success when the main email was actually accepted.
//
// Env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY     – from resend.com
//   QUOTE_TO_EMAIL     – where enquiries land
//   QUOTE_FROM_EMAIL   – verified sender on your Resend domain, e.g. "Rain Hub <quotes@yourdomain.co.za>"
//   TURNSTILE_SECRET   – (optional) Cloudflare Turnstile secret; if set, a passed bot check is required
import { z } from "zod";

const Body = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(60),
  contactVia: z.enum(["Call me", "WhatsApp me", "Email me"]).optional().default("Call me"),
  from: z.string().trim().max(160).optional().default(""),
  to: z.string().trim().max(160).optional().default(""),
  details: z.string().trim().max(4000).optional().default(""),
  website: z.string().optional().default(""), // honeypot – real people leave this empty
  "cf-turnstile-response": z.string().optional(),
});

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const FRIENDLY = "We couldn't send that right now. Please call or WhatsApp us.";

// Light per-visitor rate limit. Serverless instances are short-lived, so this is a speed bump, not a wall.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function turnstileOk(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // feature off
  if (!token) return false;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    return ((await r.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let raw: unknown;
  try {
    raw = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: "Please check your details and try again." });
  }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) return res.status(400).json({ ok: false, error: "Please check your details and try again." });
  const q = parsed.data;

  if (q.website) return res.status(200).json({ ok: true }); // bot: pretend it worked, send nothing

  const ip = String(req.headers?.["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "unknown").split(",")[0].trim();
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: "Too many requests. Please call or WhatsApp us." });
  if (!(await turnstileOk(q["cf-turnstile-response"], ip))) {
    return res.status(400).json({ ok: false, error: "Please complete the verification and try again." });
  }

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    console.error("[quote] email env vars are not configured");
    return res.status(500).json({ ok: false, error: FRIENDLY });
  }

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: QUOTE_FROM_EMAIL, ...payload }),
    });

  const route = [q.from, q.to].filter(Boolean).join("  →  ");
  const html = `
    <h2 style="margin:0 0 12px">New quote request — ${esc(q.service)}</h2>
    <p style="margin:0 0 4px"><b>${esc(q.name)}</b></p>
    <p style="margin:0 0 4px">Phone / WhatsApp: <a href="tel:${esc(q.phone)}">${esc(q.phone)}</a></p>
    ${q.email ? `<p style="margin:0 0 4px">Email: <a href="mailto:${esc(q.email)}">${esc(q.email)}</a></p>` : ""}
    <p style="margin:0 0 4px">Prefers: <b>${esc(q.contactVia)}</b></p>
    ${route ? `<p style="margin:12px 0 4px">Route: ${esc(route)}</p>` : ""}
    ${q.details ? `<p style="margin:12px 0 0;white-space:pre-wrap">${esc(q.details)}</p>` : ""}
  `;

  try {
    const r = await send({
      to: [QUOTE_TO_EMAIL],
      reply_to: q.email || undefined,
      subject: `Quote request: ${q.service} — ${q.name}`,
      html,
    });
    if (!r.ok) {
      console.error("[quote] resend rejected:", r.status, await r.text());
      return res.status(502).json({ ok: false, error: FRIENDLY });
    }
  } catch (err) {
    console.error("[quote] send failed:", err);
    return res.status(502).json({ ok: false, error: FRIENDLY });
  }

  // Confirmation to the customer. Best effort: if it fails, their request still went through.
  if (q.email) {
    try {
      await send({
        to: [q.email],
        reply_to: QUOTE_TO_EMAIL,
        subject: "We've received your request — Rain Hub Logistics",
        html: `
          <p>Hi ${esc(q.name.split(" ")[0])},</p>
          <p>Thanks for contacting Rain Hub Logistics. We've received your request for <b>${esc(q.service)}</b>${route ? ` (${esc(route)})` : ""} and will come back to you within 24 hours.</p>
          <p>If it's urgent, call us on 010 085 0769.</p>
          <p style="color:#6e6e73">Rain Hub Logistics PTY LTD · Midrand, Johannesburg</p>`,
      });
    } catch (err) {
      console.error("[quote] confirmation email failed:", err);
    }
  }

  return res.status(200).json({ ok: true });
}
