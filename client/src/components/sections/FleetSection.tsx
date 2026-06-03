import { Zap, Shield, MapPin } from "lucide-react";

const fleetSpecs = [
  {
    name: "Standard Trucks",
    capacity: "8 Tonnes",
    description: "Perfect for regional deliveries and flexible cargo requirements",
    icon: "🚚",
  },
  {
    name: "Super Link Trucks",
    capacity: "Up to 36 Tonnes",
    description: "Ideal for bulk cargo, heavy loads, and long-distance haulage",
    icon: "🚛",
  },
];

const features = [
  {
    icon: Zap,
    title: "Modern Fleet",
    description: "Well-maintained vehicles equipped with latest technology",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Professional drivers and comprehensive insurance coverage",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Operating across SADC region with international reach",
  },
];

export default function FleetSection() {
  return (
    <section id="fleet" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Fleet & Capabilities
          </h2>
          <p className="text-lg text-gray-600">
            Modern, well-maintained vehicles designed to handle diverse cargo requirements with efficiency and reliability.
          </p>
        </div>

        {/* Fleet Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {fleetSpecs.map((spec, index) => (
            <div
              key={index}
              className="scroll-animate bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{spec.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {spec.name}
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-3">
                {spec.capacity}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="scroll-animate text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Coverage Map */}
        <div className="scroll-animate bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Global Coverage
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Primary Region
                  </h4>
                  <p className="text-gray-600">
                    SADC countries with established routes and partnerships
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Extended Reach
                  </h4>
                  <p className="text-gray-600">
                    International logistics solutions beyond the SADC region
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-gray-500">
                    Our strategic partnerships enable seamless connections across Africa and globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Map Image */}
            <div className="h-64 md:h-auto bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663683190777/3qCB4iUGrpzzDKrL83u4aw/global-logistics-map-ULMwaNPYDnGXCNE5aWc85N.webp"
                alt="Global Logistics Network"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
