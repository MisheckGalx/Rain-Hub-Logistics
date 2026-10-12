import { Link, useLocation } from "wouter";
import { MessageCircle, Phone } from "lucide-react";
import { company, whatsappUrl } from "@/lib/company";

/** Phone-only bar that keeps the three ways to reach you one thumb-tap away. */
export default function MobileActionBar() {
  const [location] = useLocation();
  if (location === "/contact") return null; // the contact page already is the action
  const secondary =
    "flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-[14px] font-medium text-[#0B1628] active:bg-black/5";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 px-3 pt-2 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a href={company.phoneHref} className={secondary} aria-label={`Call ${company.phoneDisplay}`}>
          <Phone className="h-[18px] w-[18px] text-[#1c5386]" /> Call
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={secondary}>
          <MessageCircle className="h-[18px] w-[18px] text-[#1c9c55]" /> WhatsApp
        </a>
        <Link href="/contact" className="flex h-12 flex-[1.25] items-center justify-center rounded-full bg-[#1c5386] text-[14px] font-medium text-white active:bg-[#164470]">
          Get a quote
        </Link>
      </div>
    </div>
  );
}
