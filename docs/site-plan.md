# Sarki Energy website: site plan from the PRD

Source: Sarki Energy corporate website brief (received 21 Oct 2026). This plan turns the brief into routes, templates and components, reusing the 20 templates already in Figma where they fit.

Decisions so far: design in Figma first, then you pick pages to code; homepage headline stays **"Energy you can plan around."** (PRD positioning line "Integrated Energy. Built for Progress." becomes the brand line in the footer and About); a **new main colour** replaces Flame orange (value to come); CMS recommendation below.

## 1. Sitemap

| Section | Route | Template | Status |
| --- | --- | --- | --- |
| Home | `/` | Home (rebuilt) | Adapt 01 |
| About · Who we are, Story, Vision & mission, Approach, Capabilities | `/about` | About (expanded) | Adapt 09 |
| About · Leadership | `/about/leadership` | Leadership | New |
| About · Sustainability | `/sustainability` | Sustainability | New |
| Our business (index) | `/business` | Business index | Adapt 02 |
| Our business · 8 lines: Supply & trading, Oil & gas, Gas, Power & renewables, Engineering & EPC, Infrastructure, Logistics, Technology | `/business/[line]` | Business line | Adapt 03 |
| Services directory | `/services` | Services directory | Adapt 02 |
| Products (index) | `/products` | Product categories | Adapt 11 |
| Product category · Petroleum, LPG, CNG, LNG, Solar & power, Storage, EV charging | `/products/[category]` | Product list | Adapt 11 |
| Product detail | `/products/[category]/[product]` | Product (quote-led) | Adapt 12 |
| Industries (index) | `/industries` | Industries | Adapt 04 |
| Industry / "I am a…" page · 9 industries + 8 audiences | `/industries/[slug]`, `/for/[audience]` | Audience page | New (from 03) |
| Projects | `/projects` | Projects | Adapt 05 |
| Project detail | `/projects/[slug]` | Case study | Adapt 06 |
| Retail energy (station concept) | `/stations` | Station concept | New |
| Find a location | `/locations` | Locator (map + filters) | New |
| Station detail | `/locations/[slug]` | Station page | New |
| Technology & SEnergy | `/technology`, `/senergy` | Technology / SEnergy | New |
| Insights | `/insights` | Insights | Adapt 07 |
| Article | `/insights/[slug]` | Article | Adapt 08 |
| Partnerships | `/partners` | Partners + enquiry form | New |
| Careers | `/careers` | Careers | New |
| Vacancy + application | `/careers/[slug]` | Vacancy | New |
| Contact | `/contact` | Contact | New |
| Request a quote | `/quote` | Dynamic quote form | New (from 10 + 14) |
| Quote sent | `/quote/sent` | Confirmation | Adapt 15 |
| Search | `/search` | Search results | New |
| FAQ | `/faq` | FAQ | Keep 18 |
| Legal / policies | `/legal/[slug]` | Policy | Keep 19 |
| 404 | — | Not found | Keep 20 |

**Parked for later** (kept in Figma, not in v1): Store cart and checkout (13–14), Sign in and Account (16–17). The PRD makes products quote-led for now and lists customer accounts and online ordering as future integrations.

**Count:** 8 kept or adapted lightly, 9 adapted heavily, 14 new templates.

## 2. Home, in order

1. Hero: "Energy you can plan around." · Primary **Explore our services** · Secondary **Partner with us**.
2. **I am a…** selector: Homeowner, Business, Industrial customer, Filling station, Fleet operator, Institution, Energy company, Government / development organisation.
3. Who we are (PRD §6 copy, tightened) · Learn more about Sarki Energy.
4. Our energy business: the 8 lines, each tagged **Available now** or **In development**.
5. Energy products: Petroleum, Gas, Power.
6. Industries we serve.
7. Featured projects · View all projects.
8. Station network concept (clearly marked as in development).
9. SEnergy teaser · Explore SEnergy.
10. Sustainability, tied to real work (cleaner cooking via LPG, CNG transition, solar).
11. Insights.
12. CTA band: **Request a quote** · **Talk to us**.

## 3. Current capabilities vs growth areas (PRD §31)

Every business line, product, service and station carries a status the CMS controls: **Available now** or **In development**. Pages for in-development lines say what exists today and invite partnership or early interest, never implying assets that don't exist.

Proposed first pass, from what the current site and projects show. **Sarki must confirm every row before launch.**

| Area | Proposed status | Evidence today |
| --- | --- | --- |
| Solar PV, battery storage, hybrid systems | Available now | Delivered home and commercial projects |
| Energy audit & advisory | Available now | Audit service page |
| Bulk fuel supply (AGO, PMS) and LPG supply | Available now | Fuel supply page |
| Engineering, EPC, electrical installation, O&M | Available now | Projects |
| CNG infrastructure (civil works) | Available now (works) | Ongoing CNG project |
| Equipment supply (panels, inverters, storage, site equipment) | Available now | Current store |
| Mini-grids, solar street lights | Confirm | Listed on solar page, no project shown |
| ATK, LNG | In development? | Not on current site |
| Retail station network | In development | PRD §12 "future retail network" |
| Energy logistics fleet | In development? | Not on current site |
| SEnergy platform, smart metering, digital payments | In development | PRD §13–14 |
| EV charging | Confirm | Listed as a solution, no project shown |

## 4. New components to design

| Component | Used on |
| --- | --- |
| Mega menu (About, Our business, Products, Industries) + mobile drawer | Every page |
| Global search overlay + results list | Header, `/search` |
| Audience selector ("I am a…") | Home, Industries |
| Capability status tag (Available now / In development) | Business, products, services, stations |
| Business line tile (larger, image-led) | Home, Business index |
| Product category card + spec table | Products |
| Dynamic quote form: service picker → conditional fields → contact → review | `/quote` |
| File upload field | Quote, Contact, Careers, Partners |
| Location map panel + filter sidebar + location list | `/locations` |
| Station page header (products, hours, services, directions) | `/locations/[slug]` |
| Timeline (Our story) | About |
| Leader profile card + bio drawer | Leadership |
| Partner category grid (placeholders until real partners are confirmed) | Partners |
| Vacancy row + application form | Careers |
| Department contact card + map embed slot + hours | Contact |
| Author byline + share bar | Article |
| Stat band (real figures only) | Home, About, Sustainability |

Existing components carry over: buttons, forms, cards, accordion, process steps, CTA band, footer (expanded for the new nav), hero, toast, select menu, segmented control, motion.

## 5. CMS recommendation: Payload

**Recommend Payload CMS** (open source, runs inside the Next.js site, Postgres database, media in object storage).

Why it fits this brief:
- **Everything in §26 is a collection with an admin UI:** products, services, projects, articles, team, vacancies, stations, locations, partners, FAQs, documents and media, with roles so editors can't break layout.
- **Enquiries land in the same admin.** Quote requests, contact messages, partnership enquiries and job applications (with CV uploads) are stored and searchable there. A hosted CMS like Sanity would need a separate store for those.
- **Relations the PRD needs:** products ↔ industries ↔ business lines ↔ projects ↔ stations, which power the tailored "I am a…" pages and global search.
- **Future integrations (§30):** it's our own code and database, so CRM, payments, SEnergy accounts and ordering can connect later without changing CMS.
- **No per-seat pricing;** costs are hosting only.

Trade-off: we host and maintain it (database, backups, updates). If Sarki would rather not own that, **Sanity** is the alternative: excellent editing experience, fully hosted, but enquiries and applications would go to a separate service.

Proposed stack when we reach code: Next.js on Vercel, Payload with Postgres (via the Vercel Marketplace), images in blob storage, map tiles from a maps provider to be chosen with Sarki.

## 6. Open questions for Sarki

1. The new main colour (value or reference).
2. Logo master SVG.
3. Confirm the status column in section 3.
4. Real photography: what exists of tankers, facilities, stations, installations?
5. Leadership names, roles, bios and photos.
6. Which partners can be named publicly (PRD warns against false partnership claims).
7. Is SEnergy a name to show publicly yet?
8. Department emails and phone numbers for the contact page; business hours.
9. Social media handles.
10. Does the store stay (cart and order requests) or move fully to quotes?
