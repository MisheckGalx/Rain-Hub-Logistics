// Runs after `vite build`. A single-page app serves the same HTML for every URL, so WhatsApp, LinkedIn and
// search engines would see the same title/preview for every page. This writes a real HTML file per page
// with its own title, description, share image and structured data, plus sitemap.xml and robots.txt.
// All text comes from shared/site.json and shared/faq.json.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "dist/public");
const site = JSON.parse(fs.readFileSync(path.join(root, "shared/site.json"), "utf8"));
const faq = JSON.parse(fs.readFileSync(path.join(root, "shared/faq.json"), "utf8"));
const base = (process.env.SITE_URL || site.siteUrl).replace(/\/$/, "");
const b = site.business;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const json = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${base}/#business`,
  name: site.siteName,
  legalName: b.legalName,
  url: base,
  logo: `${base}/images/logo.png`,
  image: `${base}${site.pages["/"].image}`,
  description: site.pages["/"].description,
  telephone: b.phoneE164,
  email: b.email,
  address: { "@type": "PostalAddress", streetAddress: b.street, addressLocality: b.locality, addressRegion: b.region, postalCode: b.postalCode, addressCountry: b.country },
  openingHoursSpecification: b.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
  areaServed: { "@type": "Place", name: "SADC region, Southern Africa" },
};
const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function seoBlock(route, p) {
  const url = base + (route === "/" ? "/" : route);
  const img = base + p.image;
  const ld = [];
  if (route === "/" || route === "/contact") ld.push(localBusiness);
  if (route === "/services") ld.push(faqPage);
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.siteName)}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(p.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    ...ld.map(json),
  ].join("\n    ");
}

const tpl = fs.readFileSync(path.join(out, "index.html"), "utf8");
const marker = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!marker.test(tpl)) throw new Error("seo markers missing from index.html");

for (const [route, p] of Object.entries(site.pages)) {
  const html = tpl.replace(marker, `<!-- seo -->\n    ${seoBlock(route, p)}`);
  const file = route === "/" ? path.join(out, "index.html") : path.join(out, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    Object.entries(site.pages)
      .map(([r, p]) => `  <url><loc>${base}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
      .join("\n") +
    `\n</urlset>\n`
);
fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`postbuild: ${Object.keys(site.pages).length} pages written, sitemap + robots for ${base}`);
