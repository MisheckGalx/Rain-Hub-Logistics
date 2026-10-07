import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Page = "home" | "services" | "about" | "fleet" | "clients" | "contact";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

/* ─────────────────────────────────────────────────────────────
   HERO SLIDES
   Each slide = one photo + one message.
   To add your own photos: upload them to client/public/images/
   and change the `image` line (e.g. "/images/fleet-2.jpeg").
   `position` = which part of the photo stays in view,
   `origin`   = where the slow zoom drifts toward.
   ───────────────────────────────────────────────────────────── */
type Slide = {
  image: string;
  position: string;
  origin: string;
  zoomFrom: number;
  zoomTo: number;
  title: [string, string];
  text: string;
  primary: { label: string; page: Page };
  secondary: { label: string; page: Page };
};

const SLIDE_MS = 7000;

const slides: Slide[] = [
  {
    image: "/images/home-hero.jpeg",
    position: "72% 55%",
    origin: "70% 55%",
    zoomFrom: 1,
    zoomTo: 1.08,
    title: ["Move smarter.", "Deliver faster."],
    text: "Road, sea and air freight across the SADC region, with customs clearance handled for you.",
    primary: { label: "Get a free quote", page: "contact" },
    secondary: { label: "Our services", page: "services" },
  },
  {
    image: "/images/home-hero.jpeg",
    position: "75% 50%",
    origin: "72% 48%",
    zoomFrom: 1.18,
    zoomTo: 1.3,
    title: ["Trucks up to 36 tons,", "on the road today."],
    text: "Professional drivers and a reliable fleet moving your cargo across South Africa and the wider region.",
    primary: { label: "See our fleet", page: "fleet" },
    secondary: { label: "Get a free quote", page: "contact" },
  },
  {
    image: "/images/home-hero.jpeg",
    position: "20% 60%",
    origin: "15% 65%",
    zoomFrom: 1.05,
    zoomTo: 1.2,
    title: ["Customs sorted.", "Cargo moving."],
    text: "We handle the customs paperwork so your freight keeps moving across borders.",
    primary: { label: "Talk to us", page: "contact" },
    secondary: { label: "Customs clearance", page: "services" },
  },
];

const trust = [
  { num: "36T", label: "Fleet capacity" },
  { num: "5+", label: "Services" },
  { num: "SADC", label: "Region coverage" },
  { num: "24/7", label: "Support" },
];

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
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  // auto-advance (restarts after every manual change, pauses on hover/focus,
  // and stays still for people who prefer reduced motion)
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused]);

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

  const current = slides[index];

  return (
    <main>
      <style>{`
        .hero-img { transform: scale(var(--z0)); }
        .hero-img:not(.hero-active) { transform: scale(var(--z1)); }
        .hero-img.hero-active { animation: heroZoom 7.5s ease-out forwards; }
        @keyframes heroZoom { from { transform: scale(var(--z0)); } to { transform: scale(var(--z1)); } }
        .hero-copy { animation: heroCopy .8s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes heroCopy { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-img.hero-active, .hero-copy { animation: none; }
          .hero-img { transition: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0B1628]"
        aria-roledescription="carousel"
        aria-label="Rain Hub Logistics highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        {/* photos */}
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt={i === 0 ? "A Rain Hub Logistics truck on the open road" : ""}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            className={`hero-img absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? "hero-active opacity-100" : "opacity-0"
            }`}
            style={{
              objectPosition: s.position,
              transformOrigin: s.origin,
              "--z0": s.zoomFrom,
              "--z1": s.zoomTo,
            } as CSSProperties}
          />
        ))}

        {/* keep the words readable, keep the truck visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/90 via-[#0B1628]/55 to-[#0B1628]/5 max-md:from-[#0B1628]/80 max-md:via-[#0B1628]/60 max-md:to-[#0B1628]/35" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1628]/85 to-transparent" />

        {/* message */}
        <div className="relative z-10 container mx-auto flex h-full items-center px-6 pt-[68px] pb-48 md:pb-32">
          <div key={index} className="hero-copy max-w-2xl" aria-live="off">
            <h1
              className="text-[clamp(46px,7.5vw,96px)] leading-[0.95] tracking-wide text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block">{current.title[0]}</span>
              <span className="block">{current.title[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">{current.text}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => nav(current.primary.page)}
                className="rounded-lg bg-[#F4A022] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0B1628] transition-all hover:-translate-y-1 hover:bg-[#e8940f] hover:shadow-xl"
              >
                {current.primary.label}
              </button>
              <button
                onClick={() => nav(current.secondary.page)}
                className="rounded-lg border-2 border-white/40 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/10"
              >
                {current.secondary.label}
              </button>
            </div>
          </div>
        </div>

        {/* slide controls */}
        <div className="absolute inset-x-0 bottom-32 z-10 md:bottom-24">
          <div className="container mx-auto flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.title[0]}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-10 bg-[#F4A022]" : "w-5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* facts strip */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#0B1628]/70 backdrop-blur-sm">
          <div className="container mx-auto grid grid-cols-2 gap-y-3 px-6 py-4 md:grid-cols-4">
            {trust.map(({ num, label }) => (
              <div key={label} className="flex items-baseline gap-3">
                <span className="text-3xl leading-none text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{num}</span>
                <span className="text-sm text-white/65">{label}</span>
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
