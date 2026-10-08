import { useReveal } from "@/hooks/useReveal";
import ClosingCta from "@/components/ClosingCta";

/**
 * Logos: drop files into src/assets/clients/<slug>.svg (or .png/.webp/.jpg) and they appear here
 * automatically. Until a logo exists, the client shows as a clean wordmark. See that folder's README.
 *
 * Before launch, confirm each company is happy to be listed. Set `show: false` to hide one.
 * No personal contact details here, on purpose (POPIA).
 */
const clients = [
  { slug: "aberdare-cables", name: "Aberdare Cables", what: "Cable distribution across the SADC region", show: true },
  { slug: "manitou-sa", name: "Manitou SA", what: "Heavy equipment and material handling machinery", show: true },
  { slug: "liugong-machinery-sa", name: "LiuGong Machinery SA", what: "Equipment transport and import coordination", show: true },
  { slug: "international-trucks", name: "International Trucks", what: "Truck logistics and parts distribution across South Africa", show: true },
  { slug: "freightliner", name: "Freightliner", what: "Logistics and supply chain support in the Southern African market", show: true },
  { slug: "insimbi-group", name: "Insimbi Group", what: "Freight and logistics support", show: true },
];

// Finds whichever logo files exist at build time, so a missing logo never causes a broken image.
const logoFiles = import.meta.glob("../assets/clients/*.{svg,png,webp,jpg,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const logos: Record<string, string> = {};
for (const [path, url] of Object.entries(logoFiles)) {
  logos[path.split("/").pop()!.replace(/\.[^.]+$/, "")] = url;
}

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
        <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients
            .filter((c) => c.show)
            .map((c, i) => {
              const logo = logos[c.slug];
              return (
                <div
                  key={c.slug}
                  className="reveal flex flex-col rounded-3xl bg-[#F5F5F7] p-8 transition-colors duration-300 hover:bg-[#ECECEF] md:p-9"
                  style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}
                >
                  <div className="flex h-24 items-center">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${c.name} logo`}
                        loading="lazy"
                        className="max-h-14 max-w-[75%] object-contain mix-blend-multiply"
                      />
                    ) : (
                      <span className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0B1628]">{c.name}</span>
                    )}
                  </div>
                  <p className="mt-6 border-t border-black/10 pt-5 text-[15px] leading-snug text-[#6e6e73]">{c.what}</p>
                </div>
              );
            })}
        </div>
      </section>

      <ClosingCta heading="Your freight, in good hands." />
    </main>
  );
}
