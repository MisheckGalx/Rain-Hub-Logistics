// One place for the facts that appear all over the site. Phone, email and WhatsApp live in shared/site.json
// (the build uses the same file for search-engine data), so change them there.
import site from "@shared/site.json";

const b = site.business;
export const company = {
  name: "Rain Hub Logistics",
  legalName: "Rain Hub Logistics PTY LTD",
  phoneDisplay: b.phoneDisplay,
  phoneHref: `tel:${b.phoneE164}`,
  email: b.email,
  // NOTE: 010 numbers are landlines. This WhatsApp link only works if WhatsApp
  // (or WhatsApp Business) is registered on this number — otherwise use a mobile.
  whatsappNumber: b.whatsappNumber,
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

// ── Opening hours → "Open now" ────────────────────────────────────────────
// Hours are in South African time, whatever country the visitor is in.
const DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as const;
const OPEN: Record<number, [number, number] | undefined> = { 1: [7, 18], 2: [7, 18], 3: [7, 18], 4: [7, 18], 5: [7, 18], 6: [8, 13] };
const DAY_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

export function openStatus(now = new Date()): { open: boolean; text: string } {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Johannesburg", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAY[get("weekday") as keyof typeof DAY] ?? 1;
  const mins = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const today = OPEN[day];
  if (today && mins >= today[0] * 60 && mins < today[1] * 60) return { open: true, text: `Open now · closes ${hh(today[1])}` };
  if (today && mins < today[0] * 60) return { open: false, text: `Closed · opens today at ${hh(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const o = OPEN[d];
    if (o) return { open: false, text: `Closed · opens ${i === 1 ? "tomorrow" : DAY_NAME[d]} at ${hh(o[0])}` };
  }
  return { open: false, text: "Closed" };
}
