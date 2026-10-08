import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Clients", href: "/clients" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
        scrolled || open ? "bg-white/85 shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-white/70"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <Link href="/" className="flex items-center" aria-label="Rain Hub Logistics, home">
          <img src="/images/logo.png" alt="Rain Hub Logistics" className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] tracking-tight transition-colors ${
                location.startsWith(l.href) ? "text-[#0B1628]" : "text-[#0B1628]/60 hover:text-[#0B1628]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-[#1c5386] px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-[#164470]"
          >
            Get a quote
          </Link>
        </div>

        <button
          className="-mr-2 p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5 text-[#0B1628]" /> : <Menu className="h-5 w-5 text-[#0B1628]" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 px-6 pb-8 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block border-b border-black/5 py-4 text-2xl font-semibold tracking-tight text-[#0B1628]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 block rounded-full bg-[#1c5386] py-3.5 text-center text-[15px] font-medium text-white"
          >
            Get a quote
          </Link>
        </div>
      )}
    </header>
  );
}
