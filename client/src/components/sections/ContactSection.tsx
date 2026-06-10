import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuote = trpc.contact.submitQuote.useMutation({
    onSuccess: () => {
      toast.success("Quote request submitted successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit quote request. Please try again.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.serviceType ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitQuote.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType as "Road Freight" | "Sea Freight" | "Air Freight" | "Customs Clearance" | "Truck Hire",
        message: formData.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Quote Today
          </h2>
          <p className="text-lg text-gray-600">
            Contact us for a customized logistics solution tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="scroll-animate space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              {/* Phone */}
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:+27010850769"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    010 085 0769
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:info@rainhubsolutions.co.za"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    info@rainhubsolutions.co.za
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Address
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Halfway House, 1070 Old Pretoria Road
                    <br />
                    Midrand, Johannesburg
                    <br />
                    Gauteng 1685, South Africa
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-2 scroll-animate">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27 (0) 10 085 0769"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select a service...</option>
                    <option value="Road Freight">Road Freight</option>
                    <option value="Sea Freight">Sea Freight</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Customs Clearance">Customs Clearance</option>
                    <option value="Truck Hire">Truck Hire</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your logistics needs..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || submitQuote.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting || submitQuote.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Quote Request
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We'll respond to your quote request within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
