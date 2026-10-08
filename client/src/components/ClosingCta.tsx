import { Link } from "wouter";
import { company, whatsappUrl } from "@/lib/company";

/** The blue "next step" band that closes every page. */
export default function ClosingCta({
  heading = "Tell us what needs to move.",
  service,
}: {
  heading?: string;
  service?: string;
}) {
  const href = service ? `/contact?service=${encodeURIComponent(service)}` : "/contact";
  return (
    <section className="bg-[#1c5386] py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="reveal max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">{heading}</h2>
        <div className="reveal mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ ["--d" as string]: "100ms" }}>
          <Link href={href} className="rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-[#0B1628] transition hover:bg-white/90">
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
  );
}
