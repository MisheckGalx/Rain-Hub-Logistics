import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import ClosingCta from "@/components/ClosingCta";

const trucks = [
  {
    name: "Standard truck",
    big: "8",
    unit: "tonnes",
    rows: [
      ["Best for", "Regional deliveries, FMCG, retail and general cargo"],
      ["Where it runs", "Gauteng and surrounding provinces, and across the SADC region"],
      ["Typical use", "Flexible, smaller or more frequent loads"],
    ],
  },
  {
    name: "Super link",
    big: "36",
    unit: "tonnes",
    rows: [
      ["Best for", "Bulk and heavy loads, long-distance haulage"],
      ["Where it runs", "Cross-border routes across the SADC region"],
      ["Equipment", "Curtainsider, with flatbed available"],
    ],
  },
];

export default function FleetPage() {
  useReveal();
  return (
    <main>
      <section className="bg-white pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="rise max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#0B1628] md:text-7xl">
            Eight tonnes to thirty&#8209;six, dispatched from Midrand.
          </h1>
          <p className="rise mt-5 max-w-xl text-lg leading-snug text-[#6e6e73]" style={{ ["--d" as string]: "120ms" }}>
            The right truck for the load, with a professional driver, whether it's one delivery or a standing contract.
          </p>
        </div>
      </section>

      {/* Real photo band. Swap in more of your own trucks here as you take them. */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal overflow-hidden rounded-3xl bg-[#F5F5F7]">
            <picture>
              <source srcSet="/images/home-hero.webp" type="image/webp" />
              <img
                src="/images/home-hero.jpeg"
                alt="A Rain Hub truck parked beside a quiet open road"
                loading="lazy"
                className="h-[320px] w-full object-cover object-[72%_50%] md:h-[520px]"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Spec comparison */}
      <section className="bg-[#F5F5F7] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="reveal max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1628] md:text-6xl">
            Choose the size that fits.
          </h2>

          <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2">
            {trucks.map((t, i) => (
              <div key={t.name} className="reveal flex flex-col rounded-3xl bg-white p-8 md:p-10" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <p className="text-sm font-medium text-[#6e6e73]">{t.name}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[84px] font-semibold leading-none tracking-[-0.05em] text-[#0B1628] md:text-[104px]">{t.big}</span>
                  <span className="text-xl font-medium text-[#6e6e73]">{t.unit}</span>
                </div>
                <dl className="mt-8 flex-1">
                  {t.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[88px_1fr] gap-4 border-t md:grid-cols-[110px_1fr] border-black/10 py-4 text-[15px] leading-snug">
                      <dt className="text-[#6e6e73]">{k}</dt>
                      <dd className="text-[#0B1628]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={`/contact?service=${encodeURIComponent("Truck hire")}`}
                  className="mt-6 self-start rounded-full bg-[#1c5386] px-6 py-3 text-[15px] font-medium text-white transition hover:bg-[#164470]"
                >
                  Ask about this truck
                </Link>
              </div>
            ))}
          </div>

          <p className="reveal mt-8 max-w-xl text-[15px] leading-relaxed text-[#6e6e73]">
            Not sure which one you need? Tell us what's moving and where, and we'll recommend the right size.
          </p>
        </div>
      </section>

      <ClosingCta heading="Need a truck? Tell us the load." service="Truck hire" />
    </main>
  );
}
