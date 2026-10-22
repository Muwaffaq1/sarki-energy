import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Preview deployments (workers.dev) stay out of search engines. Set ALLOW_INDEXING=true on the
// production deployment once the site is live on Sarki's domain.
export default function robots(): MetadataRoute.Robots {
  if (process.env.ALLOW_INDEXING !== "true") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
