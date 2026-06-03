import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type Page = "home" | "services" | "about" | "fleet" | "clients" | "contact";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX: close mobile menu on page change
  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // FIX: lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "About", page: "about" },
    { label: "Fleet", page: "fleet" },
    { label: "Clients", page: "clients" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0B1628]/98 shadow-2xl backdrop-blur-md" : "bg-[#0B1628]/96 backdrop-blur-sm"
        }`}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => handleNav("home")} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>RH</span>
              </div>
              <div className="hidden xs:block text-left">
                <div className="text-white font-black text-sm sm:text-base tracking-[2px] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>RAIN HUB</div>
                <div className="text-white/40 text-[9px] tracking-[2px] uppercase mt-0.5">Logistics PTY LTD</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                    currentPage === page ? "text-white bg-white/10" : "text-white/65 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => handleNav("contact")}
                className={`ml-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 ${
                  currentPage === "contact" ? "bg-[#e8940f] text-[#0B1628]" : "bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] hover:shadow-lg"
                }`}
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* FIX: mobile menu as full-screen overlay — no layout shift, no clipping */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
          {/* drawer slides in from right */}
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-[#0B1628] border-l border-white/10 flex flex-col pt-20 px-6 pb-8">
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-colors ${
                    currentPage === page ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* CTA at bottom of drawer */}
            <button
              onClick={() => handleNav("contact")}
              className="w-full bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] font-bold px-4 py-4 rounded-xl text-sm uppercase tracking-widest transition-colors mt-4"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
