import { useState } from "react";
import { ArrowLeft, ArrowRight, Truck, Ship, Plane, FileText, Wrench } from "lucide-react";

const services = [
  {
    id: "road-freight",
    title: "Road Freight",
    badge: "Road",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&auto=format&fit=crop",
    shortDesc: "Regional and cross-border transportation within the SADC region and beyond.",
    fullDesc: "Our road freight service provides reliable, efficient transportation across the SADC region. We operate a modern fleet of well-maintained vehicles ranging from 8-tonne trucks to 36-tonne super link trucks, ensuring we can handle any cargo size or requirement.",
    features: [
      "Regional and cross-border transport within the SADC region",
      "Modern fleet from 8-tonne to 36-tonne super link capacity",
      "Professional, licensed drivers with safety training",
      "Real-time GPS tracking and cargo monitoring",
      "Comprehensive cargo insurance coverage",
      "Flexible scheduling and urgent delivery options",
    ],
  },
  {
    id: "sea-freight",
    title: "Sea Freight",
    badge: "Sea",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&auto=format&fit=crop",
    shortDesc: "Import and export shipping solutions with competitive rates and reliable service.",
    fullDesc: "Our sea freight services connect Africa to the world. We manage the complete import and export cycle including booking, documentation, port coordination, and delivery to your door.",
    features: [
      "FCL (Full Container Load) and LCL (Less Container Load) options",
      "Breakbulk and project cargo handling",
      "Complete documentation and customs filing",
      "Port of Durban, Cape Town, and East London coverage",
      "Cargo tracking from origin to destination",
      "Competitive freight rates through carrier partnerships",
    ],
  },
  {
    id: "air-freight",
    title: "Air Freight",
    badge: "Air",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop",
    shortDesc: "Fast and secure air cargo services for urgent shipments.",
    fullDesc: "When time is critical, our air freight service delivers. We offer express and standard air cargo solutions for shipments that demand speed and security.",
    features: [
      "Express next-day and standard air cargo options",
      "Dangerous goods handling certification",
      "Temperature-controlled shipments available",
      "Airside customs clearance and delivery",
      "OR Tambo, Cape Town, Lanseria airport handling",
      "Door-to-door and airport-to-airport options",
    ],
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    badge: "Customs",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&auto=format&fit=crop",
    shortDesc: "Full customs clearance services with documentation processing and compliance.",
    fullDesc: "Navigating customs compliance is complex. Our team handles all documentation, tariff classification, duty assessment, and regulatory compliance so your cargo clears without delays.",
    features: [
      "Import and export customs declarations (SARS compliance)",
      "Tariff classification and duty determination",
      "SADC cross-border customs procedures",
      "Permits, rebates, and duty drawback management",
      "Customs audit support and compliance consulting",
      "Digital documentation and e-filing",
    ],
  },
  {
    id: "truck-hire",
    title: "Truck Hire",
    badge: "Hire",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1617882291901-10bda0e62d68?w=900&auto=format&fit=crop",
    shortDesc: "Professional truck hire with experienced drivers — 8T to 36T capacity.",
    fullDesc: "Need transport capacity without the overhead? Our truck hire service gives you access to professional drivers and well-maintained vehicles on-demand.",
    features: [
      "8-tonne standard trucks for regional deliveries",
      "Super link trucks up to 36-tonne for heavy loads",
      "Experienced, PDPs-certified professional drivers",
      "Daily, weekly, and long-term contract options",
      "All insurance and compliance documentation included",
      "Flexible dispatch from Midrand hub",
    ],
  },
];

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const selected = services.find((s) => s.id === activeService);

  return (
    <main className="pt-20">
      {/* Page Hero */}
      <div className="relative min-h-[280px] sm:min-h-[360px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop" alt="Services" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/95 to-[#0055A5]/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">What We Offer</p>
          {/* FIX: clamp heading */}
          <h1 className="font-black text-white leading-none tracking-wide mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 8vw, 80px)" }}>
            OUR SERVICES
          </h1>
          <p className="text-white/70 text-sm sm:text-lg max-w-xl leading-relaxed">
            Comprehensive logistics solutions tailored to your business.
          </p>
        </div>
      </div>

      {!activeService ? (
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            {/* FIX: 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                    onClick={() => { setActiveService(service.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
                    <div className="relative h-44 sm:h-52 overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B1628]/60" />
                      <span className="absolute top-3 left-3 bg-[#F4A022] text-[#0B1628] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-md">
                        {service.badge}
                      </span>
                    </div>
                    <div className="p-5 sm:p-7">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#0055A5]/10 to-[#00A896]/10 rounded-xl flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-[#0055A5]" />
                      </div>
                      <h3 className="text-2xl font-black text-[#0B1628] mb-2 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{service.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                      <span className="inline-flex items-center gap-2 text-[#00A896] font-semibold text-sm group-hover:gap-3 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <button
              onClick={() => setActiveService(null)}
              className="inline-flex items-center gap-2 text-[#0055A5] font-semibold text-sm mb-8 hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </button>

            {selected && (
              /* FIX: stacked on mobile, side-by-side on lg */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-56 sm:h-80 lg:h-[420px] object-cover rounded-2xl shadow-xl"
                />
                <div>
                  <span className="inline-block bg-[#F4A022] text-[#0B1628] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-4">
                    {selected.badge}
                  </span>
                  <h2 className="font-black text-[#0B1628] leading-none mb-5 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 64px)" }}>
                    {selected.title.toUpperCase()}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">{selected.fullDesc}</p>
                  <div className="space-y-3 mt-5">
                    {selected.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <div className="w-2 h-2 min-w-[8px] bg-[#00A896] rounded-full mt-2" />
                        <p className="text-sm text-gray-700 leading-relaxed">{f}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="mt-7 w-full sm:w-auto bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    Get a {selected.title} Quote
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
