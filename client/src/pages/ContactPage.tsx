import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuote = trpc.contact.submitQuote.useMutation({
    onSuccess: () => {
      toast.success("Quote request submitted! We'll be in touch within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", serviceType: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType || !formData.message) {
      toast.error("Please fill in all required fields");
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
    <main className="pt-16 sm:pt-20 relative min-h-screen">
      {/* Google Maps Background — hidden on mobile to save render cost */}
      <div className="fixed inset-0 z-0 hidden sm:block">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.8!2d28.1199!3d-25.9905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9561fa0f9e7f3d%3A0x1234!2s1070+Old+Pretoria+Rd%2C+Midrand%2C+1685!5e0!3m2!1sen!2sza"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ opacity: 0.35, pointerEvents: "none" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1628]/85 to-[#0B1628]/60" />
      </div>
      {/* Solid fallback bg for mobile */}
      <div className="fixed inset-0 z-0 sm:hidden bg-[#0B1628]" />

      {/* Page Hero */}
      <div className="relative z-10 py-10 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <p className="text-[#00A896] text-xs font-bold tracking-[3px] uppercase mb-3">Get In Touch</p>
          {/* FIX: clamp heading */}
          <h1 className="font-black text-white leading-none tracking-wide mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 8vw, 80px)" }}>
            CONTACT US
          </h1>
          <p className="text-white/70 text-sm sm:text-lg max-w-xl leading-relaxed">
            Ready to move your cargo? Get a customised logistics solution tailored to your business today.
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="relative z-10 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          {/* FIX: stacked on mobile, info panel + form side by side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 items-start">

            {/* Info Panel */}
            <div className="bg-[#0B1628]/90 sm:bg-[#0B1628]/85 backdrop-blur-xl border border-white/12 rounded-2xl p-6 sm:p-10">
              <h3 className="text-2xl font-black text-white mb-6 sm:mb-8 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                CONTACT INFO
              </h3>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Phone</div>
                    <a href="tel:+27010850769" className="text-[#00A896] font-semibold text-sm hover:text-white transition-colors">
                      010 085 0769
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-xl flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Email</div>
                    <a href="mailto:info@rainhubsolutions.co.za" className="text-[#00A896] font-semibold text-sm hover:text-white transition-colors break-all">
                      info@rainhubsolutions.co.za
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-xl flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Address</div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Halfway House<br />
                      1070 Old Pretoria Road<br />
                      Midrand, Johannesburg<br />
                      Gauteng 1685, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 pt-2 border-t border-white/8">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] bg-gradient-to-br from-[#0055A5] to-[#00A896] rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Business Hours</div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Mon – Fri: 07:00 – 18:00<br />
                      Saturday: 08:00 – 13:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-10 shadow-2xl">
              <h3 className="font-black text-[#0B1628] mb-6 sm:mb-8 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 4vw, 32px)" }}>
                GET A FREE QUOTE
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* FIX: always 1 col on mobile, 2 col on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0B1628] mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00A896] focus:outline-none transition-colors text-sm font-medium" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0B1628] mb-2">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                      placeholder="Company name (optional)"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00A896] focus:outline-none transition-colors text-sm font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0B1628] mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00A896] focus:outline-none transition-colors text-sm font-medium" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0B1628] mb-2">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+27 (0) 10 085 0769"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00A896] focus:outline-none transition-colors text-sm font-medium" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0B1628] mb-2">Service Type *</label>
                  <select name="serviceType" value={formData.serviceType} onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00A896] focus:outline-none transition-colors text-sm font-medium bg-white" required>
                    <option value="">Select a service...</option>
                    <option value="Road Freight">Road Freight</option>
                    <option value="Sea Freight">Sea Freight</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Customs Clearance">Customs Clearance</option>
                    <option value="Truck Hire">Truck Hire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0B1628] mb-2">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your logistics needs — origin, destination, cargo type, urgency..."
                    rows={4}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00A896] focus:outline-none transition-colors text-sm font-medium resize-none" required />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitQuote.isPending}
                  className="w-full bg-gradient-to-r from-[#0055A5] to-[#00A896] hover:opacity-90 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting || submitQuote.isPending ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Quote Request</>
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center">We respond to all quote requests within 24 hours.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
