import { Award, TrendingUp, Users, Globe } from "lucide-react";

const stats = [
  {
    icon: Award,
    number: "SADC+",
    label: "Regional Coverage",
    description: "Established network across SADC countries and beyond",
  },
  {
    icon: TrendingUp,
    number: "3 Modes",
    label: "Transport Solutions",
    description: "Road, sea, and air freight capabilities",
  },
  {
    icon: Globe,
    number: "36T",
    label: "Fleet Capacity",
    description: "Modern fleet up to 36-tonne capacity",
  },
  {
    icon: Users,
    number: "Integrated",
    label: "Complete Solutions",
    description: "Freight, customs clearance, and truck hire",
  },
];

const differentiators = [
  {
    title: "Technology Integration",
    description:
      "Advanced logistics software for route optimization, inventory tracking, and real-time shipment visibility. Clients benefit from transparent communication and digital documentation.",
  },
  {
    title: "Sustainability Commitment",
    description:
      "Green logistics practices including route optimization to reduce emissions, energy-efficient vehicles, and promotion of recyclable packaging materials.",
  },
  {
    title: "Professional Expertise",
    description:
      "Experienced transport coordinators and professional drivers with deep knowledge of regional logistics and customs procedures. Dedicated support for all your shipping needs.",
  },
  {
    title: "Comprehensive Services",
    description:
      "One-stop solutions combining freight transportation, customs clearance, and truck hire services. Streamlined processes for seamless cargo movement across the SADC region.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Rain Hub Logistics
          </h2>
          <p className="text-lg text-gray-600">
            We deliver excellence through reliability, innovation, and unwavering commitment to your success.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="scroll-animate text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Differentiators */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
            What Sets Us Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="scroll-animate bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h4 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-blue-100 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center scroll-animate">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience the difference?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get in Touch Today
          </button>
        </div>
      </div>
    </section>
  );
}
