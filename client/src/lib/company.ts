// One place for the facts that appear all over the site. Change them here.
export const company = {
  name: "Rain Hub Logistics",
  legalName: "Rain Hub Logistics PTY LTD",
  phoneDisplay: "010 085 0769",
  phoneHref: "tel:+27100850769",
  email: "info@rainhubsolutions.co.za",
  // NOTE: 010 numbers are landlines. This WhatsApp link only works if WhatsApp
  // (or WhatsApp Business) is registered on this number — otherwise use a mobile.
  whatsappNumber: "27100850769",
  whatsappMessage: "Hi Rain Hub, I'd like a quote for moving some cargo.",
  addressLines: ["1070 Old Pretoria Road", "Halfway House, Midrand", "Johannesburg 1685"],
  hours: [
    ["Monday – Friday", "07:00 – 18:00"],
    ["Saturday", "08:00 – 13:00"],
  ] as const,
  brand: "#1c5386",
  ink: "#0B1628",
};

export const whatsappUrl = () =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`;
