import { Truck, Ship, Plane, FileText, Wrench } from "lucide-react";

const services = [
  {
    id: "road-freight",
    title: "Road Freight",
    description:
      "Regional and cross-border transportation within the SADC region and beyond. Our modern fleet ensures safe and timely delivery of your cargo.",
    icon: Truck,
    color: "from-blue-500 to-blue-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663683190777/3qCB4iUGrpzzDKrL83u4aw/hero-truck-freight-CXyQefaHGFWPHpoXX8bt4Z.webp",
  },
  {
    id: "sea-freight",
    title: "Sea Freight",
    description:
      "Import and export shipping solutions with competitive rates and reliable service. We handle containerized and breakbulk cargo worldwide.",
    icon: Ship,
    color: "from-teal-500 to-teal-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663683190777/3qCB4iUGrpzzDKrL83u4aw/sea-freight-container-ship-XraWZh2dd39EDdwKsJmjYo.webp",
  },
  {
    id: "air-freight",
    title: "Air Freight",
    description:
      "Fast and secure air cargo services for urgent shipments. Perfect for time-sensitive deliveries requiring expedited handling.",
    icon: Plane,
    color: "from-cyan-500 to-cyan-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663683190777/3qCB4iUGrpzzDKrL83u4aw/air-freight-cargo-plane-3WC6BDqEt76JGt9nTA37MD.webp",
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    description:
      "Full customs clearance services with documentation processing and compliance with regional and international regulations.",
    icon: FileText,
    color: "from-orange-500 to-orange-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663683190777/3qCB4iUGrpzzDKrL83u4aw/warehouse-logistics-operations-9N6QEZipC42ruN4Zmh8V9T.webp",
  },
  {
    id: "truck-hire",
    title: "Truck Hire",
    description:
      "Professional truck hire with experienced drivers. Fleet includes 8-tonne trucks and super link trucks up to 36 tonnes capacity.",
    icon: Wrench,
    color: "from-indigo-500 to-indigo-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663683190777/3qCB4iUGrpzzDKrL83u4aw/hero-truck-freight-CXyQefaHGFWPHpoXX8bt4Z.webp",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive logistics solutions tailored to your business needs. From road to sea to air freight, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="scroll-animate hover-lift"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Icon Background */}
                  <div
                    className={`h-32 bg-gradient-to-br ${service.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
                    </div>
                    <IconComponent className="w-16 h-16 text-white relative z-10" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 transition-colors">
                      Learn more →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
