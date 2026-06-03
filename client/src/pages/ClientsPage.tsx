interface ClientsPageProps {
  onNavigate: (page: string) => void;
}

const clients = [
  {
    name: "ABERDARE CABLES",
    nameAccent: "CABLES",
    tag: "Electrical Infrastructure",
    contact: "Ola Ndlovu",
    role: "Rental Sales Administrator, Rental Department",
    tel: "+27 86 591 1537 / +27 11 396 8173",
    email: "mkhumalo@aberdare.co.za",
    quote: "A key partner in our cable distribution and logistics operations across the SADC region.",
  },
  {
    name: "MANITOU SA",
    nameAccent: "SA",
    tag: "Material Handling",
    contact: "",
    role: "Proton Industrial Park, Proton Street, Chloorkop Ext. 65",
    tel: "011 975 7770",
    email: "",
    quote: "International and regional logistics solutions for heavy equipment and material handling machinery.",
  },
  {
    name: "INSIMBI GROUP",
    nameAccent: "GROUP",
    tag: "Industrial & Manufacturing",
    contact: "Zulfikar",
    role: "",
    tel: "+27 (11) 865 8821 / +27 (71) 686 7655",
    email: "",
    quote: "Selected clients include International and Freightliner — full freight and logistics support provided.",
  },
  {
    name: "LIUGONG MACHINERY SA",
    nameAccent: "SA",
    tag: "Heavy Machinery",
    contact: "Rudy Coetzer",
    role: "Administration Manager",
    tel: "+27 11 979 0975",
    email: "rudyc@liugong.com",
    quote: "Logistics partner for LiuGong Machinery South Africa — handling equipment transport and import coordination.",
  },
  {
    name: "INTERNATIONAL TRUCKS",
    nameAccent: "TRUCKS",
    tag: "Truck Manufacturing",
    contact: "",
    role: "Commercial Vehicles — Southern Africa",
    tel: "",
    email: "",
    quote: "Selected partner for International and Freightliner truck logistics and parts distribution across South Africa.",
  },
  {
    name: "FREIGHTLINER",
    nameAccent: "",
    tag: "Commercial Transport",
    contact: "",
    role: "Heavy Vehicles — SADC Region",
    tel: "",
    email: "",
    quote: "Integrated logistics and supply chain support for Freightliner operations in the Southern African market.",
  },
];

export default function ClientsPage({ onNavigate }: ClientsPageProps) {
  return (
    <main className="pt-20">
      {/* Page Hero */}
      <div className="relative min-h-[280px] sm:min-h-[360px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&auto=format&fit=crop" alt="Clients" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/95 to-[#0055A5]/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">Client Portfolio</p>
          <h1 className="font-black text-white leading-none tracking-wide mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 8vw, 80px)" }}>
            OUR CLIENTS
          </h1>
          <p className="text-white/70 text-sm sm:text-lg max-w-xl leading-relaxed">
            Trusted by leading companies across manufacturing, infrastructure, mining, and heavy industry throughout Southern Africa.
          </p>
        </div>
      </div>

      {/* Client Cards */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm mb-10 sm:mb-14">
            Selected clients include International and Freightliner
          </p>

          {/* FIX: 1 col mobile, 2 col md, 3 col lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-12 sm:mb-16">
            {clients.map((c) => (
              <div
                key={c.name}
                className="bg-white rounded-2xl border border-gray-200 px-6 sm:px-9 pt-8 pb-0 relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0055A5] to-[#00A896]" />

                {/* FIX: name font clamps so long names don't overflow */}
                <div
                  className="font-black text-[#0B1628] tracking-widest mb-1 leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(18px, 3vw, 24px)" }}
                >
                  {c.name.replace(c.nameAccent, "")}
                  <span className="text-[#00A896]">{c.nameAccent}</span>
                </div>

                <span className="inline-block bg-[#00A896]/10 text-[#00A896] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                  {c.tag}
                </span>

                <div className="space-y-2 mb-5">
                  {c.contact && (
                    <div className="flex gap-2 text-sm flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wide text-[#0B1628] min-w-[58px]">Contact</span>
                      <span className="text-gray-500">{c.contact}</span>
                    </div>
                  )}
                  {c.role && (
                    <div className="flex gap-2 text-sm flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wide text-[#0B1628] min-w-[58px]">Role</span>
                      <span className="text-gray-500 text-xs leading-relaxed">{c.role}</span>
                    </div>
                  )}
                  {c.tel && (
                    <div className="flex gap-2 text-sm flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wide text-[#0B1628] min-w-[58px]">Tel</span>
                      {/* FIX: tel wraps properly on small screens */}
                      <a href={`tel:${c.tel.split("/")[0].trim()}`} className="text-gray-500 text-xs break-all">{c.tel}</a>
                    </div>
                  )}
                  {c.email && (
                    <div className="flex gap-2 text-sm flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wide text-[#0B1628] min-w-[58px]">Email</span>
                      <a href={`mailto:${c.email}`} className="text-[#00A896] hover:underline text-xs break-all">{c.email}</a>
                    </div>
                  )}
                </div>

                {/* FIX: quote panel flush to card edges */}
                <div className="-mx-6 sm:-mx-9 bg-gray-50 px-6 sm:px-9 py-4 border-t border-gray-100 rounded-b-2xl">
                  <p className="text-xs text-gray-500 italic leading-relaxed">&ldquo;{c.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
            <h3 className="font-black text-[#0B1628] mb-4 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 40px)" }}>
              JOIN OUR CLIENT PORTFOLIO
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-7 leading-relaxed">
              Let us become your trusted logistics partner. Contact us today for a customised solution built around your business needs.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto bg-[#F4A022] hover:bg-[#e8940f] text-[#0B1628] font-bold px-10 py-4 rounded-lg text-sm uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
