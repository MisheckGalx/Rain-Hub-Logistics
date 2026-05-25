import { Mail, Phone, MapPin } from "lucide-react";

type Page = "home" | "services" | "about" | "fleet" | "clients" | "contact";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B1628] text-white/60">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>RH</span>
              </div>
              <div>
                <div className="text-white font-black text-sm tracking-[2px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>RAIN HUB</div>
                <div className="text-white/35 text-[10px] tracking-[2px] uppercase">Logistics PTY LTD</div>
              </div>
            </div>
            <p className="text-sm text-white/45 leading-relaxed max-w-[240px]">
              Your trusted partner for comprehensive logistics solutions across the SADC region and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {(["home", "about", "fleet", "clients"] as Page[]).map((p) => (
                <li key={p}>
                  <button onClick={() => handleNav(p)} className="text-sm text-white/45 hover:text-[#00A896] transition-colors capitalize">
                    {p === "home" ? "Home" : p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-white mb-5">Services</h4>
            <ul className="space-y-2.5">
              {["Road Freight", "Sea Freight", "Air Freight", "Customs Clearance", "Truck Hire"].map((s) => (
                <li key={s}>
                  <button onClick={() => handleNav("services")} className="text-sm text-white/45 hover:text-[#00A896] transition-colors text-left">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-white mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A896] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/45 leading-relaxed">
                  1070 Old Pretoria Road<br />Midrand, Johannesburg 1685
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                <a href="tel:+27010850769" className="text-sm text-white/45 hover:text-[#00A896] transition-colors">010 085 0769</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                <a href="mailto:info@rainhubsolutions.co.za" className="text-sm text-white/45 hover:text-[#00A896] transition-colors break-all">
                  info@rainhubsolutions.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Rain Hub Logistics PTY LTD. All rights reserved.</p>
          <p className="text-xs text-white/25">Midrand, Johannesburg, South Africa</p>
        </div>
      </div>
    </footer>
  );
}
