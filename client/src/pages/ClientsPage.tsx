import { useReveal } from "@/hooks/useReveal";
import ClosingCta from "@/components/ClosingCta";

/**
 * Client names only, no personal contact details (POPIA). Before launch, confirm each
 * company is happy to be listed. When you have their logos, show them in place of the names.
 */
const clients = [
  { name: "Aberdare Cables", what: "Cable distribution across the SADC region" },
  { name: "Manitou SA", what: "Heavy equipment and material handling machinery" },
  { name: "LiuGong Machinery SA", what: "Equipment transport and import coordination" },
  { name: "International Trucks", what: "Truck logistics and parts distribution across South Africa" },
  { name: "Freightliner", what: "Logistics and supply chain support in the Southern African market" },
  { name: "Insimbi Group", what: "Freight and logistics support" },
];

export default function ClientsPage() {
  useReveal();
  return (
    <main>
      <section className="bg-white pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="rise max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#0B1628] md:text-7xl">
            Businesses that rely on us to move their freight.
          </h1>
          <p className="rise mt-5 max-w-xl text-lg leading-snug text-[#6e6e73]" style={{ ["--d" as string]: "120ms" }}>
            From cable and heavy machinery to trucks and parts, here are some of the companies we work with.
          </p>
        </div>
      </section>

      <section className="bg-white pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          {clients.map((c, i) => (
            <div
              key={c.name}
              className="reveal grid gap-1 border-t border-black/10 py-7 last:border-b md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10 md:py-9"
              style={{ ["--d" as string]: `${i * 50}ms` }}
            >
              <div className="text-2xl font-semibold tracking-[-0.025em] text-[#0B1628] md:text-4xl">{c.name}</div>
              <p className="text-[15px] leading-snug text-[#6e6e73] md:text-base">{c.what}</p>
            </div>
          ))}
        </div>
      </section>

      <ClosingCta heading="Your freight, in good hands." />
    </main>
  );
}
