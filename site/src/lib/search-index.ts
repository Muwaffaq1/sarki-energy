// Site search index, built from the same content the pages render, so search can't drift from the site.
// Small enough to send to the browser whole; Postgres full-text search replaces it once the CMS is in.
import { businessLinePages } from "@/content/business-lines";
import { faqGroups } from "@/content/faq";
import { audiences, industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { productCategoryPages } from "@/content/products";
import { caseStudies } from "@/content/projects";

export type SearchEntry = { title: string; text: string; href: string; type: string; keywords?: string };

const pages: SearchEntry[] = [
  { title: "About Sarki Energy", text: "Who we are, mission and vision, how we work, leadership.", href: "/about", type: "Page" },
  { title: "Our business", text: "Seven business lines across the energy value chain.", href: "/business", type: "Page" },
  { title: "Services", text: "Every service, grouped by business line.", href: "/services", type: "Page" },
  { title: "Products", text: "Fuel, gas and power equipment, supplied to specification.", href: "/products", type: "Page" },
  { title: "Request a quote", text: "Tell us what you need and get a price, availability and delivery date.", href: "/quote", type: "Page", keywords: "price order buy" },
  { title: "Contact", text: "Phone, WhatsApp, email and our Abuja office.", href: "/contact", type: "Page", keywords: "address phone email" },
  { title: "Partners", text: "Partner on stations, supply, projects and investment.", href: "/partners", type: "Page" },
  { title: "Careers", text: "Engineering, field, supply and operations roles.", href: "/careers", type: "Page", keywords: "jobs vacancy cv" },
  { title: "Sustainability", text: "Cleaner fuels, solar before generators, less energy wasted.", href: "/sustainability", type: "Page" },
  { title: "SEnergy", text: "The energy services app we’re building. In development.", href: "/senergy", type: "Page", keywords: "app" },
  { title: "Sarki Energy stations", text: "The station network in development.", href: "/stations", type: "Page", keywords: "filling station" },
  { title: "FAQ", text: "Quotes, delivery, installation and who we are.", href: "/faq", type: "Page" },
];

export function buildSearchIndex(): SearchEntry[] {
  return [
    ...pages,
    ...businessLinePages.map((l) => ({ title: l.title, text: l.hero.lead, href: `/business/${l.slug}`, type: "Business line", keywords: l.services.map((s) => s.title).join(" ") })),
    ...productCategoryPages.flatMap((c) => [
      { title: c.title, text: c.hero.lead, href: `/products/${c.slug}`, type: "Products" },
      ...c.products.map((p) => ({ title: p.name, text: p.text, href: `/products/${c.slug}#${p.slug}`, type: "Product" })),
    ]),
    ...industries.map((i) => ({ title: i.title, text: i.hero.lead, href: `/industries/${i.slug}`, type: "Industry" })),
    ...audiences.map((a) => ({ title: `For ${a.title.toLowerCase()}s`, text: a.hero.lead, href: `/for/${a.slug}`, type: "I am a…" })),
    ...caseStudies.map((p) => ({ title: `${p.title}, ${p.location}`, text: p.text, href: `/projects/${p.slug}`, type: "Project" })),
    ...articles.map((a) => ({ title: a.title, text: a.excerpt, href: `/insights/${a.slug}`, type: "Insight", keywords: a.category })),
    ...faqGroups.flatMap((g) => g.faqs.map((f) => ({ title: f.q, text: f.a.replace(/\[confirm[^\]]*\]\.?\s*/g, ""), href: "/faq", type: "FAQ" }))),
  ];
}
