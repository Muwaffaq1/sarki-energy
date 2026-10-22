# Sarki Energy website

Next.js 15 (App Router) + TypeScript, styled with CSS Modules on the design-system tokens.

```bash
pnpm install
pnpm dev        # http://localhost:3000 (syncs tokens first)
```

## Deploying (Cloudflare Workers)

```bash
pnpm deploy     # OpenNext build + upload with Wrangler
pnpm preview    # same build, served locally by the Workers runtime
```

Live preview: https://sarki-energy-site.yusufmuwaffaq17.workers.dev (worker `sarki-energy-site`). Search engines are kept out until `ALLOW_INDEXING=true` is set on the production deployment. The public address lives in `.env.production`; change it when the site moves to Sarki’s domain. Photos are served unresized (Workers can’t run Next’s image optimizer), so keep new photos at most 1920 px wide.

## Annotating the build

Under `pnpm dev`, press **Shift+A** (or the Annotate button, bottom right) and click any element to leave a note. Notes pin to the element and are saved in `annotations.json`, so Claude can read them back. The overlay and its API only exist on the dev server.

## Where things live

- `src/styles/tokens.css`: generated from `../design-system/code/tokens.css` by `pnpm tokens` (runs before dev and build). Change tokens in the design system, not here.
- `src/content/home.ts`: all Home copy and data, shaped like the future Payload collections. `[confirm]` comments mark facts Sarki still has to confirm.
- `src/components/ui`: atoms (Button, TextLink, Logo, CapabilityStatus, SectionHeader, LinkTile, Icon).
- `src/content/about.ts` + `src/components/about`: the About page (Figma Templates → 09 About, `25:2921`).
- `src/content/business.ts` + `src/components/business`: Our business index (Figma Templates → 21 Our business, `86:9492`).
- `src/content/business-lines.ts` + `app/business/[line]`: the seven business line pages (Figma Templates → 22 Business line). Available lines show services, delivery stages, why it matters and questions; in-development lines show what's being built and where it stands.
- `src/content/products.ts` + `app/products`: Products index and the three category pages (Figma Templates → 23 Products, 24 Product category). Quote-led: no prices or cart. Product links jump to tiles on the category page (`/products/gas#lpg`) until product detail pages exist.
- `app/quote` + `components/quote` + `content/quote.ts` + `lib/quote-schema.ts`: the Request a quote form (Figma Templates → 25 Request a quote). The questions per service live in `content/quote.ts`; one Zod schema validates in the browser and on the server. Links can prefill it: `/quote?product=ago`, `?category=gas`, `?service=solar`.
- `app/api/quote/route.ts`: stores requests. Set `QUOTE_WEBHOOK_URL` to send them on (CMS, email hook); without it, `next dev` saves to `quote-requests.json` and `quote-uploads/` (both gitignored) and production refuses with a 503 so nothing is lost silently.
- `src/components/home`: Home sections, one per Figma section (Templates → 01 Home, desktop `22:4`, mobile `22:625`).
- `src/content/navigation.ts`: header nav, the four mega menus and the mobile drawer (Figma MegaMenu `73:836`).
- `src/components/layout`: SiteHeader (overlay variant with mega menus and mobile drawer), CTABand, SiteFooter, WhatsAppButton.
- `src/content/site.ts`: domain and description for metadata; `app/opengraph-image.tsx`, `robots.ts`, `sitemap.ts` handle sharing and search.
- `public/photos`: placeholder photography (Unsplash/Pexels, see `CREDITS.md`) until Sarki supplies its own.

## Every page

From Figma templates: Home, About, Our business, business lines, Products, product categories, Request a quote, Industries, Projects and case studies, Insights and articles, FAQ, legal pages, 404.
Composed from the design system (no Figma template, by decision on 22 Oct 2026): industry and "I am a…" pages, Contact, Partners, Careers, Sustainability, SEnergy, Stations, Locations, Services, Search.

- Forms: Request a quote (`components/quote`) and the generic enquiry form (`components/forms/EnquiryForm`, configs in `content/enquiries.ts`) for contact, partners, careers and SEnergy early access. Both store through `lib/submissions.ts`: set `QUOTE_WEBHOOK_URL` / `ENQUIRY_WEBHOOK_URL` before launch; in dev they write to `quote-requests.json` / `enquiries.json` (gitignored).
- Search: `lib/search-index.ts` builds the index from the content files; filtering runs in the browser.

## Before launch

- Every `[confirm]` in `src/content/*` needs Sarki’s answer (statuses, figures, delivery areas, reply times).
- Legal pages are drafts for legal review.
- Placeholder photos (see `public/photos/CREDITS.md`) need replacing with Sarki’s own, especially projects.
- Form storage: webhooks or the CMS (Payload).
- Not built: product detail pages (product links jump to tiles on category pages), individual vacancy pages (none open), the station locator (no stations yet).
