import { useState } from "react";
import { Link } from "wouter";
import { company, whatsappUrl } from "@/lib/company";

const serviceOptions = ["Road freight", "Sea freight", "Air freight", "Customs clearance", "Truck hire", "Not sure yet"];

const field =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#0B1628] placeholder:text-black/35 outline-none transition focus:border-[#1c5386] focus:ring-4 focus:ring-[#1c5386]/10";
const label = "mb-1.5 block text-[13px] font-medium text-[#0B1628]";

type Status = "idle" | "sending" | "done" | "error";

// /contact?service=Truck%20hire preselects the service the visitor came from
function initialService() {
  const q = new URLSearchParams(window.location.search).get("service") ?? "";
  return serviceOptions.includes(q) ? q : "";
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState({ name: "", phone: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setSentTo({ name: data.name.split(" ")[0], phone: data.phone });
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <main className="bg-[#F5F5F7] pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#0B1628] md:text-7xl">
          Tell us what needs to move.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-snug text-[#6e6e73]">
          Fill in what you can and we'll come back with a price. Prefer to talk? Call or WhatsApp us, it's just as quick.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          {/* Form */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-10">
            {status === "done" ? (
              <div className="py-10 text-center">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0B1628]">Thanks, {sentTo.name}.</h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#6e6e73]">
                  We've got your request and will come back to you on {sentTo.phone}, within 24 hours.
                </p>
                <Link href="/" className="mt-8 inline-block text-[15px] font-medium text-[#1c5386] hover:underline">
                  Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Your name</label>
                    <input id="name" name="name" required autoComplete="name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone or WhatsApp</label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={label}>Email <span className="font-normal text-black/40">(optional)</span></label>
                    <input id="email" name="email" type="email" autoComplete="email" className={field} />
                  </div>
                  <div>
                    <label htmlFor="service" className={label}>What do you need?</label>
                    <select id="service" name="service" required defaultValue={initialService()} className={field}>
                      <option value="" disabled>Choose a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="from" className={label}>Collecting from</label>
                    <input id="from" name="from" placeholder="e.g. Midrand" className={field} />
                  </div>
                  <div>
                    <label htmlFor="to" className={label}>Delivering to</label>
                    <input id="to" name="to" placeholder="e.g. Lusaka" className={field} />
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className={label}>What are you moving? <span className="font-normal text-black/40">(optional)</span></label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    placeholder="Type of cargo, rough weight or size, and when you need it moved."
                    className={`${field} resize-none`}
                  />
                </div>

                {/* Honeypot: hidden from people, irresistible to bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>

                {status === "error" && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-[#1c5386] px-7 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#164470] disabled:opacity-60 md:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Request a quote"}
                </button>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <aside className="space-y-9 text-[15px]">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">Call</h2>
              <a href={company.phoneHref} className="mt-1.5 block text-2xl font-semibold tracking-tight text-[#0B1628] hover:text-[#1c5386]">
                {company.phoneDisplay}
              </a>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">WhatsApp</h2>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-1.5 block text-2xl font-semibold tracking-tight text-[#0B1628] hover:text-[#1c5386]">
                Message us
              </a>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">Email</h2>
              <a href={`mailto:${company.email}`} className="mt-1.5 block break-all text-[#0B1628] hover:text-[#1c5386]">{company.email}</a>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">Hours</h2>
              <dl className="mt-1.5 space-y-0.5 text-[#0B1628]">
                {company.hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4"><dt>{d}</dt><dd className="text-[#6e6e73]">{h}</dd></div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">Find us</h2>
              <address className="mt-1.5 not-italic leading-relaxed text-[#0B1628]">
                {company.addressLines.map((l) => <div key={l}>{l}</div>)}
              </address>
            </div>
          </aside>
        </div>

        {/* Map */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <iframe
            title="Rain Hub Logistics on the map"
            src="https://www.google.com/maps?q=1070+Old+Pretoria+Road,+Midrand,+1685&output=embed"
            className="h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
