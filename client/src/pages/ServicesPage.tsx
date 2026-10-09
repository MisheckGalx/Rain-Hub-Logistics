import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import ClosingCta from "@/components/ClosingCta";
import ServiceVisual from "@/components/ServiceVisual";

const services = [
  {
    id: "road-freight",
    nav: "Road",
    name: "Road freight",
    quoteAs: "Road freight",
    facts: "8–36 tonnes · SADC region · Dispatched from Midrand",
    text: "Regional and cross-border trucking across the SADC region, on trucks from 8 to 36 tonnes. Tell us the load and we'll match the right truck, so you're not paying for space you don't need.",
    included: [
      "Regional and cross-border transport within SADC",
      "Trucks from 8-tonne to 36-tonne super link",
      "Professional, licensed drivers",
      "Flexible scheduling and urgent deliveries",
    ],
  },
  {
    id: "sea-freight",
    nav: "Sea",
    name: "Sea freight",
    quoteAs: "Sea freight",
    facts: "Containers and breakbulk · Durban, Cape Town, East London",
    text: "Imports and exports from booking to your door. We take care of the documentation, port coordination and delivery, for containers and for breakbulk cargo.",
    included: [
      "Full container (FCL) and part container (LCL) loads",
      "Breakbulk and project cargo",
      "Documentation and customs filing",
      "Ports of Durban, Cape Town and East London",
    ],
  },
  {
    id: "air-freight",
    nav: "Air",
    name: "Air freight",
    quoteAs: "Air freight",
    facts: "Express and standard · OR Tambo, Cape Town, Lanseria",
    text: "For shipments that can't wait. Express and standard air cargo for time-sensitive, high-value or perishable goods.",
    included: [
      "Express and standard air cargo options",
      "Door-to-door or airport-to-airport",
      "Handling at OR Tambo, Cape Town and Lanseria",
      "Customs clearance and delivery",
    ],
  },
  {
    id: "customs-clearance",
    nav: "Customs",
    name: "Customs clearance",
    quoteAs: "Customs clearance",
    facts: "Imports and exports · SARS compliant",
    text: "Customs paperwork is where cargo gets stuck. Our team handles declarations, tariff classification, duties and compliance so your goods clear without delays.",
    included: [
      "Import and export declarations (SARS)",
      "Tariff classification and duty determination",
      "SADC cross-border customs procedures",
      "Permits, rebates and duty drawback",
    ],
  },
  {
    id: "truck-hire",
    nav: "Truck hire",
    name: "Truck hire",
    quoteAs: "Truck hire",
    facts: "8–36 tonnes · Daily to long-term · Dispatched from Midrand",
    text: "Transport capacity without the overhead: a truck and a professional driver, for a single trip or a long-term contract.",
    included: [
      "8-tonne standard trucks for regional deliveries",
      "Super link trucks up to 36 tonnes for heavy loads",
      "Daily, weekly and long-term contracts",
      "Insurance and compliance documentation included",
    ],
  },
];

export default function ServicesPage() {
  useReveal();
  const [active, setActive] = useState(services[0].id);

  // Highlight the section nearest the middle of the screen in the sticky bar.
  useEffect(() => {
    const els = services.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <section className="bg-white pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="rise max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#0B1628] md:text-7xl">
            One team for the whole journey.
          </h1>
          <p className="rise mt-5 max-w-xl text-lg leading-snug text-[#6e6e73]" style={{ ["--d" as string]: "120ms" }}>
            Road, sea and air freight, customs clearance and truck hire. Use one service or all five, and deal with one team either way.
          </p>
        </div>
      </section>

      {/* Sticky section bar */}
      <div className="sticky top-14 z-40 border-y border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none]">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                active === s.id ? "bg-[#0B1628] text-white" : "text-[#0B1628]/65 hover:text-[#0B1628]"
              }`}
            >
              {s.nav}
            </a>
          ))}
        </div>
      </div>

      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-24 py-20 md:py-28 ${i % 2 === 0 ? "bg-white" : "bg-[#F5F5F7]"}`}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-20">
            <div className={`reveal ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <p className="text-sm font-medium text-[#1c5386]">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0B1628] md:text-6xl">{s.name}</h2>
              <p className="mt-4 text-sm font-medium text-[#1c5386]">{s.facts}</p>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#424245]">{s.text}</p>

              <ul className="mt-8">
                {s.included.map((item) => (
                  <li key={item} className="flex gap-3.5 border-t border-black/10 py-3.5 text-[15px] leading-snug text-[#0B1628] last:border-b">
                    <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#1c5386]" strokeWidth={2.25} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?service=${encodeURIComponent(s.quoteAs)}`}
                className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1c5386]"
              >
                Get a quote for {s.name.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className={`reveal ${i % 2 === 1 ? "md:order-1" : ""}`} style={{ ["--d" as string]: "100ms" }}>
              <ServiceVisual id={s.id} />
            </div>
          </div>
        </section>
      ))}

      <ClosingCta />
    </main>
  );
}
