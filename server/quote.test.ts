import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../api/quote";

// Minimal stand-ins for the Vercel request/response objects
function run(body: unknown, opts: { method?: string; ip?: string } = {}) {
  const res: any = { code: 0, payload: undefined as any, headers: {} as Record<string, string> };
  res.status = (c: number) => ((res.code = c), res);
  res.json = (p: unknown) => ((res.payload = p), res);
  res.setHeader = (k: string, v: string) => (res.headers[k] = v);
  const req: any = { method: opts.method ?? "POST", body, headers: { "x-forwarded-for": opts.ip ?? "10.0.0.1" } };
  return handler(req, res).then(() => res);
}

const good = { name: "Thabo Mokoena", phone: "0821234567", service: "Road freight", from: "Midrand", to: "Lusaka" };
let sent: any[];
let nextOk: boolean[];

beforeEach(() => {
  sent = [];
  nextOk = [];
  process.env.RESEND_API_KEY = "re_test";
  process.env.QUOTE_TO_EMAIL = "owner@example.com";
  process.env.QUOTE_FROM_EMAIL = "Rain Hub <quotes@example.com>";
  delete process.env.TURNSTILE_SECRET;
  vi.stubGlobal("fetch", async (url: string, init: any) => {
    if (String(url).includes("turnstile")) return { ok: true, json: async () => ({ success: String(init.body).includes("good-token") }) };
    sent.push(JSON.parse(init.body));
    const ok = nextOk.length ? nextOk.shift()! : true;
    return { ok, status: ok ? 200 : 500, text: async () => "boom" };
  });
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.unstubAllGlobals());

describe("POST /api/quote", () => {
  it("rejects anything but POST", async () => {
    expect((await run(good, { method: "GET" })).code).toBe(405);
  });

  it("emails the owner and confirms to the customer when an email is given", async () => {
    const r = await run({ ...good, email: "thabo@example.com", contactVia: "WhatsApp me" }, { ip: "1.1.1.1" });
    expect(r.code).toBe(200);
    expect(r.payload).toEqual({ ok: true });
    expect(sent).toHaveLength(2);
    expect(sent[0].to).toEqual(["owner@example.com"]);
    expect(sent[0].subject).toContain("Road freight");
    expect(sent[0].html).toContain("WhatsApp me");
    expect(sent[0].reply_to).toBe("thabo@example.com");
    expect(sent[1].to).toEqual(["thabo@example.com"]);
    expect(sent[1].reply_to).toBe("owner@example.com");
  });

  it("sends only the owner email when no email address is given", async () => {
    const r = await run(good, { ip: "1.1.1.2" });
    expect(r.code).toBe(200);
    expect(sent).toHaveLength(1);
  });

  it("escapes HTML so a visitor can't inject markup into the owner's inbox", async () => {
    await run({ ...good, details: "<script>alert(1)</script>" }, { ip: "1.1.1.3" });
    expect(sent[0].html).not.toContain("<script>");
    expect(sent[0].html).toContain("&lt;script&gt;");
  });

  it("returns 400 for bad input", async () => {
    expect((await run({ name: "x" }, { ip: "1.1.1.4" })).code).toBe(400);
    expect((await run({ ...good, email: "not-an-email" }, { ip: "1.1.1.4" })).code).toBe(400);
    expect((await run("{broken json", { ip: "1.1.1.4" })).code).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("silently drops bots that fill the honeypot", async () => {
    const r = await run({ ...good, website: "spam.com" }, { ip: "1.1.1.5" });
    expect(r.payload).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
  });

  it("never reports success when the owner's email was not accepted", async () => {
    nextOk = [false];
    const r = await run(good, { ip: "1.1.1.6" });
    expect(r.code).toBe(502);
    expect(r.payload.ok).toBe(false);
  });

  it("still succeeds if only the customer confirmation fails", async () => {
    nextOk = [true, false];
    const r = await run({ ...good, email: "a@b.co" }, { ip: "1.1.1.7" });
    expect(r.code).toBe(200);
  });

  it("fails honestly when email isn't configured", async () => {
    delete process.env.RESEND_API_KEY;
    const r = await run(good, { ip: "1.1.1.8" });
    expect(r.code).toBe(500);
    expect(r.payload.ok).toBe(false);
  });

  it("rate-limits a single visitor", async () => {
    const codes: number[] = [];
    for (let i = 0; i < 7; i++) codes.push((await run(good, { ip: "9.9.9.9" })).code);
    expect(codes.slice(0, 5).every((c) => c === 200)).toBe(true);
    expect(codes[5]).toBe(429);
  });

  it("requires a passed Turnstile check only when TURNSTILE_SECRET is set", async () => {
    process.env.TURNSTILE_SECRET = "secret";
    expect((await run(good, { ip: "2.2.2.1" })).code).toBe(400); // no token
    expect((await run({ ...good, "cf-turnstile-response": "bad-token" }, { ip: "2.2.2.2" })).code).toBe(400);
    expect((await run({ ...good, "cf-turnstile-response": "good-token" }, { ip: "2.2.2.3" })).code).toBe(200);
  });
});
