# Rain Hub Logistics website

Marketing site for [Rain Hub Logistics](https://rainhublogistics.com): freight, customs clearance and truck hire from Midrand, Johannesburg.
React 19 + TypeScript + Tailwind 4 (Vite), deployed on Vercel. One serverless function (`api/quote.ts`) emails quote requests.

## Run it locally

```bash
pnpm install
cp .env.example .env.local      # fill in the Resend values to test real emails
pnpm dev                        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local dev server (also serves `/api/quote`, same code as production) |
| `pnpm check` | TypeScript check |
| `pnpm test` | Unit tests (quote API, opening hours) |
| `pnpm build:web` | Production build + per-page SEO files (what Vercel runs) |

## Where things live

| To change… | Edit |
| --- | --- |
| Phone, email, WhatsApp number, hours data for Google | `shared/site.json` (`business`) |
| Page titles, descriptions, share images | `shared/site.json` (`pages`) |
| Live domain used in sitemap/share tags | `shared/site.json` (`siteUrl`) or the `SITE_URL` env var |
| FAQ (page + Google markup) | `shared/faq.json` |
| Address lines, opening-hours display | `client/src/lib/company.ts` |
| Client list / hide a client | `client/src/pages/ClientsPage.tsx` |
| Client logos | drop `<slug>.svg` into `client/src/assets/clients/` (see the README there) |
| Team members on About | `people` list at the top of `client/src/pages/AboutPage.tsx` |

### Add a photo

```bash
python3 scripts/add-photo.py ~/Downloads/loading-dock.jpg loading-dock
```

Makes the three sizes the site needs and updates `photoMeta.ts`. Then use `<Photo name="loading-dock" alt="…" />`.
Blur number plates and get permission from anyone recognisable before adding a photo.

### Regenerate share images

```bash
python3 scripts/make-og-images.py     # needs Pillow and an Inter TTF (INTER_TTF=/path/Inter-600.ttf)
```

## Deploy (Vercel)

`vercel.json` sets the build (`vite build` then `scripts/postbuild.mjs`), security headers (incl. a Content-Security-Policy), caching and the SPA fallback.

`postbuild` writes a real HTML file per page (own title, description, share image, structured data), `sitemap.xml` and `robots.txt`,
so WhatsApp, LinkedIn and Google see the right details for each page.

### Before going live

1. **Email**: add `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` in Vercel, and verify the sending domain in Resend (add its SPF + DKIM DNS records, or emails can land in spam). Send a test quote.
2. **Domain**: set the real domain in `shared/site.json` / `SITE_URL`, redirect the other domain to it.
3. **Analytics**: switch on *Web Analytics* in the Vercel project (cookie-free; the code is already in).
4. **Bot check (optional)**: set `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET` (Cloudflare Turnstile, free).
5. **Facts to confirm**: the WhatsApp number (010 numbers are landlines), service claims, client permissions to be listed, the name on the truck cab in photos.
6. **Legal**: have the privacy policy (`client/src/pages/PrivacyPage.tsx`) reviewed, and make sure the company has an Information Officer registered with the Information Regulator (POPIA).
7. Create/claim the **Google Business Profile** with exactly the same name, address and phone as the site.

## Notes

- `server/` is only the local dev server plus tests; production does not use it.
- Photos show the number plate blurred. Keep it that way.
