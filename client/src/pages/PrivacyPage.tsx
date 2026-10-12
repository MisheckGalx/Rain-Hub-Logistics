import { company } from "@/lib/company";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 text-2xl font-semibold tracking-[-0.02em] text-[#0B1628] md:text-3xl">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => <p className="mt-4 text-[16px] leading-relaxed text-[#424245]">{children}</p>;
const Li = ({ children }: { children: React.ReactNode }) => <li className="mt-2 pl-1">{children}</li>;

export default function PrivacyPage() {
  return (
    <main className="bg-white pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-[#0B1628] md:text-6xl">Privacy policy</h1>
        <p className="mt-4 text-[15px] text-[#6e6e73]">Last updated 11 October 2026</p>

        <P>
          {company.legalName} ("we", "us") respects your privacy. This page explains what personal information we collect through this website, why, and what
          your rights are under the Protection of Personal Information Act 4 of 2013 (POPIA).
        </P>

        <H>Who is responsible</H>
        <P>
          {company.legalName}, {company.addressLines.join(", ")}. Email{" "}
          <a className="text-[#1c5386] underline underline-offset-2" href={`mailto:${company.email}`}>{company.email}</a>, phone{" "}
          <a className="text-[#1c5386] underline underline-offset-2" href={company.phoneHref}>{company.phoneDisplay}</a>.
        </P>

        <H>What we collect</H>
        <P>When you ask for a quote, we collect what you type into the form:</P>
        <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#424245]">
          <Li>your name, phone number and (optionally) email address;</Li>
          <Li>the service you need, where cargo is collected from and delivered to, and any details you add;</Li>
          <Li>how you would like us to contact you.</Li>
        </ul>
        <P>
          If you call, message us on WhatsApp or email us, we also receive whatever you send us. We do not ask for ID numbers or payment details on this website.
        </P>

        <H>Why we use it</H>
        <P>
          Only to respond to your enquiry, prepare and send you a quote, and, if you become a customer, to provide our services and keep the business and legal
          records we are required to keep. We do not sell your information and we do not use it for third-party advertising.
        </P>

        <H>Who sees it</H>
        <P>
          Your enquiry is sent to our team by email. To do this, we use service providers that process information on our behalf: an email delivery service and
          the hosting platform that runs this website. These providers may store or process information outside South Africa, and are only allowed to use it to
          provide their service to us.
        </P>

        <H>Cookies and analytics</H>
        <P>
          This website does not use advertising or tracking cookies. We use privacy-friendly analytics that count page visits without cookies and without building
          profiles of individual visitors.
        </P>

        <H>How long we keep it</H>
        <P>
          For as long as we need it to deal with your enquiry and to meet our legal and business-record obligations. If you would like it deleted sooner, tell us.
        </P>

        <H>Your rights</H>
        <P>You may ask us to:</P>
        <ul className="mt-2 list-disc pl-6 text-[16px] leading-relaxed text-[#424245]">
          <Li>tell you what personal information we hold about you;</Li>
          <Li>correct it if it is wrong or out of date;</Li>
          <Li>delete it, or stop using it, where we have no good reason to keep it;</Li>
          <Li>stop contacting you.</Li>
        </ul>
        <P>
          Email us at <a className="text-[#1c5386] underline underline-offset-2" href={`mailto:${company.email}`}>{company.email}</a> and we will respond as soon
          as we reasonably can. If you are unhappy with how we handle your information, you may complain to South Africa's Information Regulator at{" "}
          <a className="text-[#1c5386] underline underline-offset-2" href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.
        </P>

        <H>Changes to this policy</H>
        <P>If we change how we handle personal information, we will update this page and the date at the top.</P>
      </div>
    </main>
  );
}
