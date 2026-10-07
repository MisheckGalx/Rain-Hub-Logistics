import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { company, whatsappUrl } from "@/lib/company";

const services = [
  { name: "Road freight", line: "Regional and cross-border trucking across the SADC region." },
  { name: "Sea freight", line: "Imports and exports through Durban, Cape Town and East London." },
  { name: "Air freight", line: "Fast, secure cargo when it can't wait." },
  { name: "Customs clearance", line: "Documentation, classification and SARS compliance, handled for you." },
  { name: "Truck hire", line: "8 to 36 tonne trucks with professional drivers, for a trip or a contract." },
];

const steps = [
  { n: "01", title: "Tell us what's moving", text: "Where it's going from and to, and roughly how much. A short form or a WhatsApp message is enough." },
  { n: "02", title: "We come back with a price", text: "A real person calls or messages you with a quote, within 24 hours." },
  { n: "03", title: "We move it", text: "Our drivers and clearing team take it from there, and you hear from us if anything changes." },
];

// Shown as plain names until each client has agreed to be listed (and ideally supplied a logo).
const clients = ["Aberdare Cables", "Manitou", "Insimbi", "LiuGong Machinery SA", "International Trucks", "Freightliner"];

export default function Home() {
  useReveal();

  return (
    <main>
      {/* ── Hero: one photo, one message, one action ── */}
      <section className="relative isolate flex flex-col overflow-hidden bg-[#0B1628] pt-14 text-white md:h-[92svh] md:min-h-[620px] md:flex-row md:items-end md:pt-0">
        {/* Phone: photo on top, words below. Wide screens: photo behind the words, drawn wider than the screen
            and pinned left so the truck slides right and the copy sits on open road. */}
        <div className="relative h-[46svh] min-h-[280px] w-full md:absolute md:inset-y-0 md:left-0 md:-z-20 md:h-auto md:w-[135%]">
          <picture>
            <source srcSet="/images/home-hero.webp" type="image/webp" />
            <img
              src="/images/home-hero.jpeg"
              alt="A Rain Hub truck parked beside a quiet open road, with veld and hills behind"
              fetchPriority="high"
              className="h-full w-full object-cover object-[62%_55%] md:object-[50%_42%]"
            />
          </picture>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1628] to-transparent md:hidden" />
        </div>
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-tr from-[#0B1628]/85 via-[#0B1628]/25 to-transparent md:block" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-2 md:pb-20 md:pt-0">
          <h1
            className="rise text-[clamp(40px,6.4vw,84px)] md:max-w-[12ch] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            We move your cargo across Southern Africa.
          </h1>
          <p className="rise mt-5 max-w-xl text-lg leading-snug text-white/85 md:text-xl" style={{ ["--d" as string]: "120ms" }}>
            Road, sea and air freight, customs clearance and truck hire, run from Midrand with trucks from 8 to 36 tonnes.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ ["--d" as string]: "240ms" }}>
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-[#0B1628] transition hover:bg-white/90"
            >
              Get a quote
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-white"
            >
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="rise mt-10 text-[13px] text-white/60" style={{ ["--d" as string]: "360ms" }}>
            Midrand, Johannesburg · Mon–Fri 07:00–18:00
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="reveal max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1628] md:text-6xl">
            Everything your cargo needs, from one team.
          </h2>

          <div className="mt-14 md:mt-20">
            {services.map((s, i) => (
              <Link
                key={s.name}
                href="/services"
                className="reveal group flex items-center justify-between gap-6 border-t border-black/10 py-7 last:border-b md:py-9"
                style={{ ["--d" as string]: `${i * 60}ms` }}
              >
                <div>
                  <div className="text-2xl font-semibold tracking-[-0.025em] text-[#0B1628] md:text-4xl">{s.name}</div>
                  <p className="mt-1.5 max-w-xl text-[15px] leading-snug text-[#6e6e73] md:text-base">{s.line}</p>
                </div>
                <ArrowRight className="h-6 w-6 shrink-0 text-[#1c5386] transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#F5F5F7] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="reveal max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1628] md:text-6xl">
            Getting moving is simple.
          </h2>
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <div key={s.n} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <div className="text-6xl font-light tracking-tight text-[#1c5386] md:text-7xl">{s.n}</div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#0B1628]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="bg-[#0B1628] py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
              From an 8&#8209;tonne truck to a 36&#8209;tonne super link.
            </h2>
            <Link href="/fleet" className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-white">
              See the fleet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="reveal rounded-3xl bg-white/[0.06] p-7 md:p-9" style={{ ["--d" as string]: "80ms" }}>
              <div className="text-6xl font-semibold tracking-[-0.04em] md:text-7xl">8<span className="text-3xl font-medium text-white/60 md:text-4xl"> t</span></div>
              <p className="mt-3 text-sm leading-snug text-white/65">Standard trucks for regional deliveries.</p>
            </div>
            <div className="reveal rounded-3xl bg-white/[0.06] p-7 md:p-9" style={{ ["--d" as string]: "160ms" }}>
              <div className="text-6xl font-semibold tracking-[-0.04em] md:text-7xl">36<span className="text-3xl font-medium text-white/60 md:text-4xl"> t</span></div>
              <p className="mt-3 text-sm leading-snug text-white/65">Super link trucks for heavy and cross-border loads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="reveal text-sm text-[#6e6e73]">Trusted by businesses across manufacturing, machinery and heavy industry</p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-x-12 gap-y-4 text-xl font-semibold tracking-tight text-black/35 md:text-2xl">
            {clients.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="bg-[#1c5386] py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="reveal max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Tell us what needs to move.
          </h2>
          <div className="reveal mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ ["--d" as string]: "100ms" }}>
            <Link href="/contact" className="rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-[#0B1628] transition hover:bg-white/90">
              Get a quote
            </Link>
            <a href={company.phoneHref} className="text-[15px] font-medium text-white/90 hover:text-white">
              Call {company.phoneDisplay}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-white/90 hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
