const values = [
  { num: "01", title: "INTEGRITY", desc: "Upholding transparency and honesty in all operations and client relationships." },
  { num: "02", title: "EFFICIENCY", desc: "Streamlining processes to ensure timely and cost-effective delivery every time." },
  { num: "03", title: "INNOVATION", desc: "Leveraging technology to continuously enhance logistics performance and visibility." },
  { num: "04", title: "SUSTAINABILITY", desc: "Promoting eco-friendly logistics practices and reducing environmental impact." },
  { num: "05", title: "CUSTOMER FIRST", desc: "Building long-term relationships through exceptional service and responsiveness." },
];

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <main className="pt-20">
      {/* Page Hero */}
      <div className="relative min-h-[360px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&auto=format&fit=crop"
            alt="About"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/95 to-[#0055A5]/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 py-16">
          <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">Our Story</p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-wide mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ABOUT RAIN HUB
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            A comprehensive logistics solutions provider dedicated to delivering reliable, efficient, and cost-effective freight services across Africa.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&auto=format&fit=crop"
                alt="Rain Hub Logistics"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute -bottom-5 -right-5 w-48 h-36 bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-2xl p-5 text-white hidden md:block">
                <div className="text-5xl font-black leading-none mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>SADC+</div>
                <div className="text-xs text-white/75 uppercase tracking-widest leading-relaxed">Region Coverage & Beyond</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-[#0B1628] leading-none mb-6 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                CENTRE OF LOGISTICS EXCELLENCE
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-4">
                Rain Hub Logistics is a comprehensive logistics solutions provider dedicated to delivering reliable, efficient, and cost-effective freight services across the SADC region and beyond. Our operations are built on professionalism, safety, and timely delivery.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We ensure that our clients' cargo reaches its destination in optimal condition — every time. By combining advanced logistics technology with deep regional knowledge, we provide integrated solutions that add genuine value to your supply chain.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Products delivered on time and in good condition — every shipment",
                  "Connecting producers with consumers across Africa and globally",
                  "Essential logistics infrastructure for business growth",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 min-w-[24px] bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-5">
                <div className="flex-1 bg-gray-50 rounded-xl p-5 text-center">
                  <div className="text-4xl font-black text-[#0055A5] leading-none mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>3</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Transport Modes</div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-5 text-center">
                  <div className="text-4xl font-black text-[#00A896] leading-none mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>5+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Core Services</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <div className="bg-gradient-to-br from-[#0B1628] to-[#0055A5] rounded-2xl p-10 text-white">
              <h3 className="text-3xl font-black mb-4 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>OUR MISSION</h3>
              <p className="text-white/75 text-base leading-relaxed">
                To provide integrated logistics solutions that ensure safe, efficient, and timely movement of goods while adding real value to our clients' supply chains across the SADC region and beyond.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#00A896] to-[#007a6e] rounded-2xl p-10 text-white">
              <h3 className="text-3xl font-black mb-4 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>OUR VISION</h3>
              <p className="text-white/75 text-base leading-relaxed">
                To become a leading logistics hub within the SADC region, recognized for reliability, innovation, and excellence in freight and customs services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#0B1628]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">What We Stand For</p>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              CORE VALUES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div
                key={v.num}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#00A896]/40 transition-all duration-300"
              >
                <div className="text-5xl font-black text-[#00A896]/25 leading-none mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {v.num}
                </div>
                <h4 className="text-xl font-black text-white mb-2 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {v.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
