import { useReveal } from "@/hooks/useReveal";
import { company } from "@/lib/company";
import ClosingCta from "@/components/ClosingCta";
import Slideshow, { type Slide } from "@/components/Slideshow";

/**
 * People section: add the real team here and it appears automatically.
 * Leave the list empty and the section stays hidden (better than made-up faces).
 *   { name: "Full Name", role: "Founder & Director", photo: "/images/people/name.jpg", note: "One honest sentence about them." }
 */
const people: { name: string; role: string; photo?: string; note?: string }[] = [];

// Landscape photos only: they stay sharp when stretched across the full screen.
const slides: Slide[] = [
  { name: "road-low", alt: "A truck far down a wide road, seen from a low angle under a deep blue sky", position: "object-[35%_50%]" },
  { name: "truck-road", alt: "A Rain Hub truck parked on the roadside with the open road ahead", position: "object-[72%_50%]" },
  { name: "road-rear-a", alt: "The truck parked on the shoulder of a long straight road", position: "object-[40%_50%]" },
  { name: "hero-road", alt: "A Rain Hub truck beside a quiet open road, with veld and hills behind", position: "object-[70%_55%]" },
];

const principles = [
  { title: "Straight answers", text: "A clear price, an honest timeline, and a phone call if either of them changes." },
  { title: "The right truck for the load", text: "From 8 to 36 tonnes, so you pay for the capacity you actually need." },
  { title: "One team, start to finish", text: "Trucking, customs and shipping handled together, so nothing falls between suppliers." },
];

export default function AboutPage() {
  useReveal();
  return (
    <main>
      <Slideshow slides={slides} className="flex h-[88svh] min-h-[600px] items-end">
        <div className="pointer-events-none relative mx-auto w-full max-w-6xl px-6 pb-20 text-white md:pb-24">
          <h1 className="rise max-w-4xl text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-7xl">
            A Midrand logistics company, working across Southern Africa.
          </h1>
          <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl" style={{ ["--d" as string]: "120ms" }}>
            {company.name} moves cargo by road, sea and air, clears it through customs, and hires out trucks with drivers. We're based at{" "}
            {company.addressLines[1].replace("Halfway House, ", "")}, and we run the whole job so you only have one number to call.
          </p>
        </div>
      </Slideshow>

      {/* Brand band */}
      <section className="bg-[#1c5386] py-14 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
          <img src="/images/logo-white.png" alt="Rain Hub Logistics" className="w-[220px] md:w-[260px]" />
          <p className="max-w-sm text-center text-lg leading-snug text-white/85 md:text-right">
            {company.legalName}
            <br />
            Midrand, Johannesburg
          </p>
        </div>
      </section>

      <section className="bg-[#F5F5F7] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="reveal max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1628] md:text-6xl">
            How we work.
          </h2>
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <div key={p.title} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <div className="text-6xl font-light tracking-tight text-[#1c5386] md:text-7xl">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#0B1628]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {people.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="reveal text-4xl font-semibold tracking-[-0.03em] text-[#0B1628] md:text-6xl">The people behind it.</h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {people.map((p) => (
                <div key={p.name} className="reveal">
                  {p.photo && <img src={p.photo} alt={p.name} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />}
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#0B1628]">{p.name}</h3>
                  <p className="text-[15px] text-[#6e6e73]">{p.role}</p>
                  {p.note && <p className="mt-2 text-[15px] leading-relaxed text-[#424245]">{p.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-20">
          <h2 className="reveal text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1628] md:text-5xl">Come and see us.</h2>
          <div className="reveal space-y-6 text-[15px]" style={{ ["--d" as string]: "100ms" }}>
            <address className="not-italic leading-relaxed text-[#0B1628]">
              <div className="font-semibold">{company.legalName}</div>
              {company.addressLines.map((l) => <div key={l}>{l}</div>)}
            </address>
            <dl className="space-y-0.5 text-[#0B1628]">
              {company.hours.map(([d, h]) => (
                <div key={d} className="flex max-w-xs justify-between gap-4"><dt>{d}</dt><dd className="text-[#6e6e73]">{h}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
