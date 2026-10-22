import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  experimental: {
    // Import only the Phosphor icons we use. Without this every page compiles the whole icon set
    // (~13,000 modules), which made dev compiles take minutes.
    optimizePackageImports: ["@phosphor-icons/react", "@phosphor-icons/react/dist/ssr"],
  },
  // Cloudflare Workers can't run Next's on-demand image optimizer. Photos in public/photos are
  // pre-sized (max 1920px wide), so they're served as plain static files.
  images: { unoptimized: true },
};

export default nextConfig;
