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

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "About", page: "about" },
    { label: "Fleet", page: "fleet" },
    { label: "Clients", page: "clients" },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1628]/98 shadow-2xl backdrop-blur-md"
          : "bg-[#0B1628]/96 backdrop-blur-sm"
      }`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <button onClick={() => handleNav("home")} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-base tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>RH</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-white font-black text-base tracking-[2px] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>RAIN HUB</div>
              <div className="text-white/40 text-[10px] tracking-[2px] uppercase mt-0.5">Logistics PTY LTD</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                  currentPage === page
                    ? "text-white bg-white/10"
                    : "text-white/65 hover:text-white hover:bg-white/8"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav("contact")}
              className={`ml-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 ${
                currentPage === "contact"
                  ? "bg-[#e8940f] text-[#0B1628]"
                  : "bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] hover:shadow-lg"
              }`}
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-5 pt-2 space-y-1 border-t border-white/10 mt-2">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-colors ${
                  currentPage === page
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav("contact")}
              className="block w-full text-center mt-3 bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] font-bold px-4 py-3 rounded-xl text-sm uppercase tracking-widest transition-colors"
            >
              Get a Quote
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
