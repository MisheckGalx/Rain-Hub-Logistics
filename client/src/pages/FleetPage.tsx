interface FleetPageProps {
  onNavigate: (page: string) => void;
}

const fleetData = [
  {
    name: "Standard Trucks",
    capacity: "8T",
    capacityFull: "8 Tonnes",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&auto=format&fit=crop",
    desc: "Perfect for regional deliveries and flexible cargo requirements. Ideal for FMCG, retail, and general cargo across Gauteng and surrounding provinces.",
    specs: ["8 Tonnes", "GPS Tracked", "Insured", "SADC Ready"],
  },
  {
    name: "Super Link Trucks",
    capacity: "36T",
    capacityFull: "Up to 36 Tonnes",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&auto=format&fit=crop",
    desc: "Ideal for bulk cargo, heavy loads, and long-distance haulage. Our super link fleet is built for the toughest cross-border routes in the SADC region.",
    specs: ["Up to 36 Tonnes", "Cross-Border", "Curtainsider", "Flatbed Available"],
  },
];

const features = [
  { icon: "⚡", title: "Modern Fleet", desc: "Well-maintained vehicles equipped with latest tracking technology" },
  { icon: "🛡️", title: "Safety First", desc: "Professional drivers and comprehensive insurance coverage on every trip" },
  { icon: "📍", title: "Wide Coverage", desc: "Operating across SADC region with established cross-border routes" },
  { icon: "📊", title: "GPS Tracking", desc: "Real-time cargo visibility from pickup to final delivery" },
];

export default function FleetPage({ onNavigate }: FleetPageProps) {
  return (
    <main className="pt-20">
      {/* Page Hero */}
      <div className="relative min-h-[360px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&auto=format&fit=crop"
            alt="Fleet"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/95 to-[#0055A5]/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">Our Vehicles</p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-wide mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            THE FLEET
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Modern, well-maintained vehicles designed to handle diverse cargo requirements with efficiency and reliability across the region.
          </p>
        </div>
      </div>

      {/* Fleet Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {fleetData.map((truck) => (
              <div key={truck.name} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img src={truck.image} alt={truck.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4 bg-[#0B1628]/85 text-[#00A896] font-black text-3xl px-4 py-2 rounded-xl border border-[#00A896]/30" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {truck.capacity}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-black text-[#0B1628] mb-3 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {truck.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{truck.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {truck.specs.map((spec) => (
                      <span key={spec} className="bg-gray-100 text-[#0B1628] text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-7 text-center hover:border-[#00A896] hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h4 className="text-xl font-black text-[#0B1628] mb-2 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{f.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-[#0B1628]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">Coverage Area</p>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-none mb-6 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                GLOBAL REACH, LOCAL EXPERTISE
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-4">
                Our primary operations are anchored in the SADC region — South Africa, Zimbabwe, Zambia, Mozambique, Botswana, Namibia, and beyond.
              </p>
              <p className="text-white/65 text-base leading-relaxed mb-8">
                Strategic partnerships enable seamless connections across Africa and to international markets via major ports and airports.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-white/8 border border-white/15 rounded-xl px-5 py-3">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Primary</div>
                  <div className="text-white font-semibold text-sm">SADC Region</div>
                </div>
                <div className="bg-white/8 border border-white/15 rounded-xl px-5 py-3">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Extended</div>
                  <div className="text-white font-semibold text-sm">Global Freight</div>
                </div>
              </div>
            </div>

            {/* SVG Map */}
            <div className="bg-[#0a1a2e] border border-white/10 rounded-2xl overflow-hidden aspect-video flex items-center justify-center p-6">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path d="M160,30 L200,20 L240,25 L260,50 L270,80 L280,120 L285,160 L280,200 L260,240 L240,270 L220,285 L200,290 L180,285 L160,270 L140,240 L130,200 L125,160 L130,120 L140,80 L145,50 Z"
                  fill="none" stroke="rgba(0,168,150,0.3)" strokeWidth="2" />
                <ellipse cx="200" cy="190" rx="65" ry="75" fill="rgba(0,168,150,0.08)" stroke="rgba(0,168,150,0.4)" strokeWidth="1.5" strokeDasharray="5,3" />
                <circle cx="195" cy="195" r="8" fill="#F4A022" opacity="0.9" />
                <circle cx="195" cy="195" r="18" fill="#F4A022" opacity="0.15" />
                <text x="210" y="192" fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="Outfit,sans-serif" fontWeight="600">Johannesburg</text>
                <line x1="195" y1="195" x2="195" y2="130" stroke="rgba(0,168,150,0.4)" strokeWidth="1" strokeDasharray="4,3" />
                <line x1="195" y1="195" x2="235" y2="175" stroke="rgba(0,168,150,0.4)" strokeWidth="1" strokeDasharray="4,3" />
                <line x1="195" y1="195" x2="158" y2="175" stroke="rgba(0,168,150,0.4)" strokeWidth="1" strokeDasharray="4,3" />
                <line x1="195" y1="195" x2="195" y2="248" stroke="rgba(0,168,150,0.4)" strokeWidth="1" strokeDasharray="4,3" />
                <circle cx="195" cy="130" r="4" fill="rgba(255,255,255,0.5)" />
                <text x="203" y="133" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">Harare</text>
                <circle cx="235" cy="175" r="4" fill="rgba(255,255,255,0.5)" />
                <text x="243" y="178" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">Maputo</text>
                <circle cx="158" cy="175" r="4" fill="rgba(255,255,255,0.5)" />
                <text x="100" y="178" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">Gaborone</text>
                <circle cx="195" cy="248" r="4" fill="rgba(255,255,255,0.5)" />
                <text x="168" y="260" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Outfit,sans-serif">Cape Town</text>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
