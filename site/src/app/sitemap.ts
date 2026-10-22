import type { MetadataRoute } from "next";
import { businessLinePages } from "@/content/business-lines";
import { audiences, industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { policies } from "@/content/legal";
import { productCategoryPages } from "@/content/products";
import { caseStudies } from "@/content/projects";
import { site } from "@/content/site";

// Every public page. Listing routes from the content files keeps this in step with the site.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: `${site.url}${path}`, priority, changeFrequency });
  return [
    page("", 1, "weekly"),
    ...["/about", "/business", "/products", "/services", "/industries", "/projects", "/insights"].map((p) => page(p, 0.9)),
    ...["/quote", "/contact", "/partners", "/careers", "/sustainability", "/senergy", "/stations", "/locations", "/faq"].map((p) => page(p, 0.7)),
    ...businessLinePages.map((l) => page(`/business/${l.slug}`, 0.8)),
    ...productCategoryPages.map((c) => page(`/products/${c.slug}`, 0.8)),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.6)),
    ...audiences.map((a) => page(`/for/${a.slug}`, 0.6)),
    ...caseStudies.map((p) => page(`/projects/${p.slug}`, 0.6)),
    ...articles.map((a) => page(`/insights/${a.slug}`, 0.6)),
    ...policies.map((p) => page(`/legal/${p.slug}`, 0.3, "yearly")),
  ];
}
