import { CheckCircle2 } from "lucide-react";

const values = [
  {
    title: "Integrity",
    description: "Upholding transparency and honesty in all operations",
  },
  {
    title: "Efficiency",
    description: "Streamlining processes to ensure timely and cost-effective delivery",
  },
  {
    title: "Innovation",
    description: "Leveraging technology to enhance logistics performance",
  },
  {
    title: "Sustainability",
    description: "Promoting eco-friendly logistics practices",
  },
  {
    title: "Customer Satisfaction",
    description: "Building long-term relationships through exceptional service",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="scroll-animate">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Rain Hub Logistics
            </h2>

            {/* Mission */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide integrated logistics solutions that ensure safe, efficient, and timely movement of goods while adding value to our clients' supply chains.
              </p>
            </div>

            {/* Vision */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a leading logistics hub within the SADC region, recognized for reliability, innovation, and excellence in freight and customs services.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Ensures products are delivered on time and in good condition</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Connects producers with consumers globally</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Essential for business operations and economic development</span>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="scroll-animate">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Profile */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 md:p-12 text-white scroll-animate">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Centre of Logistics Excellence
          </h3>
          <p className="text-lg leading-relaxed max-w-3xl">
            Rain Hub Logistics is a comprehensive logistics solutions provider dedicated to delivering reliable, efficient, and cost-effective freight services across the SADC region and beyond. Our operations are built on professionalism, safety, and timely delivery, ensuring that our clients' cargo reaches its destination in optimal condition.
          </p>
        </div>
      </div>
    </section>
  );
}
