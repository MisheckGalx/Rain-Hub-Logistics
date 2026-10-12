import { Plus } from "lucide-react";
import faq from "@shared/faq.json";

export default function Faq() {
  return (
    <div>
      {faq.map((f) => (
        <details key={f.q} className="group border-t border-black/10 last:border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold tracking-[-0.015em] text-[#0B1628] md:text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-[#1c5386] transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-[#6e6e73] md:text-base">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
