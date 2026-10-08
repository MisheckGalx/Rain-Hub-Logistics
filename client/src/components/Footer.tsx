import { Link } from "wouter";
import { company, whatsappUrl } from "@/lib/company";

const services = ["Road freight", "Sea freight", "Air freight", "Customs clearance", "Truck hire"];

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] text-[#6e6e73]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img src="/images/logo.png" alt="Rain Hub Logistics" className="h-9 w-auto" />
            <p className="mt-4 max-w-[260px] text-[13px] leading-relaxed">
              Freight, customs clearance and truck hire from Midrand, across Southern Africa.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold text-[#0B1628]">Services</h4>
            <ul className="space-y-2 text-[13px]">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-[#0B1628]">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold text-[#0B1628]">Company</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/about" className="hover:text-[#0B1628]">About</Link></li>
              <li><Link href="/fleet" className="hover:text-[#0B1628]">Fleet</Link></li>
              <li><Link href="/clients" className="hover:text-[#0B1628]">Clients</Link></li>
              <li><Link href="/contact" className="hover:text-[#0B1628]">Get a quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold text-[#0B1628]">Talk to us</h4>
            <ul className="space-y-2 text-[13px]">
              <li><a href={company.phoneHref} className="hover:text-[#0B1628]">{company.phoneDisplay}</a></li>
              <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-[#0B1628]">WhatsApp</a></li>
              <li><a href={`mailto:${company.email}`} className="break-all hover:text-[#0B1628]">{company.email}</a></li>
              <li className="pt-1 leading-relaxed">{company.addressLines.join(", ")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-5 text-xs">
          © {new Date().getFullYear()} {company.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
