import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

type Page = "home" | "services" | "about" | "fleet" | "clients" | "contact";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const whyCards = [
  { icon: "🛰️", title: "Technology Integration", desc: "Advanced logistics software for route optimization, inventory tracking, and real-time shipment visibility with digital documentation." },
  { icon: "🌿", title: "Sustainability Commitment", desc: "Green logistics practices including route optimization to reduce emissions, energy-efficient vehicles, and eco-friendly packaging." },
  { icon: "🎯", title: "Professional Expertise", desc: "Experienced transport coordinators and professional drivers with deep knowledge of regional logistics and customs procedures." },
  { icon: "🔗", title: "Comprehensive Solutions", desc: "One-stop solutions combining freight transportation, customs clearance, and truck hire for seamless SADC cargo movement." },
];

const clientNames = ["Aberdare Cables", "Manitou", "Insimbi", "LiuGong Machinery SA", "International Trucks", "Freightliner"];

export default function Home({ onNavigate }: HomeProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const nav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
            <source src="https://videos.pexels.com/video-files/3178116/3178116-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1628]/90 via-[#0055A5]/55 to-[#00A896]/25" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="inline-block bg-[#F4A022]/15 border border-[#F4A022]/40 text-[#F4A022] text-xs font-bold tracking-[3px] uppercase px-5 py-2 rounded-full mb-6">
            Your Trusted Logistics Partner in Africa
          </div>
          <h1 className="text-[clamp(52px,9vw,108px)] font-black text-white leading-none tracking-wide mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            MOVE <span className="text-[#00A896]">SMARTER.</span><br />DELIVER FASTER.
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Comprehensive freight & logistics solutions across the SADC region — road, sea, and air freight with unmatched reliability.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => nav("contact")} className="bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-xl">
              Get a Free Quote
            </button>
            <button onClick={() => nav("services")} className="bg-transparent border-2 border-white/35 hover:border-white text-white font-semibold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all hover:bg-white/10">
              Our Services
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 justify-center mt-16 flex-wrap">
            {[
              { num: "36T", lbl: "Fleet Capacity" },
              { num: "5+", lbl: "Services" },
              { num: "SADC", lbl: "Region Coverage" },
              { num: "24/7", lbl: "Support" },
            ].map(({ num, lbl }) => (
              <div key={lbl} className="text-center">
                <div className="text-[#00A896] font-black text-4xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{num}</div>
                <div className="text-white/45 text-xs tracking-[1.5px] uppercase mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate">
            <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">Why Rain Hub</p>
            <h2 className="text-5xl md:text-7xl font-black text-[#0B1628] leading-none mb-4 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              WHAT SETS US APART
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              We deliver excellence through reliability, innovation, and unwavering commitment to your supply chain success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card, i) => (
              <div key={card.title} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#00A896] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 scroll-animate" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-3xl mb-5">{card.icon}</div>
                <h3 className="text-xl font-black text-[#0B1628] mb-3 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="py-24 bg-[#0B1628] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600')] bg-cover bg-center opacity-[0.06]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-4">See Us In Action</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              LOGISTICS THAT<br />NEVER STOPS
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              From first mile to last mile — Rain Hub Logistics orchestrates complex supply chains so your business can focus on what matters most.
            </p>
            <div className="rounded-2xl overflow-hidden border-2 border-white/10 relative aspect-video">
              <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="https://videos.pexels.com/video-files/4439432/4439432-hd_1920_1080_30fps.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase text-center mb-3">Client Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1628] text-center mb-3 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          <p className="text-gray-400 text-sm text-center mb-12">Selected clients across manufacturing, infrastructure, and heavy industry.</p>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto mb-12">
            {clientNames.map((name) => (
              <div key={name} className="bg-gray-50 border border-gray-200 hover:border-[#00A896] hover:text-[#00A896] rounded-xl px-6 py-4 text-sm font-bold text-[#0B1628] tracking-wide transition-all duration-200 cursor-default">
                {name}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => nav("clients")} className="inline-flex items-center gap-2 bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-lg">
              View All Clients <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
